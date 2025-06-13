"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useScroll } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import Cursor from "@/components/ui/Cursor";
import { CursorProvider } from "@/context/CursorContext";
import LoadCover from "@/components/LoadCover";
import Navbar from "@/components/layout/Navbar";
import CircleText from "@/components/CircleText";
import Name from "@/components/Name";
import AboutText from "@/components/AboutText";
import Contact from "@/components/layout/Contact";
import Card from "@/components/cards";
import { Spacer } from "@/components/Spacer";

gsap.registerPlugin(ScrollTrigger);

export default function HomeClient({ projects }: { projects: any[] }) {
  const projectsSection = useRef(null);
  const aboutSection = useRef(null);
  const contactSection = useRef(null);
  const container = useRef(null);
  const textRef = useRef(null);

  const scrollToSection = (section: React.RefObject<HTMLElement>) => {
    if (section.current) {
      section.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    let ctx = gsap.matchMedia();

    ctx.add("(max-width: 768px)", () => {
      gsap.fromTo(
        textRef.current,
        { rotate: "0deg", x: 0, transformOrigin: "left top" },
        {
          rotate: "90deg",
          x: 0,
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
  }, []);

  return (
    <main ref={container} className="containerGrainy scroll-smooth">
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
                className="lg:[writing-mode:vertical-lr] inline-block sticky left-0 top-[40vh] tracking-[.5rem] ml-10 mb-0 text-white"
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
