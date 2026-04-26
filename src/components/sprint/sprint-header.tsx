"use client";

import { Sprint } from "@prisma/client";
import { Clock, Target, Flag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface SprintHeaderProps {
  sprint: Sprint;
}

export const SprintHeader = ({ sprint }: SprintHeaderProps) => {
  const isExpired = new Date() > new Date(sprint.endDate);

  return (
    <div className="p-8 bg-zinc-900 dark:bg-white rounded-[2.5rem] text-white dark:text-zinc-900 shadow-2xl shadow-zinc-900/20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-500 text-[10px] font-black uppercase tracking-widest rounded-full">
              Sprint Activo
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest opacity-60">
              <Clock size={12} />
              Termina {formatDistanceToNow(new Date(sprint.endDate), { addSuffix: true, locale: es })}
            </div>
          </div>
          
          <h2 className="text-4xl font-black tracking-tight">{sprint.name}</h2>
          
          <div className="flex items-start gap-2 text-sm opacity-80 max-w-xl">
            <Target size={18} className="mt-0.5 shrink-0" />
            <p className="font-medium leading-relaxed italic">
              "{sprint.goal || "Sin meta definida para este sprint."}"
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white/10 dark:bg-zinc-100 hover:bg-white/20 dark:hover:bg-zinc-200 rounded-2xl font-bold transition-all border border-white/10">
            Editar
          </button>
          <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black transition-all shadow-lg shadow-green-500/20">
            Completar
          </button>
        </div>
      </div>
    </div>
  );
};
