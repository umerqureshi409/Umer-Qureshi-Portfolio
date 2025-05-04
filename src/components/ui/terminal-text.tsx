"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface TerminalTextProps {
  lines: string[];
  typingSpeed?: number;
  className?: string;
  showHeader?: boolean;
}

export const TerminalText = ({
  lines,
  typingSpeed = 50,
  className,
  showHeader = true,
}: TerminalTextProps) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Blink cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Main typing animation logic
  useEffect(() => {
    if (currentLineIndex >= lines.length) return;

    const currentLine = lines[currentLineIndex];

    if (isTyping) {
      if (currentText.length < currentLine.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentLine.substring(0, currentText.length + 1));
        }, Math.random() * typingSpeed + typingSpeed / 2); // Variable typing speed for realistic effect
        return () => clearTimeout(timeout);
      } else {
        // Finished typing current line
        const pauseTimeout = setTimeout(() => {
          setDisplayedLines((prev) => [...prev, currentText]);
          setCurrentText("");
          setCurrentLineIndex((prev) => prev + 1);
        }, 700); // Pause at end of line
        return () => clearTimeout(pauseTimeout);
      }
    }
  }, [currentLineIndex, currentText, isTyping, lines, typingSpeed]);

  // Scroll to bottom when new line is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedLines, currentText]);

  return (
    <div
      className={cn(
        "font-mono text-sm sm:text-base md:text-lg max-w-2xl mx-auto bg-card/40 backdrop-blur-lg p-4 sm:p-6 rounded-xl border border-primary/20 shadow-xl hover:shadow-primary/10 transition-all duration-500",
        className
      )}
    >
      {showHeader && (
        <div className="flex items-center mb-4">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center text-xs text-muted-foreground">terminal@umer-portfolio</div>
        </div>
      )}

      <div ref={terminalRef} className="text-foreground max-h-[200px] overflow-y-auto scrollbar-thin">
        {/* Display completed lines */}
        {displayedLines.map((line, index) => (
          <div key={`line-${index}`} className="mb-2 flex">
            <span className="text-primary mr-2">&gt;</span>
            <span>{line}</span>
          </div>
        ))}

        {/* Display current line being typed */}
        {currentLineIndex < lines.length && (
          <div className="flex">
            <span className="text-primary mr-2">&gt;</span>
            <span>{currentText}</span>
            <span
              className={`${
                showCursor ? "opacity-100" : "opacity-0"
              } transition-opacity duration-200`}
            >
              |
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

