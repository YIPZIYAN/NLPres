// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    modules: ["@nuxt/ui", "@primevue/nuxt-module"],
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    primevue: {
        autoImport: false,
        options: {
            theme: {
                preset: Aura,
            }
        },
        components: {
            prefix: 'p'
        },
    },
    plugins: ["~/plugins/preline.client.ts"],
})