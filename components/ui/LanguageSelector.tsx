"use client"
import React from 'react'
import { useI18n } from '@/hooks/useI18n';

export default function LanguageSelector({ className }: { className?: string }) {
    const { locale, changeLocale, mounted } = useI18n();
    if (!mounted) {
        return <div className={`${className} w-16 h-8`}></div>;
    }

    return (
        <div className={className}>
            <button
                onClick={() => changeLocale('en')}
                className={`px-2 py-1 rounded-md text-sm transition-all duration-200 ${locale === 'en'
                    ? "bg-primary text-black shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-primary/20"
                    }`}
            >
                🇺🇸 EN
            </button>
            <button
                onClick={() => changeLocale('id')}
                className={`px-2 py-1 rounded-md text-sm transition-all duration-200 ${locale === 'id'
                    ? "bg-primary text-black shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-primary/20"
                    }`}
            >
                🇮🇩 ID
            </button>
        </div>
    )
}
