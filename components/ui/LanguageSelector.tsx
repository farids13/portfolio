"use client"
import Image from 'next/image'
import React from 'react'


import { useI18n } from '@/hooks/useI18n';

export default function LanguageSelector({ className }: { className?: string }) {
    const { locale, changeLocale, mounted } = useI18n();

    if (!mounted) {
        return (
            <div className={`${className} min-w-[80px]`}>
                <button
                    disabled
                    className="px-2 py-1 rounded-md text-sm transition-all duration-200 text-gray-300"
                >
                    <Image src="/images/us-flag.webp" alt="EN" width={20} height={20} />
                    <span>EN</span>
                </button>
                <button
                    disabled
                    className="px-2 py-1 rounded-md text-sm transition-all duration-200 text-gray-300"
                >
                    <Image src="/images/indo-flag.webp" alt="ID" width={20} height={20} />
                    <span>ID</span>
                </button>
            </div>
        );
    }

    return (
        <div className={`${className} min-w-[80px]`}>
            <button
                onClick={() => changeLocale('en')}
                className={`px-2 py-1 rounded-md text-sm transition-all duration-200 ${locale === 'en'
                    ? "bg-primary text-black shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-primary/20"
                    }`}
            >
                <Image src="/images/us-flag.webp" alt="EN" width={20} height={20} />
                <span>EN</span>
            </button>
            <button
                onClick={() => changeLocale('id')}
                className={`px-2 py-1 rounded-md text-sm transition-all duration-200 ${locale === 'id'
                    ? "bg-primary text-black shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-primary/20"
                    }`}
            >
                <Image src="/images/indo-flag.webp" alt="ID" width={20} height={20} />
                <span>ID</span>
            </button>
        </div>
    )
}
