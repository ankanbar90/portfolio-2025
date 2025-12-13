"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function MagneticButton() {
  const ref = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } =
          ref.current!.getBoundingClientRect();
        const x = (clientX - left - width / 2) * 0.25;
        const y = (clientY - top - height / 2) * 0.25;
        ref.current!.style.transform = `translate(${x}px, ${y}px) rotateX(${y}deg) rotateY(${-x}deg)`;
      }}
      onMouseLeave={() => {
        ref.current!.style.transform =
          "translate(0px, 0px) rotateX(0deg) rotateY(0deg)";
        setIsHover(false);
      }}
      onMouseEnter={() => setIsHover(true)}
      className="relative p-1 inline-block" // Added inline-block to fix layout
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-white overflow-hidden group shadow-lg"
      >
        <span className="relative z-10 flex items-center gap-2">
          Let's Talk <Sparkles className="w-5 h-5" />
        </span>
        <motion.div
          animate={{ rotate: isHover ? 360 : 0 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "conic-gradient(from 0deg, #fff, #8b5cf6, #ec4899, #fff)",
          }}
        />
      </motion.button>
    </motion.div>
  );
}
