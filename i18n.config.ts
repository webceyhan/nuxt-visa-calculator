export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: {
            welcome: 'Visa Calculator',
            date: {
                enter: 'Enter Date',
                exit: 'Exit Date',
                validUntil: 'Valid Until',
            },
            days: {
                used: 'Used Days',
                remaining: 'Remaining Days',
                maxAllowed: 'Max {days} days from enter date',
            },
        },
        tr: {
            welcome: 'Vize Hesaplama',
            date: {
                enter: 'Giriş Tarihi',
                exit: 'Çıkış Tarihi',
                validUntil: 'Geçerlilik Tarihi',
            },
            days: {
                used: 'Kullanılan Gün',
                remaining: 'Kalan Gün',
                maxAllowed: 'Giriş tarihinden itibaren en fazla {days} gün',
            },
        },
    },
}));
