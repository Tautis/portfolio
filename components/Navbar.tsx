"use client";
import { useCursorContext } from "@/context/CursorContext";
import useScrollDirections from "@/hooks/useScrollDirections";
import { Logo } from "@/public/icons/logo";
import { useState } from "react";

type Props = {
  scrollToSection: (section: React.RefObject<HTMLElement>) => void;
  projectsSection: React.RefObject<HTMLElement>;
  aboutSection: React.RefObject<HTMLElement>;
  contactSection: React.RefObject<HTMLElement>;
};

function Navbar({
  scrollToSection,
  projectsSection,
  aboutSection,
  contactSection,
}: Props) {
  const { setCursorSize, setCursorOffset } = useCursorContext();
  const isScrollingDown = useScrollDirections();

  const [positions, setPositions] = useState<{
    [key: string]: { x: number; y: number };
  }>({});

  const handleMouseMove = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    setPositions({});
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const offsetX = (mouseX - rect.width / 1.5) * 1;
    const offsetY = (mouseY - rect.height / 1.5) * 1;

    setPositions((prevPositions) => ({
      ...prevPositions,
      [id]: { x: offsetX, y: offsetY },
    }));

    setCursorSize({ width: 30, height: 30 });
    setCursorOffset(-10);
  };

  const handleMouseLeave = (id: string) => {
    setPositions((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
    setCursorSize({ width: 20, height: 20 });
    setCursorOffset(0);
  };

  return (
    <div
      className={`fixed w-full p-8 transition-opacity duration-500 z-[999998] ${
        isScrollingDown ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex gap-7 justify-between text-sm tracking-[3px] font-custom opacity-70 z-[999]">
        <div className="float-left ">
          <Logo />
        </div>
        <div className="flex gap-7">
          <button
            id="projects"
            className="relative z-[999] transition-transform duration-300 ease-out text-white"
            onMouseMove={(e) => handleMouseMove(e, "projects")}
            onMouseLeave={() => handleMouseLeave("projects")}
            onClick={() => scrollToSection(projectsSection)}
            style={{
              transform: `translate(${positions.projects?.x || 0}px, ${
                positions.projects?.y || 0
              }px)`,
            }}
          >
            PROJECTS
          </button>
          <button
            id="about"
            className="relative z-[999] transition-transform duration-300 ease-out text-white"
            onMouseMove={(e) => handleMouseMove(e, "about")}
            onMouseLeave={() => handleMouseLeave("about")}
            onClick={() => scrollToSection(aboutSection)}
            style={{
              transform: `translate(${positions.about?.x || 0}px, ${
                positions.about?.y || 0
              }px)`,
            }}
          >
            ABOUT
          </button>
          <button
            id="contact"
            className="relative z-[999] transition-transform duration-300 ease-out text-white"
            onMouseMove={(e) => handleMouseMove(e, "contact")}
            onMouseLeave={() => handleMouseLeave("contact")}
            onClick={() => scrollToSection(contactSection)}
            style={{
              transform: `translate(${positions.contact?.x || 0}px, ${
                positions.contact?.y || 0
              }px)`,
            }}
          >
            CONTACT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
