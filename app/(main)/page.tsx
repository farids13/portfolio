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
import additionalSkillsData from "@/data/additional-skills.json";
import SkillGridCarousel from "@/components/main/SkillGridCarousel";
import { ReactElement, useState } from "react";
import DownloadCVButton from "@/components/main/DownloadCVButton";
import ButtonContact from "@/components/main/ButtonContact";
import AdditionalSkills from "@/app/(main)/_components/AdditionalSkills";
import ProjectSlide from "@/components/main/ProjectSlide";
import Header from "./_components/Header";
import { useI18n } from "@/hooks/useI18n";

export default function Home(): ReactElement {
  const [showSlide, setShowSlide] = useState(false);
  const { t } = useI18n();

  return (
    <div className="relative overflow-x-hidden">
      <Starfield count={500} />
      <Header />

      {/* ================== This Main Page ==================== */}
      <main>
        <section id="hero" className="h-[85vh]">
          <div className="bg-base h-full relative flex justify-center">
            <div className="flex gap-3 flex-col absolute top-20 font-bold text-3xl  xs:text-4xl sm:text-5xl sm:font-light md:text-6xl lg:text-7xl">
              <div className="flex gap-5 justify-center items-center">
                <h1>I&apos;m</h1>
                <h1 className="text-primary">Farid Satria</h1>
              </div>
              <div className="flex gap-5 justify-center items-center">
                <h1 className="border border-white p-2 rounded-xl">
                  Full Stack
                </h1>
                <h1>Developer</h1>
              </div>
            </div>
            <div id="hero-image" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-3/5 flex justify-center items-end z-3">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[450px] h-[40vh] rounded-full bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-100 blur-[69pt] opacity-40"></div>
              <div className="relative w-full h-full flex items-end">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/hero.png"
                    alt="hero"
                    fill
                    priority
                    className="object-contain object-bottom"
                  />
                </div>
              </div>
            </div>
            <div className="absolute w-full h-full bg-gradient-to-t from-[#2596be] to-transparent blur-xl z-0 opacity-40" />
            <Starfield count={100} />
          </div>
        </section>

        <section id="who-am-i" className="relative z-20">
          <div className="w-full bg-[#0a1022] py-10 flex justify-center ">
            <Starfield count={50} />
            <div className="absolute top-1/3 -right-50 sm:-right-45 lg:-right-25 w-[500px] h-[300px] -rotate-20 hover:rotate-0 hover:transition-transform duration-300 ease-in-out rounded-xl overflow-hidden flex items-center justify-center">
              <div className="absolute w-[120px] h-[120px] border border-red-500 right-3/7 top-1/6 bg-white to-transparent rounded-full opacity-15 z-1 blur-xl" />
              <Image className="w-[80px] h-[130px] relative object-cover rounded-xl z-2 opacity-70 sm:opacity-100 hover:opacity-100 hover:transition-transform duration-300 ease-in-out hover:w-[150px] hover:h-[300px]" src="/images/whoami-2.jpg" alt="who am i ismaya" width={300} height={300} />
            </div>
            <div className="absolute bottom-50 -left-50 sm:-left-40 lg:-left-25 w-[500px] rotate-12 hover:rotate-0 hover:transition-transform duration-300 ease-in-out rounded-xl overflow-hidden flex items-center justify-center">
              <Image className="w-[120px] h-[200px] relative object-cover rounded-xl z-2 opacity-70 hover:opacity-100 sm:opacity-100 hover:transition-transform duration-300 ease-in-out hover:w-[150px] hover:h-[300px]" src="/images/whoami-1.jpg" alt="who am i alibaba" width={600} height={600} />
            </div>
            <div className="flex flex-col gap-6 mt-30 justify-center items-center max-w-[50%] mx-auto">
              <h1 className="text-6xl text-lime-200 font-bold text-center">
                {t("aboutTitle")}
              </h1>
              <div className="flex flex-col gap-5 text-white justify-center items-center mt-10 relative z-20">
                <p className="text-center">{t("aboutDescription1")}</p>
                <p className="text-center">{t("aboutDescription2")}</p>
                <p className="text-center">{t("aboutDescription3")}</p>
                <p className="text-center">{t("aboutDescription4")}</p>
                <p className="text-center">{t("aboutDescription5")}</p>
              </div>
              <DownloadCVButton className="w-full py-5 sm:w-full sm:mt-10 relative z-20" />
            </div>
          </div>
        </section>

        <section id="skills" className="relative z-20">
          <Starfield count={50} />
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

        <AdditionalSkills items={additionalSkillsData.items} />

        <section id="projects" className="relative z-20">
          <Starfield count={50} />
          <div className="w-full bg-[#0a1022] py-10 flex justify-center">
            <div className="w-200px px-30 h-500px flex items-center justify-center relative">
              <h2 className="text-6xl text-lime-200 font-bold text-left">
                THE WORKS CLOSEST TO <br />
                MY HEART
              </h2>
              <Button
                className="absolute bottom-0 text-2xl right-20 px-20 py-5 z-20"
                onClick={() => setShowSlide(!showSlide)}
              >
                {showSlide ? 'HIDE SLIDESHOW' : 'SHOW MY PROJECTS'}
              </Button>
            </div>
            <div className="relative w-full min-h-[500px] overflow-hidden">
              <div
                className={`transition-all duration-700 transform ${showSlide
                  ? 'opacity-0 absolute scale-90 translate-y-2'
                  : 'opacity-100 scale-100 translate-y-0 h-full'
                  }`}
              >
                <CarouselProject />
              </div>
              <div
                className={`transition-all duration-700 transform ${showSlide
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 absolute scale-105 -translate-y-2'
                  }`}
              >
                <ProjectSlide />
              </div>
            </div>
          </div>
          <Starfield count={50} />
        </section>

        <section id="contact" className="relative z-20">
          <Starfield count={50} />
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