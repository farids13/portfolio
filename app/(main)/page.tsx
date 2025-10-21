"use client";
import Image from "next/image";
import { useState } from "react";

import Header from "./_components/Header";

import type { ReactElement } from "react";


import AdditionalSkills from "@/app/(main)/_components/AdditionalSkills";
import CarouselProject from "@/components/main/CarouselProjectCard";
import ContactForm from "@/components/main/ContactForm";
import DownloadCVButton from "@/components/main/DownloadCVButton";
import ExperienceCard from "@/components/main/ExperienceCard";
import Footer from "@/components/main/Footer";
import ProjectSlide from "@/components/main/ProjectSlide";
import SkillGridCarousel from "@/components/main/SkillGridCarousel";
import Starfield from "@/components/main/StartField";
import Button from "@/components/ui/Button";
import additionalSkillsData from "@/data/additional-skills.json";
import skillsData from "@/data/skills.json";
import { useI18n } from "@/hooks/useI18n";

export default function Home(): ReactElement {
  const [showSlide, setShowSlide] = useState(false);
  const { t } = useI18n();

  return (
    <div className="relative overflow-x-hidden">
      <Starfield count={50} />
      <Header />

      {/* ================== This Main Page ==================== */}
      <main>
        <section id="hero" className="h-[85vh]">
          <div className="bg-base h-full relative flex justify-center">
            <div className="flex gap-1 sm:gap-3 flex-col absolute top-20 sm:top-10 lg:top-0 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:font-semibold">
              <div className="flex gap-2 sm:gap-5 justify-center items-center text-white">
                <h1>I&apos;m</h1>
                <h1 className="text-primary">Farid Satria</h1>
              </div>
              <div className="flex gap-2 sm:gap-5 justify-center items-center text-white">
                <h1 className="border border-white px-2 py-2 rounded-xl"> Full Stack </h1>
                <h1>Developer</h1>
              </div>
            </div>
            <div id="hero-image" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-3/5 flex justify-center items-end z-3">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[450px] h-[40vh] rounded-full bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-100 blur-[69pt] opacity-40"></div>
              <div className="relative w-full h-full flex items-end">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/hero.webp"
                    alt="hero"
                    fill
                    priority
                    className="object-contain object-bottom"
                  />
                </div>
              </div>
            </div>
            <div className="absolute w-full h-full bg-gradient-to-t from-[#2596be] to-transparent blur-xl z-0 opacity-40" />
          </div>
        </section>

        <section id="who-am-i" className="relative">
          <div className="w-full bg-[#0a1022] py-10 flex justify-center">
            <div className="absolute top-1/3 -right-50 sm:-right-45 lg:-right-25 w-[500px] h-[300px] -rotate-20 hover:rotate-0 hover:transition-transform duration-300 ease-in-out rounded-xl overflow-hidden flex items-center justify-center">
              <div className="absolute w-[120px] h-[120px] right-3/7 top-1/6 bg-white to-transparent rounded-full opacity-15 z-1 blur-xl" />
              <Image className="w-[80px] h-[130px] relative object-cover rounded-xl z-2 opacity-70 sm:opacity-100 hover:opacity-100 hover:transition-transform duration-300 ease-in-out hover:w-[150px] hover:h-[300px]" src="/images/whoami-2.webp" alt="who am i ismaya" width={300} height={300} />
            </div>
            <div className="absolute bottom-50 -left-50 sm:-left-40 lg:-left-25 w-[500px] rotate-12 hover:rotate-0 hover:transition-transform duration-300 ease-in-out rounded-xl overflow-hidden flex items-center justify-center">
              <Image className="w-[120px] h-[200px] relative object-cover rounded-xl z-2 opacity-70 hover:opacity-100 sm:opacity-100 hover:transition-transform duration-300 ease-in-out hover:w-[150px] hover:h-[300px]" src="/images/whoami-1.webp" alt="who am i alibaba" width={600} height={600} />
            </div>
            <div className="flex flex-col gap-6 mt-30 justify-center items-center max-w-[50%] mx-auto">
              <h1 className="text-7xl text-primary font-bold text-center font-dosis">
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

        <section id="skills" className="relative">
          <div className="w-full bg-[#0a1022] py-10 flex justify-center min-h-[500px]">
            <div className="flex flex-col gap-6 mt-20 justify-center items-center max-w-[95%] mx-auto px-4 sm:max-w-[90%] sm:px-2 h-full">
              <div className="absolute w-[120px] h-[120px] top-20 bg-white to-transparent rounded-full opacity-15 z-1 blur-xl" />
              <h1 className="text-5xl sm:text-7xl lg:text-8xl text-primary font-bold text-center font-dosis">{t("MY SKILLS")}</h1>
              <div className="flex flex-col gap-6 w-full items-center justify-center lg:flex-row sm:gap-2 sm:items-stretch sm:justify-center flex-1 min-h-[400px]">
                <SkillGridCarousel skills={skillsData.skills} />
                <ExperienceCard years={4} className="w-full min-w-[350px] lg:max-w-[400px] lg:flex-1" />
              </div>
            </div>
          </div>
        </section>

        <section id="additional-skills">
          <AdditionalSkills items={additionalSkillsData.items} />
        </section>

        <section id="projects" className="relative">
          <div className="w-full bg-[#0a1022] py-10 flex flex-col lg:flex-row justify-center gap-5 p-20 lg:p-0">
            <div className="absolute w-[120px] h-[120px] top-20 bg-white to-transparent rounded-full opacity-15 z-1 blur-xl" />
            <div className="max-w-200px px-15 min-h-[200px] max-h-[500px] flex flex-col items-center justify-center relative">
              <h2 className="text-4xl lg:text-6xl min-w-[350px] lg:min-w-[450px] max-w-[550px] text-primary font-bold justify-center text-center lg:text-left">
                {t("projectsTitle")}
              </h2>
              <h2 className="text-4xl lg:text-6xl min-w-[350px] lg:min-w-[450px] max-w-[550px] text-primary font-bold text-center lg:text-left justify-center">
                {t("projectsTitle2")}
              </h2>
              <Button className="relative lg:absolute lg:right-0 bottom-0 mt-5 text-lg min-w-[250px] lg:text-2xl justify-center px-10 py-5 z-20" onClick={() => setShowSlide(!showSlide)}>
                {showSlide ? t('hideProjects') : t('showProjects')}
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
        </section>

        <section id="contact" className="relative z-20">
          <div className="w-full bg-[#0a1022] lg:py-10 flex justify-center">
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}