"use client";
import { useCursorContext } from "@/context/CursorContext";
import useScrollDirections from "../hooks/useScrollDirections";

const CircleText: React.FC = () => {
  const isScrollingDown = useScrollDirections();

  return (
    <div
      className={`fixed z-[999998] transition-opacity duration-500 ${
        isScrollingDown ? "opacity-0" : "opacity-100"
      }`}
    >
      <img
        src="/scrollCircle.png"
        className={`fixed left-0 bottom-0 w-20 animate-spin z-50 [animation-duration:10s] m-6 opacity-60 `}
      />
      <div className="fixed left-10 bottom-10 m-[18px] flex items-center justify-center">
        <div className="w-3 h-3 bg-white rounded-full"></div>
      </div>
    </div>
  );
};
export default CircleText;
