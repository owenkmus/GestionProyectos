import { create } from "zustand";
import { TaskWithAssignee } from "@/types";

interface KanbanState {
  tasks: TaskWithAssignee[];
  setTasks: (tasks: TaskWithAssignee[]) => void;
  updateTaskStatus: (taskId: string, status: string, order: number) => void;
  addTask: (task: TaskWithAssignee) => void;
}

export const useKanbanStore = create<KanbanState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  updateTaskStatus: (taskId, status, order) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, status: status as any, order } : t
      ),
    })),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
}));
