import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { projectId: string; endpoint: string } }
) {
  const { endpoint } = params;

  const data = await prisma.endpoint.findUnique({
    where: {
      route: `/${endpoint}`,
    },
    include: {
      mockData: true,
    },
  });

  return NextResponse.json(data?.mockData[0].data, { status: 200 });
}

export async function POST(
  request: Request,
  { params }: { params: { projectId: string; endpoint: string } }
) {
  try {
    const { endpoint } = params;
    const body = await request.json();

    if (!body.data) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    const existingEntry = await prisma.endpoint.findUnique({
      where: {
        route: `/${endpoint}`,
      },
      include: {
        mockData: true,
      },
    });

    if (existingEntry && existingEntry.mockData.length > 0) {
      const existingMockData = existingEntry.mockData[0];

      let existingData = existingMockData.data;

      if (!Array.isArray(existingData)) {
        existingData = [existingData];
      }

      existingData.push(body.data);

      const updatedEntry = await prisma.aPIData.update({
        where: {
          id: existingMockData.id,
        },
        data: {
          data: existingData,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(updatedEntry, { status: 200 });
    } else {
      const newData = await prisma.aPIData.create({
        data: {
          endpointId: Number(endpoint),
          data: body.data,
        },
      });

      return NextResponse.json(newData, { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { projectId: string; endpoint: string } }
) {
  try {
    const { endpoint } = params;
    const body = await request.json();

    if (!body.data) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    const existingEntry = await prisma.endpoint.findUnique({
      where: {
        route: `/${endpoint}`,
      },
      include: {
        mockData: true,
      },
    });

    if (existingEntry && existingEntry.mockData.length > 0) {
      const mockDataId = existingEntry.mockData[0].id;

      const updatedData = await prisma.aPIData.update({
        where: {
          id: mockDataId,
        },
        data: {
          data: body.data,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(updatedData, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "No mock data found to update" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { projectId: string; endpoint: string } }
) {
  try {
    const { endpoint } = params;

    const existingEntry = await prisma.endpoint.findUnique({
      where: {
        route: `/${endpoint}`,
      },
      include: {
        mockData: true,
      },
    });

    if (existingEntry && existingEntry.mockData.length > 0) {
      const mockDataId = existingEntry.mockData[0].id;

      await prisma.aPIData.delete({
        where: {
          id: mockDataId,
        },
      });

      return NextResponse.json(
        { message: "Mock data deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "No mock data found to delete" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
