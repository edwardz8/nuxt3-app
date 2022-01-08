import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                },
            },
        },
    },
    css: [
        "~/assets/css/tailwind.css"
    ],
    /* serverMiddleware: [
        '~/server/api/index.js'
    ] */
    /* publicRuntimeConfig: {
        sbUrl: process.env.SUPABASE_URL,
        sbKey: process.env.SUPABASE_KEY,
      } */
})