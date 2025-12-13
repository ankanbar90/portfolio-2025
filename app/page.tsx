"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaArrowRight,
  FaCode,
  FaEnvelope,
  FaDownload,
  FaUser,
  FaTimes,
  FaCertificate,
  FaRegNewspaper,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPython,
  FaPhp,
  FaReact,
  FaUniversity,
  FaBrain,
  FaPaperPlane,
  FaCheckCircle,
  FaPhone,
} from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiFramer, SiMysql } from "react-icons/si";

// --- 1. MAGNETIC CURSOR ---
const MagneticCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 h-8 w-8 rounded-full border border-gray-800 bg-white/20 backdrop-invert mix-blend-difference"
      style={{ x: cursorXSpring, y: cursorYSpring }}
    />
  );
};

// --- 2. HEADER ---
const Header = ({ onAboutClick }: { onAboutClick: () => void }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = ["Status", "Projects", "Tech", "Contact", "Connect"];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-6 md:px-12 bg-gradient-to-b from-white/90 to-transparent backdrop-blur-[2px]"
    >
      <div
        className="text-xl font-bold tracking-tighter text-gray-900 cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        AB.
      </div>
      <nav className="flex gap-4 md:gap-8 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
        <button
          onClick={onAboutClick}
          className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap"
        >
          About
        </button>
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            {item}
          </button>
        ))}
      </nav>
    </motion.header>
  );
};

