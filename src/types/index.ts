import { Project, Task, User, Sprint, ProjectMember } from "@prisma/client";

export type ProjectWithMembers = Project & {
  members: (ProjectMember & { user: User })[];
};

export type TaskWithAssignee = Task & {
  assignee: User | null;
  createdBy: User;
};

export type FullProject = Project & {
  members: (ProjectMember & { user: User })[];
  tasks: TaskWithAssignee[];
  sprints: Sprint[];
};

export type KanbanData = {
  tasks: TaskWithAssignee[];
};

export interface SocketEvents {
  "task:moved": (data: { taskId: string; newStatus: string; newOrder: number; projectId: string }) => void;
  "task:updated": (task: TaskWithAssignee) => void;
  "notification:received": (notification: any) => void;
}
