import Image from "next/image";
import { ReactElement } from "react";

export default function Home() :ReactElement {
  return (
   <div>
      <header className="flex justify-center items-center h-20 bg-red-500">
        <a href="#">logo</a>

        <a href="">ABOUT</a>
        <a href="">SKILLS</a>
        <a href="">PROJECTS</a>
        

        <button className="bg-blue-500">CONTACT</button>
        
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
