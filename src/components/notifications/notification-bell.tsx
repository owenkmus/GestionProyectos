"use client";

import { Bell } from "lucide-react";
import { useNotificationStore } from "@/store/notifications.store";
import { useState } from "react";
import { NotificationList } from "./notification-list";

export const NotificationBell = () => {
  const { notifications } = useNotificationStore();
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all relative"
      >
        <Bell size={20} className="text-zinc-600 dark:text-zinc-400" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 border-2 border-white dark:border-zinc-900 rounded-full text-[10px] flex items-center justify-center text-white font-black animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 z-50">
          <NotificationList onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
};
