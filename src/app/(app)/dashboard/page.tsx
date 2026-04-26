import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, LayoutDashboard, Settings, Users, FolderKanban } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const projects = await prisma.project.findMany({
    where: {
      members: { some: { userId: session.user?.id } },
    },
    include: {
      _count: { select: { tasks: true, members: true } },
    },
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">Dashboard</h1>
          <p className="text-zinc-500 mt-1">Bienvenido de nuevo, {session.user?.name}</p>
        </div>
        <Link 
          href="/projects/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold hover:scale-105 transition-transform"
        >
          <Plus size={18} />
          Nuevo Proyecto
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="group p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-500/10"
          >
            <div className="flex items-start justify-between mb-4">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                style={{ backgroundColor: project.color }}
              >
                <FolderKanban size={24} />
              </div>
              <div className="flex -space-x-2">
                {[...Array(Math.min(project._count.members, 3))].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 border-2 border-white dark:border-zinc-900" />
                ))}
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-blue-500 transition-colors">
              {project.name}
            </h3>
            <p className="text-zinc-500 text-sm line-clamp-2 mb-6">
              {project.description || "Sin descripción disponible."}
            </p>

            <div className="flex items-center gap-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">
              <div className="flex items-center gap-1.5">
                <LayoutDashboard size={14} />
                {project._count.tasks} Tareas
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={14} />
                {project._count.members} Miembros
              </div>
            </div>
          </Link>
        ))}

        {projects.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
            <p className="text-zinc-500 font-medium">No tienes proyectos activos aún.</p>
            <Link href="/projects/new" className="text-blue-600 font-bold hover:underline mt-2 inline-block">
              Crea tu primer proyecto
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
