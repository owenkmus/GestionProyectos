import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Bell } from "lucide-react";

export default async function NotificationsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
          <Bell size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">Centro de Notificaciones</h1>
          <p className="text-zinc-500 mt-1">Mantente al tanto de la actividad de tus proyectos</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 p-8 shadow-xl">
        <p className="text-zinc-500 text-center py-20 italic font-medium">Las notificaciones completas se mostrarán aquí. (Utiliza el componente de campana para la vista rápida).</p>
      </div>
    </div>
  );
}
