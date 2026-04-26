import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const projectSchema = z.object({
  name: z.string().min(3, "El nombre del proyecto debe tener al menos 3 caracteres"),
  description: z.string().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, "Color inválido"),
});

export const taskSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  description: z.string().optional(),
  status: z.string().default("TODO"),
  priority: z.string().default("MEDIUM"),
  projectId: z.string(),
  assigneeId: z.string().optional().nullable(),
  sprintId: z.string().optional().nullable(),
  labels: z.string().default(""),
  dueDate: z.string().optional().nullable(),
});

export const sprintSchema = z.object({
  name: z.string().min(3, "El nombre del sprint debe tener al menos 3 caracteres"),
  goal: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  projectId: z.string(),
});
