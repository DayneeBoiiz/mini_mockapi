/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { resourceName, enabledMethods, fields, id } = body;

    if (!resourceName || !fields) {
      return NextResponse.json(
        { error: "Resource name and fields are required." },
        { status: 400 }
      );
    }

    const enabledMethodsArray = Object.entries(enabledMethods)
      .filter(([isEnabled]) => isEnabled)
      .map(([method]) => method);

    const endpoint = await prisma.endpoint.create({
      data: {
        methods: enabledMethodsArray,
        route: `/${resourceName.toLowerCase()}`,
        projectId: id,
        resourceName: resourceName,
        schema: JSON.stringify(fields),
      },
    });

    await prisma.aPIData.create({
      data: {
        endpointId: endpoint.id,
        data: [],
      },
    });

    return NextResponse.json(
      { message: "Resource and endpoints created successfully!", endpoint },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
