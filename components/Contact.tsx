"use client";
import { useEffect, useState } from "react";
import CustomButton, { ButtonColor, ButtonSize } from "./CustomButton";
import SmokeEffect from "@/components/WebGLCanvas";
import { useCursorContext } from "@/context/CursorContext";

interface Props {
  contactSection: React.RefObject<HTMLDivElement>;
}

const Contact: React.FC<Props> = ({ contactSection }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const { setIsOverContact } = useCursorContext();
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="relative z-[999] flex flex-col items-center justify-center lg:h-[70vh] h-[50vh] bg-[#111111]"
      onMouseEnter={() => setIsOverContact(true)}
      onMouseLeave={() => setIsOverContact(false)}
    >
      <div
        className="text-center absolute z-10 pointer-events-none"
        ref={contactSection}
      >
        <h1 className="font-extrabold text-white text-[4rem] lg:text-[6rem] text-left font-Delirium tracking-[0.05em] leading-none whitespace-pre-line">
          INTERESTED IN{"\n"}WORKING{"\n"}TOGETHER?
        </h1>
      </div>
      <div className="z-10 absolute bottom-10">
        <CustomButton
          text="DROP ME AN EMAIL !"
          bgColor={ButtonColor.Black}
          size={ButtonSize.Medium}
        />
      </div>
      <div className="absolute inset-0 z-0">{isDesktop && <SmokeEffect />}</div>
    </div>
  );
};

export default Contact;
