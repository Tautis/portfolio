"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRef } from "react";
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

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

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
        <div className="flex justify-around items-center h-full bg-[#181818]/90 opacity-0 lg:hover:opacity-100 focus:opacity-100 transition-opacity duration-500">
          <Link href={github} target="_blank">
            <div className="border-white-500 border-[1px] rounded-xl py-40 hover:scale-110 transition-transform duration-500">
              <div className="justify-items-center">
                <Github />
              </div>
              <p className="text-3xl pt-10 w-[80%] text-center justify-self-center font-bold">
                Check out the code here!
              </p>
            </div>
          </Link>
          <Link href={link} target="_blank">
            <div className="border-white-500 border-[1px] rounded-xl py-40 hover:scale-110 transition-transform duration-500">
              <div className="justify-items-center">
                <Internet />
              </div>
              <p className="text-3xl pt-10 w-[80%] text-center justify-self-center font-bold">
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
