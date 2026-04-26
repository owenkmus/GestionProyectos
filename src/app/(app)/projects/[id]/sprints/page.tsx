import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { SprintHeader } from "@/components/sprint/sprint-header";
import { BurndownChart } from "@/components/sprint/burndown-chart";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

export default async function SprintsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session) redirect("/login");

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      sprints: {
        orderBy: { startDate: "desc" },
        include: { tasks: true },
      },
    },
  });

  if (!project) notFound();

  const activeSprint = project.sprints.find((s) => s.status === "ACTIVE");

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <div>
        <Link 
          href={`/projects/${id}`}
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 font-bold text-sm mb-4 transition-colors"
        >
          <ArrowLeft size={16} />
          Volver al Tablero
        </Link>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-100">Gestión de Sprints</h1>
            <p className="text-zinc-500">Planifica y mide el progreso de tu equipo</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-zinc-900/10">
            <Plus size={18} />
            Nuevo Sprint
          </button>
        </div>
      </div>

      {activeSprint ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SprintHeader sprint={activeSprint} />
            <div className="mt-8">
              <BurndownChart />
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-zinc-200 dark:border-zinc-800">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Métricas del Sprint</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-500 font-medium">Tareas totales</span>
                  <span className="font-black text-zinc-900 dark:text-zinc-100">{activeSprint.tasks.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-500 font-medium">Completadas</span>
                  <span className="font-black text-green-500">{activeSprint.tasks.filter(t => t.status === 'DONE').length}</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full transition-all duration-1000" 
                    style={{ width: `${(activeSprint.tasks.filter(t => t.status === 'DONE').length / activeSprint.tasks.length) * 100 || 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-20 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[3rem]">
          <p className="text-zinc-500 font-medium mb-4">No hay un sprint activo actualmente.</p>
          <button className="text-blue-600 font-black hover:underline">Comenzar un nuevo ciclo de trabajo</button>
        </div>
      )}

      <div>
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 px-2">Historial de Sprints</h3>
        <div className="space-y-4">
          {project.sprints.filter(s => s.status !== 'ACTIVE').map((sprint) => (
            <div key={sprint.id} className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between hover:border-zinc-300 transition-colors">
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100">{sprint.name}</h4>
                <p className="text-xs text-zinc-500 mt-0.5">{new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                sprint.status === 'COMPLETED' ? 'bg-green-100 text-green-600' : 'bg-zinc-100 text-zinc-500'
              }`}>
                {sprint.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
