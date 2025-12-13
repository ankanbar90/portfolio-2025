"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, X, Minus, Square } from "lucide-react";

const COMMANDS = {
  help: "Available commands: bio, skills, contact, clear",
  bio: "I am a Creative Developer building immersive digital experiences. Based in the Metaverse.",
  skills: "Stack: Next.js 15, React 19, Three.js, R3F, GLSL, Framer Motion",
  contact: "Email: hello@creative.dev | Twitter: @meta_dev_2025",
  clear: "CLEAR_ACTION",
};

export default function TerminalAbout() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([
    '> Welcome to the terminal. Type "help" to start.',
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();

    if (cmd === "clear") {
      setOutput(["> Terminal cleared."]);
    } else if (COMMANDS[cmd as keyof typeof COMMANDS]) {
      setOutput((prev) => [
        ...prev,
        `> ${input}`,
        COMMANDS[cmd as keyof typeof COMMANDS],
      ]);
    } else {
      setOutput((prev) => [...prev, `> ${input}`, `Command not found: ${cmd}`]);
    }
    setInput("");
  };

  // Auto-scroll to bottom
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-2xl mx-auto my-20 font-mono text-sm"
    >
      <div className="bg-gray-900 rounded-t-lg p-2 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-2 text-gray-400">
          <Terminal size={16} />
          <span>visitor@portfolio: ~</span>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
        </div>
      </div>

      <div
        className="bg-black/90 backdrop-blur-md border-x border-b border-gray-800 p-6 h-80 overflow-y-auto rounded-b-lg shadow-2xl"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="space-y-2 text-green-400">
          {output.map((line, i) => (
            <p
              key={i}
              className={
                line.startsWith(">") ? "text-gray-400" : "text-green-400 ml-4"
              }
            >
              {line}
            </p>
          ))}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={handleCommand}
          className="mt-4 flex items-center gap-2 text-green-400"
        >
          <span>$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent outline-none flex-1 font-mono placeholder-gray-700"
            placeholder="Type a command..."
            autoFocus
          />
        </form>
      </div>
    </motion.div>
  );
}
