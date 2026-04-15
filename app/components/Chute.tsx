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
    <div className="px-6 py-4 bg-slate-900/50 border-b border-slate-800/50 backdrop-blur-sm shrink-0">
      <div className="max-w-4xl mx-auto">
        <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">✦ Capture</label>
        <input
          ref={inputRef}
          type="text"
          onKeyDown={handleKeyDown}
          placeholder="What's in your head? Press Enter..."
          className="w-full bg-slate-800/60 border border-slate-700 hover:border-slate-600 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/20 px-4 py-3 rounded-lg text-base text-slate-200 placeholder-slate-600 transition-all duration-200"
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
