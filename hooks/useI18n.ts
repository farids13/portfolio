"use client";

import { useState, useEffect, useCallback } from 'react';

import { getMessage, getCurrentLocale, setLocaleInCookie } from '../lib/i18n';

import type { Locale} from '../lib/i18n';

export function useI18n() {
  const [currentLocale, setCurrentLocale] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentLocale(getCurrentLocale());
    const handleLocaleChange = (event: CustomEvent) => {
      setCurrentLocale(event.detail.locale);
    };
    window.addEventListener('localeChanged', handleLocaleChange as EventListener);
    return () => {
      window.removeEventListener('localeChanged', handleLocaleChange as EventListener);
    };
  }, []);

  const t = useCallback((key: string): string => {
    return getMessage(currentLocale, key);
  }, [currentLocale]);

  const changeLocale = useCallback((newLocale: Locale) => {
    setCurrentLocale(newLocale);
    setLocaleInCookie(newLocale);
    window.dispatchEvent(new CustomEvent('localeChanged', {
      detail: { locale: newLocale }
    }));
  }, []);

  return {
    locale: currentLocale,
    t,
    changeLocale,
    mounted,
  };
}
