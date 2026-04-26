import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { TaskCard } from "@/components/kanban/task-card";
import { ArrowLeft, Package } from "lucide-react";
import Link from "next/link";

export default async function BacklogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session) redirect("/login");

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      tasks: {
        where: { sprintId: null },
        include: { assignee: true, createdBy: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!project) notFound();

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <Link 
            href={`/projects/${id}`}
            className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 font-bold text-sm mb-4 transition-colors"
          >
            <ArrowLeft size={16} />
            Volver al Tablero
          </Link>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-100">Backlog</h1>
          <p className="text-zinc-500">Tareas pendientes por asignar a un sprint</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 flex items-center gap-3">
          <Package size={20} className="text-zinc-400" />
          <h3 className="font-black text-xs uppercase tracking-widest text-zinc-500">Items en Backlog ({project.tasks.length})</h3>
        </div>
        
        <div className="p-6 space-y-4">
          {project.tasks.map((task: any) => (
            <div key={task.id} className="group relative">
              <TaskCard task={task} />
              {/* Opción de mover a sprint activo */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="px-4 py-2 bg-blue-600 text-white text-xs font-black rounded-xl shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all">
                  Mover a Sprint
                </button>
              </div>
            </div>
          ))}

          {project.tasks.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-3xl">
              <p className="text-zinc-400 font-medium italic text-sm">El backlog está vacío. ¡Buen trabajo!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
