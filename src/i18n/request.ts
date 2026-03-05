import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const supportedLocales = ['en', 'sv'] as const;
type SupportedLocale = (typeof supportedLocales)[number];

const isSupportedLocale = (value: string): value is SupportedLocale => {
    return supportedLocales.includes(value as SupportedLocale);
};

const isObject = (value: unknown): value is Record<string, unknown> => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const deepMergeMessages = (
    base: Record<string, unknown>,
    override: Record<string, unknown>
): Record<string, unknown> => {
    const result = { ...base };

    for (const [key, value] of Object.entries(override)) {
        const baseValue = result[key];

        if (isObject(baseValue) && isObject(value)) {
            result[key] = deepMergeMessages(baseValue, value);
            continue;
        }

        result[key] = value;
    }

    return result;
};

export default getRequestConfig(async () => {
    const cookieStore = await cookies();
    const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value;
    const locale: SupportedLocale = localeFromCookie && isSupportedLocale(localeFromCookie)
        ? localeFromCookie
        : 'en';

    const defaultMessages = (await import('../../public/locales/en/common.json')).default as Record<string, unknown>;
    const localeMessages = (await import(`../../public/locales/${locale}/common.json`)).default as Record<string, unknown>;

    return {
        locale,
        messages: locale === 'en'
            ? defaultMessages
            : deepMergeMessages(defaultMessages, localeMessages)
    };
});
