"use client";

import { motion } from "framer-motion";

export default function AnimatedSlogan({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <motion.h1
      className="text-3xl md:text-4xl font-bold text-center leading-tight"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08 },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block overflow-hidden relative"
          variants={{
            hidden: { y: "100%", opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
          }}
        >
          <span className="relative z-10">{word}&nbsp;</span>
          <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent animate-pulse" />
        </motion.span>
      ))}
    </motion.h1>
  );
}
