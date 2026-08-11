---
author: Kha Nguyen
pubDatetime: 2026-08-11T00:00:00.000+07:00
title: Branching Keycloak login on identity-provider claims
slug: keycloak-idp-claim-utilities
featured: false
draft: false
tags:
  - keycloak
  - authentication
  - oidc
description: A small Keycloak extension with conditional claim authenticators and a deny-redirect authenticator, for gating broker logins on the claims an identity provider delivers.
---

When you brokered a login through an identity provider, Keycloak stores the claims the IdP
sent back as brokered user attributes — email, name, whatever the provider delivers. That
context is usually only useful to stuff a few attributes into the user profile. But the
claims an IdP delivers are not a contract: they can change, or be missing entirely, and
then your realm has to decide what to do.

<figure>
  <img
    src="https://images.pexels.com/photos/16262621/pexels-photo-16262621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    alt="Golden keys and key ring"
  />
  <figcaption class="text-center">
    Photo by
    <a href="https://www.pexels.com/photo/golden-keys-and-key-ring-16262621/">COPPERTIST WU</a>
  </figcaption></figure>

Take Facebook login, the classic example. Facebook's `email` permission is
[optional](https://developers.facebook.com/docs/permissions/) — users can grant or deny
the permissions an app requests, and if a user declines `email` during OAuth consent,
Facebook simply does not deliver an email claim to your app. Even with the permission
granted, Facebook only returns [the email associated with the account](https://developers.facebook.com/docs/permissions/);
a user who signed up with a phone number and has no email on file yields an empty `email`
field.

Worse, the absence of an email is not always the user's choice in that moment. There is a
long-standing, widely-reported Facebook bug where if the account's original primary email
is ever removed — even if the user re-adds that same address, or adds new verified ones —
the Graph API stops returning an `email` to apps, seemingly forever ([Facebook developer
forum](https://developers.facebook.com/community/threads/228962369861977/),
[another report](https://developers.facebook.com/community/threads/276984085174740/),
[tracked on Supabase's auth](https://github.com/supabase/auth/issues/1791)). The email is
still on the account, still verified, and the user still grants `email` access — the field
just never comes back. It is exactly the kind of "missing from nowhere" scenario you
cannot debug from the app side, because everything on the app side looks correct.

Either way, your Keycloak realm ends up with a brokered login that has no email, and flows
that assumed one is present start to misbehave.

[keycloak-idp-claim-utilities](https://codeberg.org/khanetor/keycloak-idp-claim-utilities)
is a small Keycloak extension with three authenticators designed for exactly this: check
the claims a broker actually delivered, and branch the login flow on them — e.g. deny
access when a required claim like `email` is missing, or when it does not match what you
expect. It is provider-agnostic: it works with any IdP that delivers its claims as
brokered user attributes.

## Authenticators

| Provider ID  | Type           | What it does                                                   |
|--------------|----------------|----------------------------------------------------------------|
| `claim-presence` | Conditional | Matches when a configured claim is present (non-blank).        |
| `claim-value`    | Conditional | Matches when a claim's value equals an expected value (optionally a regex). |
| `deny-redirect`  | Regular     | Terminates login, redirecting back to the app's redirect URI with `?error=<code>`. |

The conditional authenticators read the brokered context from both the
first-broker-login and post-broker-login flows, and each supports an optional
**Negate output** toggle to invert its result.

### `claim-presence`

Matches when the configured claim is present with at least one non-blank value. This is
the one you want for the Facebook email case above: gate the flow on `email` being present,
and route the "no email" branch to denial. The **Negate output** toggle inverts it, e.g.
to match when a claim is *absent*.

### `claim-value`

Matches when a claim's value equals an expected value. Without regex, at least one of the
claim's values must match exactly; with **Match as regex** enabled, any value containing
the pattern passes. Use it to allow only users whose email domain matches, for example.

### `deny-redirect`

The terminal authenticator for the "deny" branch — where you would otherwise put Keycloak's
built-in **Deny Access**. Unlike Deny Access, which shows Keycloak's own access-denied
page, it redirects the browser back to the client's redirect URI with a stable code in the
`error` querystring parameter: the same redirect shape as a successful login, but carrying
the error instead of an authorization code.

The **Error code** dropdown offers standard OAuth2/OIDC authorization-error codes so the
client app can map a code to a localized message instead of rendering raw text:

| Code | Meaning |
|------|---------|
| `access_denied` (default) | Generic deny; fallback for any failed claim check. |
| `claim_missing` | A required identity claim (e.g. email) was absent from the IdP login. |
| `interaction_required` | Additional user interaction needed before access is granted. |
| `invalid_request` | Request missing a required parameter or otherwise malformed. |
| `invalid_scope` | Requested scope is invalid, unknown, or malformed. |
| `server_error` | Server-side failure. |
| `unauthorized_client` | Client not permitted to use this flow. |

Configs holding an older free-text value (not one of the above) are still honored — the
raw value is passed through rather than replaced.

## Installing

The extension ships as a single JAR published to Codeberg Packages. Add it to a Keycloak
container image by placing it in `/opt/keycloak/providers/` (the default provider
directory): in a `Dockerfile`, fetch it from the Maven repository during the build:

```dockerfile
ADD --chown=keycloak:keycloak --chmod=644 \
  https://codeberg.org/api/packages/khanetor/maven/me/khanetor/keycloak-idp-claim-utilities/2.0.2/keycloak-idp-claim-utilities-2.0.2.jar \
  /opt/keycloak/providers/keycloak-idp-claim-utilities.jar
```

Then start Keycloak as usual; the new provider IDs appear in the authentication flows or
identity-provider settings. For the latest version number and build/development details,
see the [repository README](https://codeberg.org/khanetor/keycloak-idp-claim-utilities).

## Why `deny-redirect` over `Deny Access`

The useful bit is the redirect. Keycloak's **Deny Access** ends login at its own
"Access denied" page, whose text the user has to read. Redirecting back to the app keeps
the flow in your app's hands — your UI renders whatever the error code means in this
context, in the user's own language, and can offer alternatives (e.g. "log in with a
different provider") instead of a dead end.


