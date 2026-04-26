import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Limpiar base de datos
  await prisma.task.deleteMany();
  await prisma.sprint.deleteMany();
  await prisma.projectMember.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 10);

  // Usuarios
  const admin = await prisma.user.create({
    data: { name: "Admin User", email: "admin@test.com", password: hashedPassword, role: "ADMIN" },
  });
  const scrumMaster = await prisma.user.create({
    data: { name: "Chris Scrum", email: "chris@test.com", password: hashedPassword, role: "MEMBER" },
  });
  const developer = await prisma.user.create({
    data: { name: "Dev Node", email: "dev@test.com", password: hashedPassword, role: "MEMBER" },
  });

  // Proyectos
  const project1 = await prisma.project.create({
    data: {
      name: "E-commerce Platform",
      description: "Modern e-commerce with Next.js and Stripe",
      color: "#3b82f6",
      members: {
        createMany: {
          data: [
            { userId: admin.id, role: "OWNER" },
            { userId: scrumMaster.id, role: "SCRUM_MASTER" },
            { userId: developer.id, role: "DEVELOPER" },
          ],
        },
      },
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: "Internal CRM",
      description: "Customer relationship management tool",
      color: "#8b5cf6",
      members: { createMany: { data: [{ userId: admin.id, role: "OWNER" }] } },
    },
  });

  // Sprint activo
  const activeSprint = await prisma.sprint.create({
    data: {
      name: "Sprint 1: Core Auth",
      goal: "Implement NextAuth and Prisma schema",
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      status: "ACTIVE",
      projectId: project1.id,
    },
  });

  // Tareas
  const tasks = [
    { title: "Configurar Prisma", status: "DONE", priority: "HIGH", order: 0 },
    { title: "Diseñar schema", status: "DONE", priority: "HIGH", order: 1 },
    { title: "Implementar Login", status: "IN_PROGRESS", priority: "MEDIUM", order: 0 },
    { title: "Dashboard UI", status: "TODO", priority: "MEDIUM", order: 0 },
    { title: "WebSockets setup", status: "TODO", priority: "CRITICAL", order: 1 },
    { title: "Kanban Drag & Drop", status: "TODO", priority: "HIGH", order: 2 },
    { title: "Notificaciones email", status: "IN_REVIEW", priority: "LOW", order: 0 },
    { title: "Burndown Chart", status: "IN_PROGRESS", priority: "MEDIUM", order: 1 },
  ];

  for (const t of tasks) {
    await prisma.task.create({
      data: { ...t, labels: "", projectId: project1.id, sprintId: activeSprint.id, createdById: admin.id, assigneeId: developer.id },
    });
  }

  console.log("✅ Seed data created successfully!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
