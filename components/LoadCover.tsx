"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import MorphingText from "./MorphingText";

const LoadCover: React.FC = () => {
  useEffect(() => {
    const useDisableScroll = (disable: boolean) => {
      if (disable) {
        console.log("called");
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
    // Fade out MorphingText right before the divs start moving
    timeline.to(".morphing-text", {
      opacity: 0,
      duration: 0.5, // Quick fade out
      ease: "power1.out",
      delay: 2,
    });

    // GSAP animation to move the divs up and fade them out
    timeline.to(
      ".div",
      {
        y: "-100vh", // Move each div up by the full viewport height
        opacity: 0, // Fade out each div
        duration: 1, // Duration of the animation
        stagger: 0.3, // Delay between each div's animation (0.3s drag)
        ease: "power2.out",
        delay: 1, // Easing for a smooth effect
      },
      "-=1.5" // Start 0.3s after the MorphingText fade-out begins
    );

    // Optionally, hide the cover after all animations complete
    timeline.to(".cover", { opacity: 0, duration: 1, display: "none" });
    timeline.add(() => {
      useDisableScroll(false);
    }, "-=2");
    return () => {
      timeline.kill(); // Proper cleanup to stop GSAP animations
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
