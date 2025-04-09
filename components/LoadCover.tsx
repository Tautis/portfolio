"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import MorphingText from "./MorphingText";

const LoadCover: React.FC = () => {
  useEffect(() => {
    const useDisableScroll = (disable: boolean) => {
      if (disable) {
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.height = "100vh";
        document.documentElement.style.width = "100vw";

        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
        document.body.style.width = "100vw";
      } else {
        document.documentElement.style.overflow = "";
        document.documentElement.style.height = "";
        document.documentElement.style.width = "";

        document.body.style.overflow = "";
        document.body.style.height = "";
        document.body.style.width = "";
      }
    };
    useDisableScroll(true);

    const timeline = gsap.timeline();
    timeline.to(".morphing-text", {
      opacity: 0,
      duration: 0.5,
      ease: "power1.out",
      delay: 2,
    });

    timeline.to(
      ".div",
      {
        y: "-100vh",
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        delay: 1,
      },
      "-=1.5"
    );

    timeline.to(".cover", { opacity: 0, duration: 1, display: "none" });
    timeline.add(() => {
      useDisableScroll(false);
    }, "-=2");
    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full flex z-[999999] cover">
      <div className="bg-slate-800 flex-1 div"></div>
      <div className="bg-slate-800 flex-1 div"></div>
      <div className="bg-slate-800 flex-1 div"></div>
      <div className="bg-slate-800 flex-1 div"></div>

      <div className="absolute inset-0 flex justify-center items-center">
        <div className="morphing-text">
          <MorphingText />
        </div>
      </div>
    </div>
  );
};

export default LoadCover;
