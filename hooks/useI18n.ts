// Custom React hook for i18n
"use client";

import { useState, useEffect } from 'react';
import { Locale, getMessage, getCurrentLocale, setLocaleInCookie } from '../lib/i18n';

export function useI18n() {
  const [currentLocale, setCurrentLocale] = useState<Locale>('en');

  useEffect(() => {
    setCurrentLocale(getCurrentLocale());
  }, []);

  const t = (key: string): string => {
    return getMessage(currentLocale, key);
  };

  const changeLocale = (newLocale: Locale) => {
    setCurrentLocale(newLocale);
    setLocaleInCookie(newLocale);
    // No URL change needed - just update state and cookie
  };

  return {
    locale: currentLocale,
    t,
    changeLocale,
  };
}
