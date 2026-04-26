import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { taskSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const body = await req.json();
    const validatedData = taskSchema.parse(body);

    const lastTask = await prisma.task.findFirst({
      where: { projectId: validatedData.projectId, status: validatedData.status },
      orderBy: { order: "desc" },
    });

    const task = await prisma.task.create({
      data: {
        ...validatedData,
        createdById: session.user.id!,
        order: lastTask ? lastTask.order + 1 : 0,
      },
      include: { assignee: true, createdBy: true },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
