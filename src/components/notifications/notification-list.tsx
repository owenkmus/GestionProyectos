"use client";

import { useNotificationStore } from "@/store/notifications.store";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { X, Check, BellOff } from "lucide-react";

export const NotificationList = ({ onClose }: { onClose: () => void }) => {
  const { notifications, markAsRead, clearAll } = useNotificationStore();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-800/50">
        <h4 className="font-black text-xs uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Notificaciones</h4>
        <div className="flex gap-2">
          <button onClick={clearAll} className="text-[10px] font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline decoration-2">Limpiar</button>
          <button onClick={onClose} className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded"><X size={14} /></button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto scrollbar-hide">
        {notifications.length === 0 ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto text-zinc-400">
              <BellOff size={24} />
            </div>
            <p className="text-zinc-500 text-sm font-medium italic">Todo al día por aquí</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div 
              key={n.id} 
              className={`p-4 border-b border-zinc-50 dark:border-zinc-800/50 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors relative group ${!n.read ? "bg-blue-50/30 dark:bg-blue-500/5" : ""}`}
            >
              {!n.read && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
              )}
              <div className="flex justify-between items-start gap-3">
                <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                  {n.message}
                </p>
                {!n.read && (
                  <button 
                    onClick={() => markAsRead(n.id)}
                    className="p-1 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                    title="Marcar como leída"
                  >
                    <Check size={14} />
                  </button>
                )}
              </div>
              <p className="text-[10px] text-zinc-400 mt-2 font-bold uppercase tracking-tighter">
                {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true, locale: es })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
