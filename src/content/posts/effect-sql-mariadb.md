---
author: Kha Nguyen
pubDatetime: 2026-09-13T00:00:00.000+07:00
title: A MariaDB driver for Effect SQL
slug: effect-sql-mariadb
featured: false
ogImage: https://images.pexels.com/photos/31006426/pexels-photo-31006426/free-photo-of-tranquil-sea-lion-basking-in-kobenhavn-zoo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
tags:
  - effect
  - typescript
  - mariadb
  - database
description: effect-sql-mariadb is a MariaDB-backed SqlClient layer for Effect, built on the official mariadb driver — here's why I chose it over mysql2.
---

If you run MariaDB in production — and plenty of us do, whether by distro default,
hosting choice, or preference for what MariaDB does with its forks of MySQL features —
the Effect ecosystem has quietly had a gap: [`@effect/sql`](https://github.com/Effect-TS/effect/tree/main/packages/sql)
ships adapters for MySQL, PostgreSQL, SQLite, MSSQL, even ClickHouse, but not MariaDB.
The usual workaround is to use the MySQL adapter, since every MySQL client library will
*happily* connect to a MariaDB server. It works, mostly. It's just that "mostly" carries
a small asterisk, which I'll get to.

<figure>
  <img
    src="https://images.pexels.com/photos/31006426/pexels-photo-31006426/free-photo-of-tranquil-sea-lion-basking-in-kobenhavn-zoo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    alt="Close-up of a serene sea lion basking in the sun at Copenhagen Zoo"
  />
  <figcaption class="text-center">
    Photo by
    <a href="https://www.pexels.com/photo/tranquil-sea-lion-basking-in-kobenhavn-zoo-31006426/">Lars H Knudsen</a>
  </figcaption></figure>

I won't re-litigate [why `@effect/sql` is worth using](https://github.com/Effect-TS/effect/tree/main/packages/sql) —
the short version is that it gives you a single, typed, Effect-native interface over your
database regardless of which engine sits underneath.

[effect-sql-mariadb](https://codeberg.org/khanetor/effect-sql-mariadb) fills the gap: a
`SqlClient` layer backed by the official `mariadb` Node.js driver, published from
Codeberg. This post is about what's in the box, and why I deliberately picked the
`mariadb` driver over the more common `mysql2`.

## What you get

If you've used any `@effect/sql` adapter, the shape is familiar. You get `SqlClient.SqlClient`
from a scoped layer, tagged templates for statements, and the rest of the `@effect/sql`
toolkit — schema-validated queries, streaming, transactions — on top:

```ts
import { SqlClient } from "@effect/sql"
import { Effect, Schema } from "effect"
import { MariadbClient } from "effect-sql-mariadb"

const program = Effect.gen(function* () {
  const sql = yield* SqlClient.SqlClient

  const Person = Schema.Struct({
    name: Schema.String,
    age: Schema.Number,
  })

  const findAdults = SqlSchema.findAll({
    Request: Schema.Struct({ minAge: Schema.Number }),
    Result: Person,
    execute: ({ minAge }) =>
      sql`SELECT name, age FROM people WHERE age >= ${minAge} ORDER BY age DESC`,
  })

  return yield* findAdults({ minAge: 18 })
})

const MariaLive = MariadbClient.layer({
  host: "127.0.0.1",
  port: 3306,
  user: "app",
  password: "secret",
  database: "app",
  connectionLimit: 5,
})

Effect.runPromise(Effect.provide(program, MariaLive))
```

`MariadbClient.layer` accepts the `mariadb` driver's `PoolConfig` directly — there is no
parallel config format to learn. The pool and the reserved connections used for
transactions are scoped: when the layer's scope closes, they're released automatically,
so teardown behaves the way Effect resources should. Fail-fast is built in — the layer
pings the server on acquisition instead of discovering a bad host on your first query.

Under the hood it's a small, readable adapter: prepared and unprepared statements, raw
results, `rowsAsArray`, streaming via the driver's `queryStream`, nested transactions,
and a statement compiler wired for MySQL dialect syntax with one MariaDB-flavored extra —
multi-row upserts through `${sql.insert(rows)} ${sql.updateValues(rows, "t")}`, which
compiles to `INSERT ... ON DUPLICATE KEY UPDATE col = VALUES(col)`. Because it speaks the
`SqlClient` interface, everything else in `@effect/sql` — `SqlResolver`, `SqlSchema`,
migrations tooling — drops in without adaptation.

The unit tests don't touch the network: the driver's pool is replaced with an in-process
fake, so `bun test` runs anywhere, including CI without a database.

## Why the `mariadb` driver and not `mysql2`

This is the decision worth explaining, because on the surface it looks like the wrong
one. `mysql2` is the default choice in the Node ecosystem — heavily used, well tested,
constantly maintained. The `mariadb` package is the official connector from MariaDB
itself, and its Node bindings get a fraction of the community attention. Why pick it?

Because MariaDB's wire protocol has genuinely diverged from MySQL's, and a client built
for MySQL implements MySQL's side of that conversation, not MariaDB's. The divergence is
not ancient history, and it is not cosmetic:

- **Authentication.** MariaDB grew its own auth mechanisms —
  [ed25519](https://mariadb.com/kb/en/authentication-plugin-ed25519/),
  [PAM](https://mariadb.com/kb/en/authentication-plugin-pam/), and
  [PARSEC](https://mariadb.com/kb/en/authentication-plugin-parsec/) since 11.6, which is
  slated to become MariaDB's default. mysql2 implements none of them (its auth plugin
  set is `caching_sha2_password`, `mysql_native_password`, `sha256_password`, and clear
  text). If your MariaDB server requires ed25519 or PAM, a MySQL client simply cannot
  connect. MariaDB 11.4+ can optionally load MySQL's `caching_sha2_password` for
  migration purposes, but that accommodation goes server → MySQL clients, never the
  other way.
- **Wire protocol capabilities.** MariaDB extended the protocol behind
  `MARIADB_CLIENT_*` capability bits: bulk `COM_STMT_BULK_EXECUTE`, extended column
  metadata (which is how MariaDB-only types like `UUID`, `INET4`/`INET6`, and `VECTOR`
  are distinguishable on the wire), and metadata skipping. A MySQL client speaks the
  intersection; the `mariadb` driver speaks the whole dialect.
- **Server behavior the two disagree on.** mysql2's own maintainers needed a dedicated
  PR ([#4373](https://github.com/sidorares/node-mysql2/pull/4373)) to make their test
  suite pass against MariaDB 11.8 — before it, "current master fails 19 test files"
  against that server. The failures are instructive: `UNIX_TIMESTAMP()` returning
  integer on MariaDB but a decimal string on MySQL, MariaDB's JSON validity errors
  carrying errno 4025 which maps to a *different* error name in mysql2's MySQL-derived
  error table, and server variables named differently
  (`max_recursive_iterations` vs `cte_max_recursion_depth`).

To be fair to mysql2: that PR also put MariaDB 11.8 into its CI matrix, and recent
versions negotiate extended metadata for MariaDB-specific types. It works better than
it used to. But it remains a MySQL client adding MariaDB support, with a docs page
cataloguing the workarounds — whereas the `mariadb` driver is built by MariaDB for
MariaDB, implements every auth plugin a MariaDB server can request, and treats the
MariaDB protocol extensions as first-class features (pipelining, bulk insert, streaming)
rather than compatibility notes.

The honest counterpoint: if your app must one day run against both MySQL and MariaDB —
some customers on one, some on the other — `mysql2` remains the pragmatic pick, since
the `@effect/sql` MySQL adapter targets it directly. This library exists for the
opposite situation: MariaDB is the target, not a server it happens to tolerate. The
driver was made for this database; using anything else is a compatibility shim.

## Try it

The package is published on Codeberg's npm registry, not npmjs — install the tarball
directly:

```sh
bun add https://codeberg.org/api/packages/khanetor/npm/effect-sql-mariadb/-/effect-sql-mariadb-0.1.2.tgz
```

(Or with npm/pnpm — same URL, same command shape. A scoped package name with an
`.npmrc` registry override is planned, but that's a breaking rename, so the tarball
install is the stable path for now.)

The repo ships runnable examples — a schema-validated query and a CRUD tour — you can
point at any MariaDB instance:

```sh
bun run example
```

Details, API, and source are in the
[repo README](https://codeberg.org/khanetor/effect-sql-mariadb). If you hit anything
odd — or you're the one running both MySQL and MariaDB and want that adapter story —
[issues and PRs are open](https://codeberg.org/khanetor/effect-sql-mariadb/issues).
