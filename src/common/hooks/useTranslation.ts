import { useTranslations } from 'next-intl';

export const useTranslation = (page: string) => {
    const t = useTranslations();
    const prefix = page === '' ? '' : page + '.';

    return (key: string, options?: Record<string, string | number>) => {
        const fullKey = prefix + key;
        try {
            return t(fullKey, options);
        } catch {
            try {
                return t(key, options);
            } catch {
                return fullKey;
            }
        }
    };
};

