"use client";

import { useState, useEffect } from "react";

interface GlitchRevealProps {
  text: string;
  speed?: number;
  className?: string;
  infinite?: boolean;
  loopDelay?: number; // Delay between loops in ms
}

export function GlitchReveal({
  text,
  speed = 80,
  className = "",
  infinite = false,
  loopDelay = 1500, // Default delay between loops
}: GlitchRevealProps) {
  const [revealedChars, setRevealedChars] = useState(0);
  const [glitchChar, setGlitchChar] = useState("");
  const [isLoopPaused, setIsLoopPaused] = useState(false);

  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  useEffect(() => {
    // If we're at the end and in infinite mode but not paused
    if (revealedChars >= text.length && infinite && !isLoopPaused) {
      // Pause between loops
      setIsLoopPaused(true);
      const pauseTimer = setTimeout(() => {
        setRevealedChars(0); // Reset to start
        setIsLoopPaused(false);
      }, loopDelay);

      return () => clearTimeout(pauseTimer);
    }

    // Normal reveal logic when not at the end or not infinite
    if (revealedChars < text.length && !isLoopPaused) {
      // Glitch effect
      const glitchInterval = setInterval(() => {
        setGlitchChar(
          glitchChars[Math.floor(Math.random() * glitchChars.length)]
        );
      }, 50);

      // Reveal next character
      const timer = setTimeout(() => {
        setRevealedChars((prev) => prev + 1);
        setGlitchChar("");
      }, speed);

      return () => {
        clearTimeout(timer);
        clearInterval(glitchInterval);
      };
    }
  }, [revealedChars, text.length, speed, infinite, isLoopPaused, loopDelay]);

  // Using array join method to combine classes
  const spanClasses = ["relative", "font-mono", className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={spanClasses}>
      {text.split("").map((char, index) => {
        if (index < revealedChars) {
          return (
            <span key={index} className="text-sky-600">
              {char === " " ? "\u00A0" : char}
            </span>
          );
        } else if (index === revealedChars && !isLoopPaused) {
          return (
            <span key={index} className="text-red-400 animate-pulse">
              {glitchChar || char}
            </span>
          );
        } else {
          return (
            <span key={index} className="text-gray-600">
              {char === " " ? "\u00A0" : char}
            </span>
          );
        }
      })}
    </span>
  );
}
