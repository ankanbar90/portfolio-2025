"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function LightCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the cursor trail
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    window.addEventListener("mousemove", moveCursor);

    // Attach to all clickable elements
    document.querySelectorAll("a, button, .interactive").forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* The Dot (Always follows mouse exactly) */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-black rounded-full pointer-events-none z-[9999]"
        style={{ x: mouseX, y: mouseY, translateX: 12, translateY: 12 }}
      />

      {/* The Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-black rounded-full pointer-events-none z-[9998]" // Changed to border-2 and border-black
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: isHovered ? 2.5 : 1,
          backgroundColor: isHovered ? "rgba(0,0,0,0.05)" : "transparent",
        }}
      />
    </>
  );
}
