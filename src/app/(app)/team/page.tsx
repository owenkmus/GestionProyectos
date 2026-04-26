import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { MemberCard } from "@/components/team/member-card";
import { InviteForm } from "@/components/team/invite-form";
import { Users } from "lucide-react";

export default async function TeamPage() {
  const session = await auth();
  if (!session) redirect("/login");

  // Obtener usuarios que comparten proyectos con el usuario actual
  const projects = await prisma.project.findMany({
    where: { members: { some: { userId: session.user?.id } } },
    include: {
      members: {
        include: { user: true },
      },
    },
  });

  // Extraer miembros únicos
  const uniqueMembersMap = new Map();
  projects.forEach(project => {
    project.members.forEach(member => {
      if (!uniqueMembersMap.has(member.user.id)) {
        uniqueMembersMap.set(member.user.id, member.user);
      }
    });
  });

  const teamMembers = Array.from(uniqueMembersMap.values());

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
            <Users className="text-blue-500" />
            Directorio del Equipo
          </h1>
          <p className="text-zinc-500 mt-2">Gestiona los miembros y colabora de forma eficiente.</p>
        </div>
        <div className="w-full md:w-auto">
          <InviteForm />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((user) => (
          <MemberCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
