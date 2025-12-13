"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, ExternalLink } from "lucide-react";

interface IslandProps {
  title: string;
  category: string;
  description: string;
  delay?: number;
}

export default function ProjectIsland({
  title,
  category,
  description,
  delay = 0,
}: IslandProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: delay * 0.1,
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full max-w-2xl mx-auto mb-16"
    >
      <div className="relative group">
        {/* Hover Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-20 group-hover:opacity-60 blur transition duration-500" />

        {/* Card Content */}
        <div className="relative p-8 bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col md:flex-row items-start gap-6">
          <div className="flex-1">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
              {category}
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black transition-colors">
                <Github size={18} /> Code
              </button>
              <button className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors">
                <ExternalLink size={18} /> Live Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
