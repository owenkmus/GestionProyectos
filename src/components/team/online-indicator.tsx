"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@/hooks/use-socket"; // I'll create this hook

export const OnlineIndicator = ({ userId }: { userId: string }) => {
  const [isOnline, setIsOnline] = useState(false);
  // Simulación por ahora
  useEffect(() => {
    const timer = setTimeout(() => setIsOnline(Math.random() > 0.5), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`w-2.5 h-2.5 rounded-full border-2 border-white dark:border-zinc-900 ${
        isOnline ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-zinc-300 dark:bg-zinc-700"
      }`} 
      title={isOnline ? "En línea" : "Desconectado"}
    />
  );
};