// --- 3. ABOUT ME MODAL ---
const AboutModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/60 bg-white/80 p-8 shadow-2xl backdrop-blur-xl md:p-12 custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <FaTimes className="text-xl text-gray-600" />
            </button>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="md:col-span-1 flex flex-col items-center text-center">
                <div className="w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src="/profile.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Ankan Bar</h2>
                <p className="text-sm text-blue-600 font-semibold uppercase tracking-widest mb-4">
                  AIML Engineer Pursuing
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Passionate about building fluid web experiences and
                  intelligent systems. Building Skills in Full-Stack Development
                  | Exploring AI & Machine Learning | AIML Student Combining
                  creativity with code.
                </p>
              </div>

              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                    <FaCertificate className="text-blue-500" /> Certificates
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Machine Learning A-Z",
                      "React Advanced Patterns",
                      "Python Masterclass",
                    ].map((cert, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-white/50 border border-white hover:shadow-md transition-shadow"
                      >
                        <p className="font-semibold text-gray-800 text-sm">
                          {cert}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Udemy • 2024
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                    <FaRegNewspaper className="text-blue-500" /> Recent Posts
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/50 border border-white hover:bg-white/80 transition-colors cursor-pointer">
                      <h4 className="font-bold text-gray-800">
                        The Future of UI Design
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Exploring glassmorphism and fluid animations in 2025.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/50 border border-white hover:bg-white/80 transition-colors cursor-pointer">
                      <h4 className="font-bold text-gray-800">
                        Why I switched to Next.js
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        A deep dive into server components and performance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- 4. MAGIC NAME ---
const MagicName = () => {
  const name = "Ankan Bar";
  const controls = useAnimation();

  // Fix: Move random generation to onClick/Trigger to avoid hydration mismatch
  const explode = async () => {
    await controls.start((i) => ({
      x: (Math.random() - 0.5) * 500,
      y: (Math.random() - 0.5) * 500,
      rotate: Math.random() * 720,
      scale: Math.random() * 1.5 + 0.5,
      opacity: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    }));
    await controls.start({
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    });
  };

  return (
    <div className="relative cursor-pointer select-none mb-4" onClick={explode}>
      <h1 className="flex justify-center text-6xl font-extrabold tracking-tighter text-gray-900 md:text-9xl">
        {name.split("").map((char, i) => (
          <motion.span
            custom={i}
            animate={controls}
            key={i}
            className={`inline-block ${char === " " ? "w-4 md:w-8" : ""}`}
            whileHover={{ scale: 1.2, color: "#2563EB", y: -10 }}
          >
            {char}
          </motion.span>
        ))}
      </h1>
      <p className="text-center text-xs uppercase tracking-widest text-gray-400 opacity-60 mt-2">
        ( Click me )
      </p>
    </div>
  );
};

// --- 5. REUSABLE GLASS CARD ---
const GlassCard = ({
  children,
  className,
  direction = "up",
  delay = 0,
}: any) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
        y: direction === "up" ? 100 : 0,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, delay: delay, type: "spring", bounce: 0.3 }}
      whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.6)" }}
      className={`group relative overflow-hidden rounded-3xl border border-white/60 bg-white/40 shadow-xl backdrop-blur-md transition-all hover:border-white hover:shadow-2xl ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- 6. TECH BUBBLE COMPONENT (FIXED HYDRATION) ---
const TechBubble = ({ icon, name, color, delay }: any) => {
  // Use State to hold random values to ensure Client/Server match
  const [randomVals, setRandomVals] = useState<{
    y: number[];
    x: number[];
    scale: number[];
  } | null>(null);

  useEffect(() => {
    // Generate random values ONLY on the client side
    setRandomVals({
      y: [0, (Math.random() - 0.5) * 30, 0],
      x: [0, (Math.random() - 0.5) * 30, 0],
      scale: [
        1,
        0.85 + Math.random() * 0.1,
        1.15 + Math.random() * 0.1,
        0.9,
        1,
      ],
    });
  }, []);

  if (!randomVals) return null; // Don't render until hydration is complete

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.6}
      dragTransition={{ bounceStiffness: 500, bounceDamping: 10 }}
      whileHover={{ scale: 1.2, cursor: "grab", zIndex: 10 }}
      whileTap={{ scale: 0.9, cursor: "grabbing" }}
      animate={{
        y: randomVals.y,
        x: randomVals.x,
        scale: randomVals.scale,
      }}
      transition={{
        duration: 3 + Math.random() * 4, // This math.random is fine inside animate prop
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: delay,
      }}
      className="flex flex-col items-center justify-center gap-2"
    >
      <div
        className={`flex h-20 w-20 items-center justify-center rounded-full border border-white/50 bg-white/30 backdrop-blur-md shadow-lg transition-colors hover:bg-white/60 ${color}`}
      >
        <div className="text-4xl">{icon}</div>
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-white/50 px-2 py-1 rounded-full">
        {name}
      </span>
    </motion.div>
  );
};

// --- 7. STATUS BENTO GRID ---
const StatusBento = () => {
  return (
    <section id="status" className="py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="md:col-span-2 p-10 flex flex-col justify-center min-h-[250px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/4"></div>

            <div className="flex items-center gap-3 mb-4 text-blue-600">
              <FaUniversity className="text-2xl" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Education Status
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Currently in my{" "}
              <span className="text-blue-600">3rd Year of Engineering</span>
            </h3>
            <p className="mt-4 text-lg text-gray-600">
              Specializing in Artificial Intelligence & Machine Learning.
            </p>
          </GlassCard>

          <GlassCard className="flex items-center justify-center p-10 min-h-[250px] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-40 h-40 border-[1px] border-dashed border-gray-300 rounded-full absolute"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-28 h-28 border-[1px] border-dotted border-blue-400 rounded-full absolute"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-12 h-12 bg-gradient-to-tr from-blue-100 to-white rounded-full shadow-lg flex items-center justify-center"
              >
                <FaBrain className="text-blue-500 text-xl" />
              </motion.div>
            </div>
            <p className="absolute bottom-6 text-xs font-bold uppercase tracking-widest text-gray-400">
              AI / ML Core
            </p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

// --- NEW COMPONENT: ASK ME ANYTHING (CONTACT FORM) ---
const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setForm({ name: "", phone: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12 text-center text-4xl font-bold tracking-tight text-gray-900 md:text-5xl"
        >
          Ask Me Anything
          <span className="block text-sm font-normal text-gray-500 mt-2 tracking-wide">
            Drop a message or just say hello!
          </span>
        </motion.h2>

        <GlassCard className="p-8 md:p-12 relative overflow-hidden">
          <AnimatePresence>
            {isSent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="text-6xl text-green-500 mb-4"
                >
                  <FaCheckCircle />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Message Sent!
                </h3>
                <p className="text-gray-600">I'll get back to you shortly.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                  <FaUser /> Name
                </label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-white/60 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 backdrop-blur-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                  <FaPhone /> Phone No
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-white/60 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 backdrop-blur-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <FaEnvelope /> Email
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-white/60 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 backdrop-blur-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-gray-500">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-white/60 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 backdrop-blur-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="What's on your mind?"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="group flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                Send Message{" "}
                <FaPaperPlane className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </form>
        </GlassCard>
      </div>
    </section>
  );
};

// --- NEW FOOTER COMPONENT ---
const Footer = ({ onAboutClick }: { onAboutClick: () => void }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 py-12 px-6 border-t border-white/40 bg-white/30 backdrop-blur-md">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="text-2xl font-bold tracking-tighter text-gray-900">
          AB.
        </div>

        {/* Footer Nav */}
        <nav className="flex flex-wrap justify-center gap-6 md:gap-10">
          <button
            onClick={onAboutClick}
            className="text-sm font-semibold uppercase tracking-widest text-gray-600 hover:text-blue-600 transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("status")}
            className="text-sm font-semibold uppercase tracking-widest text-gray-600 hover:text-blue-600 transition-colors"
          >
            Status
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="text-sm font-semibold uppercase tracking-widest text-gray-600 hover:text-blue-600 transition-colors"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("tech")}
            className="text-sm font-semibold uppercase tracking-widest text-gray-600 hover:text-blue-600 transition-colors"
          >
            Tech
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm font-semibold uppercase tracking-widest text-gray-600 hover:text-blue-600 transition-colors"
          >
            Contact
          </button>
          <button
            onClick={() => scrollToSection("connect")}
            className="text-sm font-semibold uppercase tracking-widest text-gray-600 hover:text-blue-600 transition-colors"
          >
            Connect
          </button>
        </nav>

        {/* Copyright */}
        <div className="text-xs text-gray-500 uppercase tracking-widest">
          © 2025 Ankan Bar
        </div>
      </div>
    </footer>
  );
};

// --- MAIN PAGE ---
export default function Portfolio() {
  const [showAbout, setShowAbout] = useState(false);

  // Tech Data
  const techs = [
    { name: "HTML5", icon: <FaHtml5 />, color: "text-orange-600" },
    { name: "CSS3", icon: <FaCss3Alt />, color: "text-blue-600" },
    { name: "JavaScript", icon: <FaJs />, color: "text-yellow-500" },
    { name: "Python", icon: <FaPython />, color: "text-blue-500" },
    { name: "PHP", icon: <FaPhp />, color: "text-purple-600" },
    { name: "MySQL", icon: <SiMysql />, color: "text-blue-800" },
    { name: "React", icon: <FaReact />, color: "text-blue-400" },
    { name: "Next.js", icon: <SiNextdotjs />, color: "text-black" },
    { name: "Tailwind", icon: <SiTailwindcss />, color: "text-cyan-500" },
    { name: "Motion", icon: <SiFramer />, color: "text-pink-500" },
  ];

  return (
    <main className="relative min-h-screen cursor-none font-sans text-gray-900 selection:bg-blue-200">
      <MagneticCursor />
      {/* Header Updated with new links */}
      <Header onAboutClick={() => setShowAbout(true)} />
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />

      {/* Background */}
      <div className="fixed inset-0 -z-50 h-full w-full bg-gray-50">
        <img
          src="/background.png"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20">
        <div className="z-10 text-center flex flex-col items-center">
          <MagicName />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-10 text-xl text-gray-600 md:text-2xl font-light tracking-wide"
          >
            Creative Developer & Interaction Designer
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <button
              onClick={() => setShowAbout(true)}
              className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-gray-200 bg-white/40 px-8 py-3 backdrop-blur-md transition-all duration-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:scale-105"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition-colors group-hover:bg-white group-hover:text-blue-600">
                <FaUser size={12} />
              </div>
              <span className="font-semibold tracking-wide text-sm">
                About Me
              </span>
            </button>

            <a
              href="/cv.pdf"
              download="Ankan_Bar_CV"
              className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-gray-200 bg-white/40 px-8 py-3 backdrop-blur-md transition-all duration-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:scale-105"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white shadow-md transition-colors group-hover:bg-white group-hover:text-gray-900">
                <FaDownload size={12} />
              </div>
              <span className="font-semibold tracking-wide text-sm">
                Download CV
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- STATUS SECTION --- */}
      <StatusBento />

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="min-h-screen py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="mb-16 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl flex items-center gap-4"
          >
            <FaCode className="text-blue-600 opacity-50" /> Selected Works
          </motion.h2>

          <div className="grid gap-10 md:grid-cols-2">
            <GlassCard
              direction="left"
              delay={0.1}
              className="flex flex-col p-8 md:p-12"
            >
              <div className="mb-6 h-64 w-full rounded-2xl bg-white shadow-inner relative overflow-hidden group-hover:shadow-lg transition-all">
                <img
                  src="/project1.png"
                  alt="Complaint Management System"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="mb-2 text-3xl font-bold text-gray-900">
                College Complaint System
              </h3>
              <p className="mb-6 text-gray-600">
                A web application to manage and track college complaints
                efficiently.
              </p>
            </GlassCard>

            <GlassCard
              direction="right"
              delay={0.2}
              className="flex flex-col p-8 md:p-12 md:mt-20"
            >
              <div className="mb-6 h-64 w-full rounded-2xl bg-white shadow-inner relative overflow-hidden group-hover:shadow-lg transition-all">
                <img
                  src="/project2.png"
                  alt="Smart Election App"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="mb-2 text-3xl font-bold text-gray-900">
                Smart Election App
              </h3>
              <p className="mb-6 text-gray-600">
                An application to facilitate secure and transparent elections
                using OpenCV and Python.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* --- TECHNOLOGY BUBBLES SECTION --- */}
      {/* Added ID="tech" for navigation */}
      <section id="tech" className="py-20 px-6 overflow-hidden">
        <div className="mx-auto max-w-6xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-16 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl"
          >
            Technologies I Use
            <span className="block text-sm font-normal text-gray-500 mt-2 tracking-wide">
              ( Try grabbing them! )
            </span>
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {techs.map((tech, index) => (
              <TechBubble
                key={index}
                name={tech.name}
                icon={tech.icon}
                color={tech.color}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <ContactSection />

      {/* --- CONNECT SECTION --- */}
      <section
        id="connect"
        className="min-h-[60vh] py-20 px-6 flex flex-col justify-center"
      >
        <div className="mx-auto w-full max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="mb-12 text-center text-4xl font-bold tracking-tight text-gray-900 md:text-5xl flex items-center justify-center gap-4"
          >
            Connect <FaEnvelope className="text-blue-600 opacity-50" />
          </motion.h2>

          <div className="grid w-full gap-6 md:grid-cols-2">
            <GlassCard
              direction="left"
              delay={0.1}
              className="flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="mb-4 text-4xl text-blue-700 transition-transform hover:scale-110">
                <FaLinkedinIn />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                LinkedIn
              </h3>
              <a
                href="https://www.linkedin.com/in/ankan-bar-865b5132b/"
                target="_blank"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-2 text-xs font-bold uppercase tracking-wider text-gray-500 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                Connect <FaArrowRight />
              </a>
            </GlassCard>

            <GlassCard
              direction="right"
              delay={0.2}
              className="flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="mb-4 text-4xl text-gray-800 transition-transform hover:scale-110">
                <FaGithub />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-gray-900">GitHub</h3>
              <a
                href="https://github.com/ankanbar90"
                target="_blank"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-2 text-xs font-bold uppercase tracking-wider text-gray-500 transition-all hover:border-black hover:bg-black hover:text-white"
              >
                Follow <FaArrowRight />
              </a>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* --- NEW FOOTER --- */}
      <Footer onAboutClick={() => setShowAbout(true)} />
    </main>
  );
}
