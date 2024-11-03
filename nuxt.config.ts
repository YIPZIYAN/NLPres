// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
import {definePreset} from "@primeuix/styled";

// const MyPreset = definePreset(Aura, {
//     semantic: {
//         primary: {
//             50: '{indigo.50}',
//             100: '{indigo.100}',
//             200: '{indigo.200}',
//             300: '{indigo.300}',
//             400: '{indigo.400}',
//             500: '{indigo.500}',
//             600: '{indigo.600}',
//             700: '{indigo.700}',
//             800: '{indigo.800}',
//             900: '{indigo.900}',
//             950: '{indigo.950}'
//         }
//     }
// });

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    runtimeConfig:{
        public:{
            baseUrl: 'http://127.0.0.1:8000/api/',
        }
    },
    modules: [
      "@nuxt/ui",
      "@primevue/nuxt-module",
      'shadcn-nuxt',
      '@vueuse/motion/nuxt',
      '@sidebase/nuxt-auth',
    ],
    auth: {
        globalAppMiddleware: true,
        baseURL: 'http://127.0.0.1:8000/api/auth/',
        provider: {
            type: 'local',
            endpoints: {
                signIn: { path: 'login/', method: 'post' },
                signOut: { path: 'logout/', method: 'post' },
                signUp: { path: 'registration/', method: 'post' },
                getSession: { path: 'user/', method: 'get' },
            },
            session: {
                dataType: {
                    id: 'string | number',
                    username: 'string',
                    email: 'string',
                },
            },
            token: {
                signInResponseTokenPointer: '/access',
            }
        },
    },
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
                options: {
                    darkModeSelector: '.dark',
                },
                preset: definePreset(Aura, {
                    semantic: {
                        primary: {
                            50: '{blue.50}',
                            100: '{blue.100}',
                            200: '{blue.200}',
                            300: '{blue.300}',
                            400: '{blue.400}',
                            500: '{blue.500}',
                            600: '{blue.600}',
                            700: '{blue.700}',
                            800: '{blue.800}',
                            900: '{blue.900}',
                            950: '{blue.950}'
                        }
                    }
                })
            }
        },
        components: {
            prefix: 'p'
        },
    },
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: 's',
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: './components/ui'
    },
    plugins: ["~/plugins/preline.client.ts"],
})