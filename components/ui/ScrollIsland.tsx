"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface IslandProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  onClick?: () => void;
}

export default function ScrollIsland({
  children,
  delay = 0,
  className = "",
  onClick,
}: IslandProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.9, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: delay,
      }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={`
        bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] 
        border border-slate-100 p-8 
        backdrop-blur-sm 
        ${
          onClick
            ? "cursor-none interactive active:scale-95 transition-transform"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
