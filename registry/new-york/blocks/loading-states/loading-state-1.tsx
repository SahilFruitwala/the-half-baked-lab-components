// DocumentScannerLoading.tsx
import React from "react";
import { motion } from "framer-motion";

const cols = 40;
const rows = 60;
const total = cols * rows;

export function Loading1() {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-black">
      <div className="relative w-60 h-80">
        {[...Array(total)].map((_, i) => {
          const x = i % cols;
          const y = Math.floor(i / cols);
          const waveDelay = y * 0.05 + Math.sin(x / 5) * 0.1;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0.2, scale: 0.8 }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1, 0.8] }}
              transition={{
                delay: waveDelay,
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bg-black dark:bg-white rounded-full"
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
