import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { ArrowLeft, Settings, Trash2 } from "lucide-react";
import Link from "next/link";

export default async function ProjectSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session) redirect("/login");

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) notFound();

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10">
      <div>
        <Link 
          href={`/projects/${id}`}
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 font-bold text-sm mb-4 transition-colors"
        >
          <ArrowLeft size={16} />
          Volver al Tablero
        </Link>
        <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
          <Settings className="text-zinc-400" />
          Ajustes del Proyecto
        </h1>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 p-8 shadow-xl">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-6">Detalles Generales</h3>
        
        <form className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2 block">Nombre del Proyecto</label>
              <input
                type="text"
                defaultValue={project.name}
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2 block">Descripción</label>
              <textarea
                rows={3}
                defaultValue={project.description || ""}
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium resize-none"
              />
            </div>
          </div>
          <button type="button" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all">
            Guardar Cambios
          </button>
        </form>
      </div>

      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-[2rem] p-8">
        <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
          <Trash2 size={20} />
          Zona de Peligro
        </h3>
        <p className="text-sm text-red-600/80 dark:text-red-400/80 mb-6">
          Eliminar este proyecto borrará todas sus tareas, sprints y datos asociados de forma permanente.
        </p>
        <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 transition-all">
          Eliminar Proyecto
        </button>
      </div>
    </div>
  );
}
