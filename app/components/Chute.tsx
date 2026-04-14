"use client";
import { useRef, useEffect } from "react";

interface ChuteProps {
  onCapture: (title: string) => void;
}

export default function Chute({ onCapture }: ChuteProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const val = e.currentTarget.value.trim();
      if (val) {
        onCapture(val);
        e.currentTarget.value = "";
      }
    }
  };

  return (
    <div className="w-full px-4 py-3 bg-slate-900 border-b border-slate-800">
      <input
        ref={inputRef}
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="⚡ What's in your head? Hit Enter to capture..."
        className="w-full bg-transparent text-cyan-400 placeholder-slate-600 text-xl font-mono outline-none border-none caret-cyan-400 tracking-wide"
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}
