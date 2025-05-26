"use client";
import SkillCard from "@/components/ui/SkillCard";
import ExperienceCard from "@/components/main/ExperienceCard";
import Image from "next/image";
import CarouselProject from "@/components/main/CarouselProjectCard";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/main/ContactForm";
import Footer from "@/components/main/Footer";
import Starfield from "@/components/main/StartField";
import skillsData from "@/data/skills.json";
import SkillGridCarousel from "@/components/main/SkillGridCarousel";
import { ReactElement } from "react";
import DownloadCVButton from "@/components/main/DownloadCVButton";
import ButtonContact from "@/components/main/ButtonContact";

export default function Home(): ReactElement {

  return (
    <div className="relative overflow-x-hidden">
      <header className="flex justify-between items-center px-15 py-10 font-bold text-xl  bg-[#0a1022]">
        <Image src="/images/logo.png" alt="logo" width={60} height={60} />

        <div className="flex gap-20">
          <a href="#who-am-i">ABOUT</a>
          <a href="#skills">SKILLS</a>
          <a href="#projects">PROJECTS</a>
        </div>
        <ButtonContact
          onClick={() => {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </header>

      {/* ================== This Main Page ==================== */}
      <main>
        <section id="hero" className="hero relative overflow-hidden">
          <div className="w-full bg-[#0a1022]">
            <div className="flex flex-col items-center gap-3 text-7xl">
              <div className="flex gap-5 justify-center items-center">
                <h1>I&apos;m</h1>
                <h1 className="text-lime-200">Farid Satria</h1>
              </div>
              <div className="flex gap-5 justify-center items-center">
                <h1 className="border border-white p-2 rounded-xl">
                  Full Stack
                </h1>
                <h1>Developer</h1>
              </div>
            </div>
            <div id="hero-image" className="flex justify-center mt-5 relative">
              <div className="absolute bottom-10 w-[450px] h-[500px] rounded-full bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-100 blur-[69pt] opacity-40"></div>
              <Image
                src="/images/hero.png"
                alt="hero"
                width={600}
                height={600}
                className="object-contain mix-blend-normal z-10 relative mt-10"
                style={{ backgroundColor: "transparent" }}
              />
            </div>
            <div className="absolute bottom-0 w-full h-[80%] bg-gradient-to-t from-[#2596be] to-transparent blur-xl z-0 opacity-40"/>
            <Starfield count={100} />
          </div>
        </section>

        <section id="who-am-i" className="relative z-20">
          <div className="w-full bg-[#0a1022] py-10 flex justify-center">
            <Starfield count={5} />
            <div className="absolute bottom-1/30 -left-20 w-[500px] h-[300px] rotate-12 rounded-xl overflow-hidden flex items-center justify-center">
              <div className="absolute w-[220px] h-[220px] right-1/5 bg-white to-transparent rounded-full opacity-15 z-1 blur-xl" />
              <Image className="w-[120px] h-[200px] relative object-cover rounded-xl z-2" src="/images/whoami-1.jpg" alt="who am i" width={600} height={600} />
            </div>
            <div className="absolute top-1/3 -right-25 w-[500px] h-[300px] -rotate-20 rounded-xl overflow-hidden flex items-center justify-center">
              <div className="absolute w-[120px] h-[120px] right-3/7 top-1/6 bg-white to-transparent rounded-full opacity-15 z-1 blur-xl" />
              <Image className="w-[80px] h-[130px]  relative object-cover rounded-xl z-2" src="/images/whoami-2.jpg" alt="who am i" width={300} height={300} />
            </div>
            <div className="flex flex-col gap-6 mt-30 justify-center items-center max-w-[50%] mx-auto">
              <Starfield count={10} />
              <h1 className="text-6xl text-lime-200 font-bold text-center">
                    WHO AM I ?
              </h1>
              <div className="flex flex-col gap-5 text-white justify-center items-center mt-10">
                <p className="text-center">
                  Hi, I'm Farid Satria — a passionate Full Stack Engineer
                  who loves building meaningful digital experiences from front
                  to back.
                </p>
                <p className="text-center">
                  With a strong foundation in both frontend and backend
                  development, I specialize in creating clean, efficient, and
                  scalable applications that solve real-world problems.
                </p>
                <p className="text-center">
                  I enjoy working with modern technologies, constantly learning
                  new things, and turning complex ideas into simple and elegant
                  solutions.
                </p>
                <p className="text-center">
                  Whether it's crafting smooth UI/UX, optimizing backend
                  APIs, or setting up reliable infrastructure, I thrive on
                  challenges that push me to grow.
                </p>
                <p className="text-center">
                  When I'm not coding, I spend my time exploring new tools,
                  contributing to side projects, and sharing knowledge with the
                  dev community.
                </p>
              </div>
              <DownloadCVButton />
            </div>
          </div>
        </section>

        <section id="skills" className="relative z-20">
          <div className="w-full bg-[#0a1022] py-10 flex justify-center">
            <div className="flex flex-col gap-6 mt-30 justify-center items-center max-w-[90%] mx-auto">
              <h1 className="text-6xl text-lime-200 font-bold text-center">
                MY SKILLS
              </h1>
              <div className="flex gap-2 w-full items-center justify-center ">
                <SkillGridCarousel skills={skillsData.skills} />
                <ExperienceCard years={4} className="w-100 flex-shrink-0 h-[98%]" />
              </div>
            </div>
          </div>
        </section>

        <section id="additional-skills" className="relative z-20">
          <div className="w-full bg-[#0a1022] py-10 flex justify-center">
            <SkillCard
              className="flex flex-col gap-10 items-center justify-center w-[80%]"
              useSpotlight={false}
            >
              <h2 className="text-4xl text-center text-lime-200 font-bold">
                ADDITIONAL SKILLS
              </h2>
              <div className="relative flex gap-5">
                <div className="absolute  w-full h-full rounded-full bg-white blur-[40pt] opacity-20 -z-10 pointer-events-none" />
                <Image
                  width={120}
                  height={120}
                  src="/images/logo-html.png"
                  alt="html skill logo"
                />
                <Image
                  width={120}
                  height={120}
                  src="/images/logo-html.png"
                  alt="html skill logo"
                />
                <Image
                  width={120}
                  height={120}
                  src="/images/logo-html.png"
                  alt="html skill logo"
                />
                <Image
                  width={120}
                  height={120}
                  src="/images/logo-html.png"
                  alt="html skill logo"
                />
                <Image
                  width={120}
                  height={120}
                  src="/images/logo-html.png"
                  alt="html skill logo"
                />
                <Image
                  width={120}
                  height={120}
                  src="/images/logo-html.png"
                  alt="html skill logo"
                />
                <Image
                  width={120}
                  height={120}
                  src="/images/logo-html.png"
                  alt="html skill logo"
                />
              </div>
            </SkillCard>
          </div>
        </section>

        <section id="projects" className="relative z-20">
          <div className="w-full bg-[#0a1022] py-10 flex justify-center">
            <div className="w-200px px-30 h-500px flex items-center justify-center relative">
              <h2 className="text-6xl text-lime-200 font-bold text-left">
                THE WORKS CLOSEST TO <br />
                MY HEART
              </h2>
              <Button className="absolute bottom-0 text-2xl right-0 px-20 py-5 z-20">
                SHOW MY PROJECTS
              </Button>
            </div>
            <CarouselProject />
          </div>
        </section>

        <section id="contact" className="relative z-20">
          <div className="w-full bg-[#0a1022] py-10 flex justify-center">
            <ContactForm />
          </div>
        </section>
      </main>

      
      {/* ================== This Footer ==================== */}
      <Footer />
    </div>
  );
}