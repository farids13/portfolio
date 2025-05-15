import Image from "next/image";
import { ReactElement } from "react";

export default function Home(): ReactElement {
  return (
    <div>
      <header className="flex justify-between items-center m-20 font-bold text-2xl">
        <Image src="/images/logo.png" alt="logo" width={80} height={80} />

        <div className="flex gap-20">
          <a href="#">ABOUT</a>
          <a href="#">SKILLS</a>
          <a href="#">PROJECTS</a>
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

      {/* ================== This Main Page ==================== */}
      <main>
        <section id="hero" className="hero relative overflow-hidden">
          <div className="flex flex-col items-center gap-3 text-7xl">
            <div className="flex gap-5 justify-center items-center">
              <h1>I&apos;m</h1>
              <h1 className="text-lime-200">Farid Satria</h1>
            </div>
            <div className="flex gap-5 justify-center items-center">
              <h1 className="border border-white p-2 rounded-xl">Full Stack</h1>
              <h1>Developer</h1>
            </div>
          </div>
          <div id="hero-image" className="flex justify-center mt-5 relative">
            <div className="absolute w-[650px] h-[650px] rounded-full bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-100 blur-[99pt] opacity-55"></div>
            <Image 
              src="/images/hero.png" 
              alt="hero" 
              width={600} 
              height={600}
              className="object-contain mix-blend-normal z-10 relative mt-10" 
              style={{ backgroundColor: 'transparent' }}
            />
          </div>
        </section>
        <section id="who-am-i" className="relative z-20">
          <div className="w-full bg-[#0a1022] py-10">
            <h1 className="text-9xl text-white text-center">WHO AM I ?</h1>
          </div>
        </section>
      </main>
      <footer>
        <p>Farid&apos;s Portfolio</p>
      </footer>
    </div>
  );
}
