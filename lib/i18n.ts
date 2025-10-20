import enMessages from '../public/locales/en.json';
import idMessages from '../public/locales/id.json';

export type Locale = 'en' | 'id';

export const locales = ['en', 'id'] as const;

const messages = {
  en: enMessages,
  id: idMessages,
};

export function getMessage(locale: Locale, key: string): string {
  const keys = key.split('.');
  let current: unknown = messages[locale];

  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = (current as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }

  return typeof current === 'string' ? current : key;
}

export function getCurrentLocale(): Locale {
  if (typeof window !== 'undefined') {
    const cookieLocale = document.cookie
      .split('; ')
      .find(row => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1];

    if (cookieLocale && locales.includes(cookieLocale as Locale)) {
      return cookieLocale as Locale;
    }
  }

  return 'en';
}

export function setLocaleInCookie(locale: Locale): void {
  if (typeof window !== 'undefined') {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
  }
}
