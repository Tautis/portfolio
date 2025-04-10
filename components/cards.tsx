"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Github } from "@/public/icons/github";
import { Internet } from "@/public/icons/internet";
type Props = {
  title: string;
  description: string;
  url?: string;
  color: string;
  link: string;
  github: string;
  i: number;
  range: any;
  progress: any;
  targetScale: number;
  image: string;
};

const Card = ({
  i,
  progress,
  range,
  targetScale,
  image,
  link,
  github,
}: Props) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(progress, range, [1, targetScale]);
  const [touched, setTouched] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    function handleClickOutside(event: { target: any }) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setTouched(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // for mobile
    const handleResize = () => {
      setIsSmallScreen(mediaQuery.matches);
    };
    handleResize();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);
  return (
    <div className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        className={`relative flex flex-col h-[600px] w-[70%] rounded-2xl shadow-lg`}
        style={{
          scale,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          top: `calc(-5vh + ${i * 25}px)`,
        }}
      >
        <div
          ref={divRef}
          onClick={() => setTouched(true)}
          className={`flex justify-around items-center h-full bg-[#181818]/90 transition-opacity duration-500 lg:pointer-events-auto ${
            touched && isSmallScreen
              ? "opacity-100"
              : "opacity-0 lg:opacity-0 lg:hover:opacity-100 focus:opacity-100"
          }`}
        >
          <Link
            href={github}
            target="_blank"
            style={{
              pointerEvents:
                (touched && isSmallScreen) || !isSmallScreen ? "auto" : "none",
            }}
          >
            <div className="rounded-xl py-40 hover:scale-110 transition-transform duration-500 ">
              <div className="justify-self-center lg:w-[98px] lg:h-[96px] w-[50px] h-[50px]">
                <Github />
              </div>
              <p className="lg:text-3xl pt-10 w-[80%] text-center justify-self-center font-bold">
                Check out the code here!
              </p>
            </div>
          </Link>
          <Link
            href={link}
            target="_blank"
            style={{
              pointerEvents:
                (touched && isSmallScreen) || !isSmallScreen ? "auto" : "none",
            }}
          >
            <div className="rounded-xl hover:scale-110 transition-transform duration-500">
              <div className="justify-self-center lg:w-[98px] lg:h-[96px] w-[50px] h-[50px]">
                <Internet />
              </div>
              <p className="lg:text-3xl pt-10 w-[80%] text-center justify-self-center font-bold">
                Check out the website!
              </p>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
