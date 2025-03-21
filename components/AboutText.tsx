"use client";
import { useEffect, useRef } from "react";
import { Spacer } from "./Spacer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AboutTextProps {
  aboutSection: React.RefObject<HTMLDivElement>;
}

const AboutText: React.FC<AboutTextProps> = ({ aboutSection }) => {
  const textBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && textBlockRef.current) {
      const chars = textBlockRef.current.querySelectorAll(".char");
      console.log(chars);
      gsap.set(chars, { y: 100, opacity: 0 });

      gsap.to(chars, {
        y: 0,
        opacity: 1,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textBlockRef.current,
          start: "top 100%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          onEnter: () => console.log("ScrollTrigger: Entered the trigger area"),
          onLeave: () => console.log("ScrollTrigger: Left the trigger area"),
        },
      });
    }
  }, []);

  const splitTextIntoChars = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char">
        {char}
      </span>
    ));
  };

  return (
    <div
      className="lg:max-w-[90rem] lg:mx-auto p-9 about-text"
      ref={aboutSection}
    >
      <p
        className=" lg:text-3xl/10 text-2xl text-gray-400 lg:w-[60rem]"
        ref={textBlockRef}
      >
        {splitTextIntoChars(
          "I’m a front-end developer with a focus on creating intuitive and visually engaging digital experiences. I specialize in building responsive and dynamic websites that blend performance with aesthetics."
        )}
        <br />
        <br />
        {splitTextIntoChars(
          "As a freelancer, I collaborate with brands and businesses to bring their ideas to life through clean and functional design."
        )}
      </p>
      <Spacer size="80" />

      <div className="text-gray-400">
        <table className="float-right text-xl">
          <thead>
            <tr className="text-left text-base">
              <th className="p-2 pl-0 tracking-[.5rem] pb-8">
                {splitTextIntoChars("EXPERTISE")}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="lg:p-2 py-2 lg:pr-60">
                {" "}
                {splitTextIntoChars("- React")}
              </td>
              <td className="lg:p-2 py-2">
                {" "}
                {splitTextIntoChars("- Typescript")}
              </td>
            </tr>
            <tr>
              <td className="lg:p-2 py-2 lg:pr-60">
                {" "}
                {splitTextIntoChars("- Tailwind CSS")}
              </td>
              <td className="lg:p-2 py-2">
                {" "}
                {splitTextIntoChars("- Next.js")}
              </td>
            </tr>
            <tr>
              <td className="lg:p-2 py-2 lg:pr-60">
                {" "}
                {splitTextIntoChars("- Three.js")}
              </td>
              <td className="lg:p-2 py-2">
                {" "}
                {splitTextIntoChars("- Concepting")}
              </td>
            </tr>
            <tr>
              <td className="lg:p-2 py-2">
                {" "}
                {splitTextIntoChars("- UI / UX Design")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AboutText;
