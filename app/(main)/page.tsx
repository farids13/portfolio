import Image from "next/image";
import { ReactElement } from "react";

export default function Home() :ReactElement {
  return (
   <div>
      <header className="flex justify-between items-center m-20 font-bold text-2xl">
        <Image src="/images/logo.png" alt="logo" width={100} height={100} />

        <div className="flex gap-20">
          <a href="">ABOUT</a>
          <a href="">SKILLS</a>
          <a href="">PROJECTS</a>
        </div>

        
        <button
      className="
        flex items-center border border-white rounded-full px-5 py-2
        bg-transparent text-white relative group transition-all
        hover:border-lime-300
      "
      style={{ borderColor: "#fff" }}
    >
      <span className="mr-4">CONTACT</span>
      <span
        className="
          flex items-center justify-center
          w-8 h-8 rounded-full
          bg-lime-200
          group-hover:bg-lime-300
          transition-colors
        "
      >
        {/* <ArrowUpRight size={20} color="#222" /> */}
      </span>
    </button>
        
      </header>
      <main>
        <section className="hero">
          <div className="flex flex-col items-center gap-2 text-6xl">
            <div className="flex gap-2 justify-center items-center">
              <h1>I'm</h1>
              <h1 className="text-lime-200">Farid Satria</h1>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <h1 className="border border-white p-2 rounded-xl">Full Stack</h1>
              <h1>Developer</h1>
            </div>
          </div>
          <div id="hero-image" className="border border-white rounded-full">
            <Image src="/images/hero.png" alt="hero" width={500} height={500} />
          </div>
        </section>
      </main>
      <footer>
        <p>Farid's Portfolio</p>
      </footer>
   </div>
  );
}
