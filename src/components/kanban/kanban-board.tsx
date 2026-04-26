"use client";

import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { KanbanColumn } from "./kanban-column";
import { useKanbanStore } from "@/store/kanban.store";
import { TaskWithAssignee } from "@/types";
import { useEffect } from "react";

const COLUMNS = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "IN_REVIEW", title: "In Review" },
  { id: "DONE", title: "Done" },
];

export const KanbanBoard = ({ initialTasks }: { initialTasks: TaskWithAssignee[] }) => {
  const { tasks, setTasks, updateTaskStatus } = useKanbanStore();

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks, setTasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as string;
    
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    // Actualizar localmente inmediatamente (Optimistic UI)
    updateTaskStatus(taskId, newStatus, 0);

    // Actualizar en DB
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      // Aquí también se emitiría vía Socket.io
    } catch (error) {
      console.error("Error al mover tarea:", error);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 h-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            tasks={tasks.filter((t) => t.status === col.id).sort((a, b) => a.order - b.order)}
          />
        ))}
      </div>
    </DndContext>
  );
};
