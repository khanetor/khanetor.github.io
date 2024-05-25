import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Kha's personal blogs",
  description: "Everything that I want to share with the world",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Resume", link: "/resume" }
    ],

    sidebar: [
      {
        text: "About me",
        items: [
          { text: "Resume", link: "/resume"},
          // { text: "Markdown Examples", link: "/markdown-examples" },
          // { text: "Runtime API Examples", link: "/api-examples" }
        ]
      },
      {
        text: "Personal projects",
        items: []
      }
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/khanetor" }
    ]
  },
  markdown: {
    image: {
      lazyLoading: true,
    }
  },
})
