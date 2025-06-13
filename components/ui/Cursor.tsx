"use client";
import { useEffect, useState } from "react";
import { useCursorContext } from "@/context/CursorContext";

const Cursor: React.FC = () => {
  const { cursorSize, isOverContact } = useCursorContext();
  const [mousePosition, setMousePosition] = useState<{
    x: number | null;
    y: number | null;
  }>({ x: null, y: null });

  useEffect(() => {
    let animationFrameId: number;

    const updateMousePosition = (ev: MouseEvent) => {
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: ev.clientX - 10, y: ev.clientY - 10 });
      });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isOverContact) {
    return null;
  }

  return (
    <div
      className="fixed bg-white top-0 left-0 rounded-full select-none pointer-events-none z-[999999] opacity-30 flex items-center justify-center transition-[transform,height,width] duration-700"
      style={{
        top: `${mousePosition.y}px`,
        left: `${mousePosition.x}px`,
        width: `${cursorSize.width}px`,
        height: `${cursorSize.height}px`,
      }}
    />
  );
};

export default Cursor;
