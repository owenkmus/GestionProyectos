"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";

export const InviteForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulación de envío
    setTimeout(() => {
      alert(`Invitación enviada a ${email}`);
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleInvite} className="flex items-center gap-2 bg-white dark:bg-zinc-900 p-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm w-full md:w-96">
      <div className="flex-1 px-3">
        <input
          type="email"
          placeholder="email@ejemplo.com"
          required
          className="w-full bg-transparent outline-none text-sm font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button 
        disabled={loading}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-2 md:px-4 md:py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
      >
        <UserPlus size={16} />
        <span className="hidden md:inline">{loading ? "Enviando..." : "Invitar"}</span>
      </button>
    </form>
  );
};
