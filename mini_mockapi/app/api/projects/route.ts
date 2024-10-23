import prisma from "@/lib/db";
import { Project } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, description } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Project name is required" },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        name,
        description,
      },
      include: {
        endpoints: true,
      },
    });

    return Response.json(project, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const projects: Project[] = await prisma.project.findMany({
      include: {
        endpoints: true,
      },
    });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
