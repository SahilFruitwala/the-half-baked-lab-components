// DocumentScannerLoading.tsx
import React from "react";
import { motion } from "framer-motion";

const cols = 40;
const rows = 60;
const total = cols * rows;

export function Loading2() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative w-60 h-80">
        {[...Array(total)].map((_, i) => {
          const x = i % cols;
          const y = Math.floor(i / cols);
          const delay = y * 0.1; // slower scan top to bottom
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0.2, scale: 0.5 }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.5, 1, 0.5] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
              className="absolute bg-white rounded-full"
              style={{
                width: "3px",
                height: "3px",
                left: `${x * 6}px`,
                top: `${y * 6}px`,
              }}
            />
          );
        })}
        {/* Optional: visual scanning beam */}
        <motion.div
          className="absolute left-0 w-full h-1 bg-blue-500/20"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}
