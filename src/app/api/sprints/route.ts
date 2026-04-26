import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sprintSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const body = await req.json();
    const validatedData = sprintSchema.parse(body);

    // Verificar permisos
    const project = await prisma.project.findUnique({
      where: { id: validatedData.projectId },
      include: { members: true },
    });

    if (!project) return new NextResponse("Project Not Found", { status: 404 });

    const member = project.members.find((m) => m.userId === session.user.id);
    if (!member || member.role === "VIEWER") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const sprint = await prisma.sprint.create({
      data: validatedData,
    });

    return NextResponse.json(sprint);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
