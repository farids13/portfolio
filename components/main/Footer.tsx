"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);

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
                href="#"
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
                href="#"
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
                href="#"
                aria-label="Twitter"
                className="hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.954 4.569a10 10 0 01-2.825.775 4.92 4.92 0 002.163-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.38 4.482A13.93 13.93 0 011.671 3.15a4.902 4.902 0 001.523 6.573 4.9 4.9 0 01-2.228-.616v.06a4.916 4.916 0 003.946 4.812 4.996 4.996 0 01-2.224.085 4.918 4.918 0 004.588 3.417 9.866 9.866 0 01-6.102 2.104c-.395 0-.786-.023-1.17-.067a13.945 13.945 0 007.548 2.209c9.058 0 14.01-7.513 14.01-14.01 0-.213-.005-.425-.014-.636a10.012 10.012 0 002.46-2.548l-.047-.02z" />
                </svg>
              </a>
            </div>
            <p className="text-gray-500 text-xs md:text-sm">
              © {new Date().getFullYear()} Farid Satria. All rights reserved.
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
    // <footer className="bg-[#0a1022] text-white py-12 px-8 relative">
    //   <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8 md:gap-0 items-center md:items-start">
    //     {/* Logo & Social */}
    //     <div className="flex flex-col items-center md:items-start gap-6">
    //       <Image
    //         src="/images/logo.png"
    //         alt="Farid Satria Logo"
    //         width={80}
    //         height={80}
    //         className="mb-2"
    //       />
    //       <p className="text-lime-200 font-semibold text-lg">Farid Satria</p>
    //       <div className="flex gap-6 mt-2">
    //         {/* Example social icons with accessible labels */}
    //         <a
    //           href="https://github.com/faridsatria"
    //           aria-label="GitHub Profile"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="hover:text-lime-300 transition-colors"
    //         >
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-6 w-6"
    //             fill="currentColor"
    //             viewBox="0 0 24 24"
    //             role="img"
    //           >
    //             <title>GitHub</title>
    //             <path d="M12 0C5.372 0 0 5.372 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.755-1.333-1.755-1.09-.745.082-.73.082-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.997.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.334-5.466-5.932 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.007-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.02.005 2.046.138 3.003.404 2.292-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.803 5.628-5.475 5.922.43.37.814 1.102.814 2.222 0 1.606-.015 2.9-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.628-5.373-12-12-12z" />
    //           </svg>
    //         </a>
    //         <a
    //           href="https://linkedin.com/in/faridsatria"
    //           aria-label="LinkedIn Profile"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="hover:text-lime-300 transition-colors"
    //         >
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-6 w-6"
    //             fill="currentColor"
    //             viewBox="0 0 24 24"
    //             role="img"
    //           >
    //             <title>LinkedIn</title>
    //             <path d="M20.452 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.852 0-2.135 1.445-2.135 2.94v5.666h-3.554V9h3.414v1.561h.05c.476-.9 1.637-1.85 3.369-1.85 3.604 0 4.271 2.372 4.271 5.456v6.285zM5.337 7.433a2.07 2.07 0 01-2.068-2.066 2.068 2.068 0 114.137 0 2.07 2.07 0 01-2.069 2.066zm1.777 13.02H3.56V9h3.554v11.453zM22.225 0H1.771C.792 0 0 .774 0 1.728v20.543C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.728C24 .774 23.2 0 22.225 0z" />
    //           </svg>
    //         </a>
    //         {/* Add more socials if you want */}
    //       </div>
    //     </div>

    //     {/* Newsletter */}
    //     <div className="w-full max-w-md">
    //       <h3 className="text-lime-200 font-bold mb-4 text-center md:text-left text-2xl">
    //         Subscribe to my newsletter
    //       </h3>
    //       <form
    //         onSubmit={(e) => {
    //           e.preventDefault();
    //           alert("Thanks for subscribing! (Simulated)");
    //         }}
    //         className="flex flex-col sm:flex-row gap-4"
    //         aria-label="Newsletter Subscription Form"
    //       >
    //         <input
    //           type="email"
    //           required
    //           placeholder="Enter your email"
    //           aria-label="Email address"
    //           className="px-4 py-3 rounded-md bg-white text-black flex-grow focus:outline-none focus:ring-2 focus:ring-lime-300"
    //         />
    //         <button
    //           type="submit"
    //           className="bg-lime-300 hover:bg-lime-400 text-black font-semibold rounded-md px-6 py-3 transition-colors"
    //           aria-label="Subscribe to newsletter"
    //         >
    //           Subscribe
    //         </button>
    //       </form>
    //     </div>

    //     {/* Copyright */}
    //     <div className="text-center md:text-right text-sm text-gray-400 mt-8 md:mt-0">
    //       &copy; {new Date().getFullYear()} Farid Satria. All rights reserved.
    //     </div>
    //   </div>

    //   {/* Back to top button */}
    //  
    // </footer>
  );
}
