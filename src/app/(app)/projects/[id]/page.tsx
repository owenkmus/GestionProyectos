import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import { OnlineIndicator } from "@/components/team/online-indicator";
import { Users, Settings, Calendar } from "lucide-react";
import Link from "next/link";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session) redirect("/login");

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      tasks: {
        include: { assignee: true, createdBy: true },
      },
      members: {
        include: { user: true },
      },
      sprints: true,
    },
  });

  if (!project) notFound();

  // Verificar si el usuario es miembro
  const isMember = project.members.some((m) => m.userId === session.user?.id);
  if (!isMember) redirect("/dashboard");

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* Sub-header del Proyecto */}
      <div className="px-8 py-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
            style={{ backgroundColor: project.color }}
          >
            <span className="font-black text-xl">{project.name.charAt(0)}</span>
          </div>
          <div>
            <h1 className="text-xl font-black text-zinc-900 dark:text-zinc-100 leading-tight">
              {project.name}
            </h1>
            <div className="flex items-center gap-3 mt-0.5">
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-bold uppercase tracking-widest">
                <Users size={12} />
                {project.members.length} Miembros
              </div>
              <div className="flex -space-x-1.5">
                {project.members.map((member) => (
                  <div key={member.userId} className="relative group">
                    <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 border-2 border-white dark:border-zinc-900 overflow-hidden">
                      {member.user.image ? (
                        <img src={member.user.image} alt={member.user.name} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] font-bold">
                          {member.user.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5">
                      <OnlineIndicator userId={member.userId} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <nav className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl mr-4">
            <Link 
              href={`/projects/${project.id}`} 
              className="px-4 py-1.5 bg-white dark:bg-zinc-700 shadow-sm rounded-lg text-xs font-bold text-zinc-900 dark:text-zinc-100"
            >
              Tablero
            </Link>
            <Link 
              href={`/projects/${project.id}/backlog`} 
              className="px-4 py-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Backlog
            </Link>
            <Link 
              href={`/projects/${project.id}/sprints`} 
              className="px-4 py-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Sprints
            </Link>
          </nav>

          <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors text-zinc-500">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Área del Tablero */}
      <main className="flex-1 overflow-x-auto p-8 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px]">
        <KanbanBoard initialTasks={project.tasks} />
      </main>
    </div>
  );
}
