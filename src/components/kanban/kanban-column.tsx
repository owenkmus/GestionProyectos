"use client";

import { useDroppable } from "@dnd-kit/core";
import { TaskWithAssignee } from "@/types";
import { TaskCard } from "./task-card";
import { Plus } from "lucide-react";

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: TaskWithAssignee[];
}

export const KanbanColumn = ({ id, title, tasks }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="flex flex-col w-80 min-w-[20rem] bg-zinc-50/50 dark:bg-zinc-950/50 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 h-full max-h-[calc(100vh-200px)]">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-xs">
            {title}
          </h3>
          <span className="bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] px-2 py-0.5 rounded-full font-bold">
            {tasks.length}
          </span>
        </div>
        <button className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors text-zinc-500">
          <Plus size={16} />
        </button>
      </div>

      <div
        ref={setNodeRef}
        className="flex-1 overflow-y-auto px-3 pb-4 min-h-[150px] scrollbar-hide"
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="h-full flex items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl min-h-[100px]">
            <p className="text-[11px] text-zinc-400 uppercase tracking-widest font-medium">Vacío</p>
          </div>
        )}
      </div>
    </div>
  );
};
