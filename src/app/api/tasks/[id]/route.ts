import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const body = await req.json();
    const task = await prisma.task.update({
      where: { id },
      data: { ...body },
      include: { assignee: true, createdBy: true },
    });
    return NextResponse.json(task);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  const task = await prisma.task.findUnique({
    where: { id },
    include: { assignee: true, createdBy: true },
  });

  if (!task) return new NextResponse("Not Found", { status: 404 });
  return NextResponse.json(task);
}
