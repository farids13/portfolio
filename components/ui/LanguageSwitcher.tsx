"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface LanguageSwitcherProps {
  className?: string;
}

const languages = [
  { code: "en", name: "EN", flag: "🇺🇸" },
  { code: "id", name: "ID", flag: "🇮🇩" },
];

export default function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('index');

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      // Set cookie untuk locale
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

      // Update URL dengan locale baru
      const currentPath = window.location.pathname;
      const newPath = `/${newLocale}${currentPath.startsWith(`/${locale}`) ? currentPath.slice(3) : currentPath}`;

      router.push(newPath);
      router.refresh();
    });
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          disabled={isPending || locale === lang.code}
          className={`
            flex items-center gap-2 px-2 py-1 rounded-md text-sm font-medium transition-all duration-200
            ${locale === lang.code
              ? "bg-primary text-white shadow-sm"
              : "text-gray-300 hover:text-white hover:bg-primary/20"
            }
            ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            disabled:cursor-not-allowed
          `}
          aria-label={`Switch to ${lang.name}`}
        >
          <span className="text-base">{lang.flag}</span>
          <span className="hidden xs:inline">{lang.name}</span>
        </button>
      ))}
    </div>
  );
}
