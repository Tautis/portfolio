"use client";
import { useEffect, useRef, useState } from "react";
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
  const instagram = useRef(null);
  const linkedin = useRef(null);
  const github = useRef(null);

  function handleHoverOtherLinks(e: React.MouseEvent<HTMLAnchorElement>) {
    const slash1 = document.getElementById("slash1");
    const slash2 = document.getElementById("slash2");
    const anchor = e.target as HTMLAnchorElement;
    if (anchor.id === "ig") {
      slash2?.classList.add("hover-gray");
    }

    if (anchor.id === "gh") {
      slash1?.classList.add("hover-gray");
    }
    anchor.classList.add("hover-white");
  }

  function handleHoverOutLinks(e: React.MouseEvent<HTMLAnchorElement>) {
    const slash1 = document.getElementById("slash1");
    const slash2 = document.getElementById("slash2");
    const anchor = e.target as HTMLAnchorElement;
    anchor.classList.remove("hover-white");
    slash1?.classList.remove("hover-gray");
    slash2?.classList.remove("hover-gray");
  }
  return (
    <div
      className="relative z-[999] flex flex-col items-center justify-center h-[100vh] bg-[#111111]"
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
      <div className="z-10 absolute lg:bottom-[15vh] bottom-[20vh]">
        <a href="mailto:tautvydas.jankauskas123@gmail.com?subject=Hello There!">
          <CustomButton
            text="DROP ME AN EMAIL !"
            bgColor={ButtonColor.Black}
            size={ButtonSize.Medium}
          />
        </a>
      </div>

      <div className="absolute inset-0 z-0">{isDesktop && <SmokeEffect />}</div>
      <div className="absolute text-white bottom-6">
        <div className="flex items-center font-bold group">
          <a
            className="text-white hover:text-white group-hover:text-gray-500"
            href="https://www.instagram.com/"
            target="_blank"
            ref={instagram}
            onMouseOver={(e) => handleHoverOtherLinks(e)}
            onMouseOut={(e) => handleHoverOutLinks(e)}
            id="ig"
          >
            INSTAGRAM
          </a>
          <span className="mx-2" id="slash1">
            /
          </span>
          <a
            ref={linkedin}
            href="https://www.linkedin.com/in/tautvydas-jankauskas-99b951197/"
            target="_blank"
            onMouseOver={(e) => handleHoverOtherLinks(e)}
            onMouseOut={(e) => handleHoverOutLinks(e)}
            className="text-white hover:text-white group-hover:text-gray-500"
            id="lk"
          >
            LINKEDIN
          </a>
          <span className="mx-2" id="slash2">
            /
          </span>
          <a
            ref={github}
            href="https://github.com/Tautis"
            target="_blank"
            onMouseOver={(e) => handleHoverOtherLinks(e)}
            onMouseOut={(e) => handleHoverOutLinks(e)}
            className="text-white hover:text-white group-hover:text-gray-500"
            id="gh"
          >
            GITHUB
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
