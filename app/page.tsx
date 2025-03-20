"use client";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import CircleText from "@/components/CircleText";
import { CursorProvider } from "@/context/CursorContext";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import dynamic from "next/dynamic";
import { Spacer } from "@/components/Spacer";

import { projects } from "../public/data.js";
import Card from "@/components/cards";
import { useScroll } from "framer-motion";
import LoadCover from "@/components/LoadCover";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import AboutText from "@/components/AboutText";
import Contact from "@/components/Contact";
const Name = dynamic(() => import("../components/Name"), { ssr: false });
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isFirstAnimationComplete, setFirstAnimationComplete] = useState(false);

  const projectsSection = useRef(null);
  const aboutSection = useRef(null);
  const contactSection = useRef(null);

  const scrollToSection = (section: React.RefObject<HTMLElement>) => {
    if (section.current) {
      section.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const container = useRef(null);
  const textRef = useRef(null);
  const textBlockRef = useRef(null);

  const handleFirstAnimationComplete = () => {
    setFirstAnimationComplete(true);
  };

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    let ctx = gsap.matchMedia(); // Create matchMedia context

    ctx.add("(max-width: 768px)", () => {
      // This will only run on screens 768px or smaller (mobile)
      gsap.fromTo(
        textRef.current,
        { rotate: "0deg", x: 0, transformOrigin: "left top" }, // Start horizontal
        {
          rotate: "90deg", // Rotate to vertical on scroll
          x: 0, // Keep it at left-0
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top bottom-=200",
            end: "top center",
            scrub: true,
          },
        }
      );
    });

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <main ref={container} className="containerGrainy scroll-smooth">
      {" "}
      <CursorProvider>
        <Cursor />
        <LoadCover />
        <Navbar
          scrollToSection={scrollToSection}
          projectsSection={projectsSection}
          aboutSection={aboutSection}
          contactSection={contactSection}
        />
        <CircleText />
        <Name />
        <div className="z-[99998] relative bg-[#111111]">
          <div className="bg-black-500/40 grid mx-auto">
            <Spacer size="80" />
            <AboutText aboutSection={aboutSection} />
            <div className="" ref={projectsSection}>
              <p
                ref={textRef}
                className="lg:[writing-mode:vertical-lr] inline-block sticky left-0 top-96 tracking-[.5rem] ml-10 mb-0 text-white"
              >
                RECENT WORK
              </p>

              {projects.map((project, i) => {
                const targetScale = 1 - (projects.length - i) * 0.05;
                return (
                  <Card
                    key={i}
                    i={i}
                    {...project}
                    range={[i * 0.25, 1]}
                    targetScale={targetScale}
                    progress={scrollYProgress}
                  />
                );
              })}
            </div>
            <Spacer size="80" />
          </div>
        </div>
        <Contact contactSection={contactSection} />
      </CursorProvider>
    </main>
  );
}
