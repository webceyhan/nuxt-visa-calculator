// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    devtools: { enabled: true },
    modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss'],
    i18n: {
        lazy: false,
        langDir: 'lang',
        defaultLocale: 'en',
        skipSettingLocaleOnNavigate: true,
        locales: [
            {
                code: 'en',
                name: 'English',
                file: 'en-US.json',
            },
            {
                code: 'tr',
                name: 'Türkçe',
                file: 'tr-TR.json',
            },
        ],
    },
});
