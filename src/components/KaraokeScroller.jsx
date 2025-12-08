import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../css/KaraokeScroller.css";
export default function KaraokePage() {
  const [text, setText] = useState("");
  const [lines, setLines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const karaokeRef = useRef(null);
  const handleTextChange = (e) => {
    setText(e.target.value);
    setLines(e.target.value.split("\n"));
    setCurrentIndex(0);
  };
  const showNextLine = () => {
    setDirection(1);
    setCurrentIndex((i) => Math.min(i + 1, lines.length - 1));
  };
  const showPrevLine = () => {
    setDirection(-1);
    setCurrentIndex((i) => Math.max(i - 1, 0));
  };
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      karaokeRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowDown") showNextLine();
      if (e.key === "ArrowUp") showPrevLine();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lines]);
  // 🔥 VARIANTS CON CUSTOM — la soluzione DEFINITIVA
  const lineVariants = {
    initial: (dir) => ({
      y: -60 * dir,
      opacity: 0,
    }),
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      y: 60 * dir,
      opacity: 0,
    }),
  };
  
  function AnimatedLine({ text, direction }) {
    const lineVariants = {
      initial: (dir) => ({ y: -60 * dir, opacity: 0 }),
      animate: { y: 0, opacity: 1 },
      exit: (dir) => ({ y: 60 * dir, opacity: 0 }),
    };
    return (
      <motion.div
        className="main-line"
        variants={lineVariants}
        custom={direction}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4 }}
      >
        {text}
      </motion.div>
    );
  }
  return (
    <div className="div-container">
      <h2>Karaoke Text Player</h2>
      <textarea
        placeholder="Inserisci qui il tuo testo (una riga per volta)..."
        value={text}
        onChange={handleTextChange}
        className="input-text-area"
      />
      <div className="karaoke-area" ref={karaokeRef}>
        <button
          className="fullscreen-btn"
          onClick={(e) => {
            e.stopPropagation();
            toggleFullscreen();
          }}
        >
          ⛶
        </button>
        <button
          className="nav-btn up-btn"
          onClick={(e) => {
            e.stopPropagation();
            showPrevLine();
          }}
        >
          ▲
        </button>
        <button
          className="nav-btn down-btn"
          onClick={(e) => {
            e.stopPropagation();
            showNextLine();
          }}
        >
          ▼
        </button>
        <AnimatePresence mode="wait" custom={direction}>
          {lines[currentIndex] && (
            <AnimatedLine
              key={currentIndex}
              text={lines[currentIndex]}
              direction={direction}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}