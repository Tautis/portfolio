"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
type Props = {
  title: string;
  description: string;
  url?: string;
  src: string;
  color: string;
  i: number;
  range: any;
  progress: any;
  targetScale: number;
  image: string;
};

const Card = ({
  title,
  description,
  src,
  url,
  color,
  i,
  progress,
  range,
  targetScale,
  image,
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
        className={`relative flex flex-col h-[600px] w-[70%] rounded-2xl p-12 shadow-lg`}
        style={{
          scale,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          top: `calc(-5vh + ${i * 25}px)`,
        }}
      ></motion.div>
    </div>
  );
};

export default Card;
