import SkillCard from "@/components/ui/SkillCard";
import ExperienceCard from "@/components/main/ExperienceCard";
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
            <div className="absolute w-[450px] h-[650px] rounded-full bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-100 blur-[99pt] opacity-55"></div>
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
          <div className="w-full bg-[#0a1022] py-10 flex justify-center border border-red-500">
            <div className="flex flex-col gap-6 mt-30 justify-center border max-w-[40%] mx-auto border-yellow-500">
              <h1 className="text-6xl text-lime-200 font-bold text-center">WHO AM I ?</h1>
              <div className="flex flex-col gap-5 text-white justify-center items-center">
                <p className="text-center">Hi, I&apos;m Farid Satria — a passionate Full Stack Engineer who loves building meaningful digital experiences from front to back.</p>
                <p className="text-center">With a strong foundation in both frontend and backend development, I specialize in creating clean, efficient, and scalable applications that solve real-world problems.</p>
                <p className="text-center">I enjoy working with modern technologies, constantly learning new things, and turning complex ideas into simple and elegant solutions.</p>
                <p className="text-center">Whether it&apos;s crafting smooth UI/UX, optimizing backend APIs, or setting up reliable infrastructure, I thrive on challenges that push me to grow.</p>
                <p className="text-center">When I&apos;m not coding, I spend my time exploring new tools, contributing to side projects, and sharing knowledge with the dev community.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="relative z-20">
          <div className="w-full bg-[#0a1022] py-10 flex justify-center border border-red-500">
            <div className="flex flex-col gap-6 mt-30 justify-center border mx-auto border-yellow-500">
              <h1 className="text-6xl text-lime-200 font-bold text-center">MY SKILLS</h1>
              <div className="flex gap-2 ">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <SkillCard image="/images/logo-html.png" alt="html skill logo" />
                    <SkillCard image="/images/logo-html.png" alt="html skill logo" />
                    <SkillCard image="/images/logo-html.png" alt="html skill logo" />
                    <SkillCard image="/images/logo-html.png" alt="html skill logo" />
                  </div>
                  <div className="flex gap-2">
                    <SkillCard image="/images/logo-html.png" alt="html skill logo" />
                    <SkillCard image="/images/logo-html.png" alt="html skill logo" />
                    <SkillCard image="/images/logo-html.png" alt="html skill logo" />
                    <SkillCard image="/images/logo-html.png" alt="html skill logo" />
                  </div>
                </div>
                <ExperienceCard years={4} className="w-100" />
              </div>
            </div>
          </div>
        </section>

        <section id="additional-skills" className="relative z-20">
          <div className="w-full bg-[#0a1022] py-10 flex justify-center border border-red-500">
            <SkillCard className="flex flex-col gap-10 items-center justify-center w-[80%]" useSpotlight={false}>
              <h2 className="text-4xl text-center text-lime-200 font-bold">ADDITIONAL SKILLS</h2>
              <div className="relative flex gap-5">
                <div className="absolute  w-full h-full rounded-full bg-white blur-[40pt] opacity-20 -z-10 pointer-events-none"/>
                <Image width={120} height={120} src="/images/logo-html.png" alt="html skill logo" />
                <Image width={120} height={120} src="/images/logo-html.png" alt="html skill logo" />
                <Image width={120} height={120} src="/images/logo-html.png" alt="html skill logo" />
                <Image width={120} height={120} src="/images/logo-html.png" alt="html skill logo" />
                <Image width={120} height={120} src="/images/logo-html.png" alt="html skill logo" />
                <Image width={120} height={120} src="/images/logo-html.png" alt="html skill logo" />
                <Image width={120} height={120} src="/images/logo-html.png" alt="html skill logo" />
              </div>
            </SkillCard>
          </div>
        </section>


      </main>
      <footer>
        <p>Farid&apos;s Portfolio</p>
      </footer>
    </div>
  );
}
