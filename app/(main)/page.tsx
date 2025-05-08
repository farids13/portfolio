import { useTranslations } from "next-intl";
import Image from "next/image";
import { ReactElement } from "react";

export default function Home() :ReactElement {
  const t = useTranslations("index");
  return (
   <div>
      <header className="flex justify-center items-center h-20 bg-red-500">
        <a href="#">{t('logo')}</a>

        <a href="">{t('ABOUT')}</a>
        <a href="">{t('SKILLS')}</a>
        <a href="">{t('PROJECTS')}</a>
        

        <button className="bg-blue-500 border p-2">{t("CONTACT")}</button>
        
      </header>
      <main>
        <p>Farid's Portfolio</p>
      </main>
      <footer>
        <p>Farid's Portfolio</p>
      </footer>
   </div>
  );
}
