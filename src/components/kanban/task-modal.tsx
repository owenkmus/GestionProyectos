"use client";

import { TaskWithAssignee } from "@/types";
import { X, Calendar, User2, Tag, Flag, Clock } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface TaskModalProps {
  task: TaskWithAssignee;
  onClose: () => void;
}

export const TaskModal = ({ task, onClose }: TaskModalProps) => {
  const priorityColors: Record<string, string> = {
    LOW: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    MEDIUM: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    HIGH: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    CRITICAL: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  const labelsArray = typeof task.labels === "string" ? (task.labels ? task.labels.split(",") : []) : task.labels;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
            <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-2xl transition-colors">
              <X size={20} />
            </button>
          </div>

          <h2 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 mb-4 leading-tight">
            {task.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="col-span-2 space-y-8">
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-zinc-400 mb-3">Descripción</h4>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {task.description || "No hay una descripción detallada para esta tarea."}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-zinc-400 mb-3">Etiquetas</h4>
                <div className="flex flex-wrap gap-2">
                  {labelsArray.map((label: string) => (
                    <span key={label} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-400">
                      #{label}
                    </span>
                  ))}
                  <button className="px-3 py-1 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-bold text-zinc-400 hover:border-zinc-400 transition-colors">
                    + Añadir
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-5 bg-zinc-50 dark:bg-zinc-950 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Detalles</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500">
                      <User2 size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase">Asignado a</p>
                      <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{task.assignee?.name || "Sin asignar"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase">Fecha límite</p>
                      <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {task.dueDate ? format(new Date(task.dueDate), "dd 'de' MMMM", { locale: es }) : "Sin fecha"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500">
                      <Clock size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase">Creado el</p>
                      <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {format(new Date(task.createdAt), "dd/MM/yyyy")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
