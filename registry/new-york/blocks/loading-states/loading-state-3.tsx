// DocumentScannerLoading.tsx
import React from "react";
import { motion } from "framer-motion";

const cols = 40;
const rows = 60;
const total = cols * rows;

const getRandomOffset = () => ({
  x: (Math.random() - 0.5) * 400,
  y: (Math.random() - 0.5) * 400,
});

export function Loading3() {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-black">
      <div className="relative w-60 h-80">
        {[...Array(total)].map((_, i) => {
          const x = i % cols;
          const y = Math.floor(i / cols);
          const offset = getRandomOffset();
          const delay = Math.random() * 1; // faster delay spread

          return (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: offset.x,
                y: offset.y,
                scale: 0.2,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              }}
              transition={{
                delay,
                duration: 1.2, // faster animation
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="absolute bg-black dark:bg-white rounded-full shadow-lg"
              style={{
                width: "3px",
                height: "3px",
                left: `${x * 6}px`,
                top: `${y * 6}px`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
