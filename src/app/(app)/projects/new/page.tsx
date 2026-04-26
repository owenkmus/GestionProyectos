"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { projectSchema } from "@/lib/validations";
import { ArrowLeft, FolderKanban } from "lucide-react";
import Link from "next/link";

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#ef4444", "#f59e0b", "#10b981", "#6366f1"];

export default function NewProjectPage() {
  const [formData, setFormData] = useState({ name: "", description: "", color: COLORS[0] });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const project = await res.json();
        router.push(`/projects/${project.id}`);
      }
    } catch (error) {
      alert("Error al crear proyecto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 font-bold text-sm mb-10 transition-colors">
        <ArrowLeft size={16} />
        Volver al Dashboard
      </Link>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-xl">
        <div className="flex items-center gap-4 mb-8">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
            style={{ backgroundColor: formData.color }}
          >
            <FolderKanban size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">Nuevo Proyecto</h1>
            <p className="text-zinc-500 text-sm">Define los detalles de tu nuevo espacio de trabajo</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2 block">Nombre del Proyecto</label>
              <input
                type="text"
                required
                placeholder="Ej: Rediseño Web 2024"
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2 block">Descripción (Opcional)</label>
              <textarea
                rows={3}
                placeholder="¿De qué trata este proyecto?"
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2 block">Color de Identidad</label>
              <div className="flex gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: c })}
                    className={`w-10 h-10 rounded-xl border-4 transition-all ${
                      formData.color === c ? "border-zinc-900 dark:border-white scale-110 shadow-lg" : "border-transparent scale-100 hover:scale-105"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl shadow-zinc-900/10 dark:shadow-white/5"
          >
            {loading ? "Creando..." : "Crear Proyecto"}
          </button>
        </form>
      </div>
    </div>
  );
}
