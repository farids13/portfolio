"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Starfield from "./StartField";
import { useI18n } from "@/hooks/useI18n";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);
  const { t } = useI18n();

  return (
    <footer className="w-full bg-[#0a1022] py-12 text-white border-t border-lime-200">
      <Starfield count={50} />
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center space-x-4 md:space-x-6">
          <Image src="/images/logo.webp" alt="Farid Satria Logo" width={72} height={72} className="border-lime-200"/>
          <div>
            <h1 className="text-2xl font-extrabold text-lime-300"> Farid Satria</h1>
            <p className="text-gray-400 text-sm max-w-xs">
              Full Stack Engineer & Web Developer passionate about clean code
              and elegant UI.
            </p>
          </div>
        </div>
        <nav className="flex flex-wrap justify-center md:justify-start gap-8 font-semibold text-lg text-white">
          <a href="#hero" className="hover:text-lime-400 transition-colors"> {t("HOME")}</a>
          <a href="#who-am-i" className="hover:text-lime-400 transition-colors"> {t("ABOUT")}</a>
          <a href="#skills" className="hover:text-lime-400 transition-colors"> {t("SKILLS")}</a>
          <a href="#projects" className="hover:text-lime-400 transition-colors"> {t("PROJECTS")}</a>
        </nav>

        <div className="flex flex-col items-center md:items-end space-y-3">
          <div className="flex gap-5 text-lime-300 text-xl">
            <a href="https://github.com/farids13" aria-label="GitHub" className="hover:text-white transition-colors">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" >
                <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.44c.6.11.82-.26.82-.58v-2.1c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.74.08-.74 1.21.08 1.85 1.25 1.85 1.25 1.08 1.85 2.83 1.31 3.52 1 .11-.77.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.25-3.25-.12-.3-.54-1.53.12-3.19 0 0 1.01-.32 3.3 1.24a11.5 11.5 0 016 0c2.3-1.56 3.3-1.24 3.3-1.24.66 1.66.24 2.9.12 3.19.78.85 1.25 1.93 1.25 3.25 0 4.62-2.8 5.65-5.48 5.95.43.38.82 1.14.82 2.3v3.41c0 .32.22.7.82.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a href="https://wa.me/+62895358496255" aria-label="WhatsApp" className="hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                <path d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z" fill="currentColor"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z" fill="currentColor"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/farid-satria-508975a6" aria-label="LinkedIn" className="hover:text-white transition-colors" >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452H16.9v-5.569c0-1.329-.025-3.039-1.852-3.039-1.852 0-2.136 1.445-2.136 2.939v5.669H9.345V9h3.379v1.561h.047c.471-.89 1.623-1.828 3.342-1.828 3.574 0 4.232 2.352 4.232 5.405v6.314zM5.337 7.433a1.96 1.96 0 11.001-3.92 1.96 1.96 0 010 3.92zM7.119 20.452H3.557V9h3.562v11.452zM22.225 0H1.771C.792 0 0 .783 0 1.75v20.5C0 23.217.792 24 1.771 24h20.451C23.2 24 24 23.217 24 22.25V1.75C24 .783 23.2 0 22.225 0z" />
              </svg>
            </a>
          </div>
          <p className="text-gray-500 text-xs md:text-sm">
            © {year} Farid Satria. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
