"use client";

import { User } from "@prisma/client";
import { Mail, Shield } from "lucide-react";
import { OnlineIndicator } from "./online-indicator";

interface MemberCardProps {
  user: User;
}

export const MemberCard = ({ user }: MemberCardProps) => {
  return (
    <div className="group relative bg-white dark:bg-zinc-900 rounded-[2rem] p-6 border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-all hover:border-blue-500/30 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform" />
      
      <div className="flex items-start justify-between mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-2xl font-black text-zinc-400 overflow-hidden shadow-inner">
            {user.image ? (
              <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user.name.charAt(0)
            )}
          </div>
          <div className="absolute -bottom-1 -right-1">
            <OnlineIndicator userId={user.id} />
          </div>
        </div>
        <div className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-500">
          <Shield size={12} />
          {user.role}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">{user.name}</h3>
        <div className="flex items-center gap-2 mt-2 text-sm text-zinc-500">
          <Mail size={14} className="shrink-0" />
          <span className="truncate">{user.email}</span>
        </div>
      </div>
    </div>
  );
};
