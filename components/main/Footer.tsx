"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Starfield from "./StartField";

export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  const [year, setYear] = useState<number | null>(null);
  
  useEffect(() => setYear(new Date().getFullYear()), []);

  // Show "Back to top" button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) setShowTopBtn(true);
      else setShowTopBtn(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (

    <footer className="w-full bg-[#0a1022] py-12 text-white border-t border-lime-200">
      <Starfield count={50} />
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo + Brand Info */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <Image
              src="/images/logo.png"
              alt="Farid Satria Logo"
              width={72}
              height={72}
              className="border-lime-200"
            />
            <div>
              <h1 className="text-2xl font-extrabold text-lime-300">
                Farid Satria
              </h1>
              <p className="text-gray-400 text-sm max-w-xs">
                Full Stack Engineer & Web Developer passionate about clean code
                and elegant UI.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center md:justify-start gap-8 font-semibold text-lg text-white">
            <a href="#hero" className="hover:text-lime-400 transition-colors">
              Home
            </a>
            <a  
              href="#who-am-i"
              className="hover:text-lime-400 transition-colors"
            >
              About Me
            </a>
            <a href="#skills" className="hover:text-lime-400 transition-colors">
              Skills
            </a>
            <a
              href="#projects"
              className="hover:text-lime-400 transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="hover:text-lime-400 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Social Media & Copyright */}
          <div className="flex flex-col items-center md:items-end space-y-3">
            <div className="flex gap-5 text-lime-300 text-xl">
              {/* Replace # with your social links */}
              <a
                href="https://github.com/farids13"
                aria-label="GitHub"
                className="hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.44c.6.11.82-.26.82-.58v-2.1c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.74.08-.74 1.21.08 1.85 1.25 1.85 1.25 1.08 1.85 2.83 1.31 3.52 1 .11-.77.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.25-3.25-.12-.3-.54-1.53.12-3.19 0 0 1.01-.32 3.3 1.24a11.5 11.5 0 016 0c2.3-1.56 3.3-1.24 3.3-1.24.66 1.66.24 2.9.12 3.19.78.85 1.25 1.93 1.25 3.25 0 4.62-2.8 5.65-5.48 5.95.43.38.82 1.14.82 2.3v3.41c0 .32.22.7.82.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/farid-satria-508975a6"
                aria-label="LinkedIn"
                className="hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452H16.9v-5.569c0-1.329-.025-3.039-1.852-3.039-1.852 0-2.136 1.445-2.136 2.939v5.669H9.345V9h3.379v1.561h.047c.471-.89 1.623-1.828 3.342-1.828 3.574 0 4.232 2.352 4.232 5.405v6.314zM5.337 7.433a1.96 1.96 0 11.001-3.92 1.96 1.96 0 010 3.92zM7.119 20.452H3.557V9h3.562v11.452zM22.225 0H1.771C.792 0 0 .783 0 1.75v20.5C0 23.217.792 24 1.771 24h20.451C23.2 24 24 23.217 24 22.25V1.75C24 .783 23.2 0 22.225 0z" />
                </svg>
              </a>
              <a
                href="https://wa.me/6281234567890"
                aria-label="WhatsApp"
                className="hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.52 3.48C18.28 1.24 15.28 0 12.08 0 5.4 0 .16 5.24.16 11.92c0 2.1.55 4.05 1.54 5.76L0 24l6.5-1.7c1.64.9 3.51 1.4 5.58 1.4 6.68 0 11.92-5.24 11.92-11.92 0-3.2-1.24-6.2-3.48-8.36zM12.08 21.54c-1.92 0-3.7-.56-5.2-1.62l-.37-.23-3.86.98 1.03-3.76-.24-.38c-1.03-1.66-1.57-3.58-1.57-5.59 0-5.8 4.71-10.51 10.51-10.51 2.81 0 5.44 1.1 7.42 3.08s3.09 4.61 3.09 7.42c0 5.8-4.71 10.51-10.51 10.51z" />
                  <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.08-.13-.28-.2-.57-.35z" />
                </svg>
              </a>
            </div>
            <p className="text-gray-500 text-xs md:text-sm">
              © {year} Farid Satria. All rights reserved.
            </p>
          </div>
          {showTopBtn && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-8 right-8 bg-lime-300 hover:bg-lime-400 text-black rounded-full p-3 shadow-lg transition-colors"
          title="Back to top"
        >
          ↑
        </button>
      )}
        </div>
      </footer>
  );
}
