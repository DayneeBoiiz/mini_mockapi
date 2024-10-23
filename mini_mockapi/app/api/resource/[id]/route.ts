import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const endpoint = await prisma.aPIData.findUnique({
      where: {
        endpointId: parseInt(id),
      },
    });

    return NextResponse.json(endpoint, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { resourceName, enabledMethods, fields } = body;

    const enabledMethodsArray = Object.entries(enabledMethods)
      .filter(([isEnabled]) => isEnabled)
      .map(([method]) => method);

    const updatedResource = await prisma.endpoint.update({
      where: {
        id: parseInt(id),
      },
      data: {
        resourceName,
        methods: enabledMethodsArray,
        schema: JSON.stringify(fields),
      },
    });

    return NextResponse.json(updatedResource, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update the resource" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.$transaction(async (prisma) => {
      await prisma.aPIData.deleteMany({
        where: {
          endpointId: parseInt(id),
        },
      });

      await prisma.endpoint.delete({
        where: {
          id: parseInt(id),
        },
      });
    });

    return NextResponse.json(
      { message: "Resource deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete the resource" },
      { status: 500 }
    );
  }
}
