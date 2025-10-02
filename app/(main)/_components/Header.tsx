"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import ButtonContact from '@/components/main/ButtonContact';
import { useI18n } from '@/hooks/useI18n';

export default function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { locale, t, changeLocale } = useI18n();

  return (
    <header className="flex w-full sm:justify-between items-center px-4 xs:px-6 sm:px-10 md:px-12 lg:px-15 py-4 xs:py-6 sm:py-8 md:py-10 font-bold xs:text-lg sm:text-xl bg-base relative">
      <Image src="/images/logo.png" alt="logo" width={60} height={60} className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />

      <div className="hidden sm:flex justify-center pl-10 w-full items-center sm:gap-6 md:gap-8 lg:gap-12 xl:gap-20">
        <a href="#who-am-i" className="hover:text-primary transition-colors text-sm sm:text-white md:text-lg">{t('ABOUT')}</a>
        <a href="#skills" className="hover:text-primary transition-colors text-sm sm:text-white md:text-lg">{t('SKILLS')}</a>
        <a href="#projects" className="hover:text-primary transition-colors text-sm sm:text-white md:text-lg">{t('PROJECTS')}</a>
        <div className="">
          <div className="hidden sm:flex">
            <button
              onClick={() => changeLocale('en')}
              className={`px-2 py-1 rounded-md text-sm transition-all duration-200 ${locale === 'en'
                  ? "bg-primary text-black shadow-sm"
                  : "text-gray-300 hover:text-white hover:bg-primary/20"
                }`}
            >
              🇺🇸 EN
            </button>
            <button
              onClick={() => changeLocale('id')}
              className={`px-2 py-1 rounded-md text-sm transition-all duration-200 ${locale === 'id'
                  ? "bg-primary text-black shadow-sm"
                  : "text-gray-300 hover:text-white hover:bg-primary/20"
                }`}
            >
              🇮🇩 ID
            </button>
          </div>
        </div>

        <div className="sm:hidden relative h-10 w-10 ml-auto">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="h-full w-full text-white hover:text-primary flex items-center justify-center"
          >
            <Image
              src="/svg/hamburger-button.svg"
              alt="Menu"
              fill
              className="w-6 h-6 xs:w-7 xs:h-7 text-white"
              style={{
                filter: 'brightness(0) invert(1)', // Makes SVG white
              }}
            />
          </button>

          {showMobileMenu && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-base border border-gray-600 rounded-lg shadow-lg z-50">
              <div className="py-2">
                {/* Language Switcher - Mobile */}
                <div className="px-4 py-2 border-b border-gray-600 flex gap-2 justify-center">
                  <button
                    onClick={() => changeLocale('en')}
                    className={`px-2 py-1 rounded-md text-sm font-medium transition-all duration-200 ${locale === 'en'
                        ? "bg-primary text-white shadow-sm"
                        : "text-gray-300 hover:text-white hover:bg-primary/20"
                      }`}
                  >
                    🇺🇸 EN
                  </button>
                  <button
                    onClick={() => changeLocale('id')}
                    className={`px-2 py-1 rounded-md text-sm font-medium transition-all duration-200 ${locale === 'id'
                        ? "bg-primary text-white shadow-sm"
                        : "text-gray-300 hover:text-white hover:bg-primary/20"
                      }`}
                  >
                    🇮🇩 ID
                  </button>
                </div>
                <a
                  href="#who-am-i"
                  onClick={() => setShowMobileMenu(false)}
                  className="block px-4 py-3 text-white hover:bg-primary/20 hover:text-primary transition-colors text-sm"
                >
                  {t('ABOUT')}
                </a>
                <a
                  href="#skills"
                  onClick={() => setShowMobileMenu(false)}
                  className="block px-4 py-3 text-white hover:bg-primary/20 hover:text-primary transition-colors text-sm"
                >
                  {t('SKILLS')}
                </a>
                <a
                  href="#projects"
                  onClick={() => setShowMobileMenu(false)}
                  className="block px-4 py-3 text-white hover:bg-primary/20 hover:text-primary transition-colors text-sm"
                >
                  {t('PROJECTS')}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <ButtonContact
          className="hidden sm:flex"
          onClick={() => {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
    </header>
  )
}
