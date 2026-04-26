import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      members: { include: { user: true } },
      tasks: true,
      sprints: true,
    },
  });

  if (!project) return new NextResponse("Not Found", { status: 404 });
  return NextResponse.json(project);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: { members: true },
    });

    if (!project) return new NextResponse("Not Found", { status: 404 });

    const isOwner = project.members.some(
      (m) => m.userId === session.user.id && m.role === "OWNER"
    );
    if (!isOwner) return new NextResponse("Forbidden", { status: 403 });

    await prisma.project.delete({ where: { id } });
    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
