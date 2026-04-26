"use client";

import { useDraggable } from "@dnd-kit/core";
import { TaskWithAssignee } from "@/types";
import { CSS } from "@dnd-kit/utilities";
import { User2, Calendar } from "lucide-react";
import { format } from "date-fns";

interface TaskCardProps {
  task: TaskWithAssignee;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColors: Record<string, string> = {
    LOW: "bg-blue-500",
    MEDIUM: "bg-yellow-500",
    HIGH: "bg-orange-500",
    CRITICAL: "bg-red-500",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="mb-3 cursor-grab active:cursor-grabbing"
    >
      <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <span className={`${priorityColors[task.priority] || "bg-zinc-500"} text-white text-[10px] px-2 py-0.5 rounded-full font-bold`}>
            {task.priority}
          </span>
        </div>
        
        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2 line-clamp-2">
          {task.title}
        </h4>

        <div className="flex items-center justify-between mt-4 text-[11px] text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-3">
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{format(new Date(task.dueDate), "dd MMM")}</span>
              </div>
            )}
            {task.assignee && (
              <div className="flex items-center gap-1">
                <User2 size={12} />
                <span>{task.assignee.name.split(" ")[0]}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
