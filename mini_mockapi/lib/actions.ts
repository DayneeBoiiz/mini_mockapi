"use server";

import prisma from "./db";
import { faker } from "@faker-js/faker";

export default async function generateMockData(
  EndpointId: number,
  count: number
) {
  try {
    const endpoint = await prisma.endpoint.findUnique({
      where: {
        id: EndpointId,
      },
    });

    if (!endpoint) {
      throw new Error(`Endpoint with ID ${EndpointId} not found`);
    }

    const mockDataArray = [];

    const fields = JSON.parse(endpoint.schema || "[]");

    for (let i = 0; i < count; i++) {
      const mockEntry: Record<string, any> = {};

      fields.forEach((field: any) => {
        switch (field.type) {
          case "String":
            mockEntry[field.name] = faker.lorem.word();
            break;

          case "Number":
            mockEntry[field.name] = faker.number.int();
            break;

          case "Boolean":
            mockEntry[field.name] = faker.datatype.boolean();
            break;

          case "Object ID":
            mockEntry[field.name] = faker.database.mongodbObjectId();
            break;

          case "Faker.js":
            const method = field.fakerMethod.split(".");

            if (
              method.length === 2 &&
              (faker as any)[method[0]] &&
              typeof (faker as any)[method[0]][method[1]] === "function"
            ) {
              mockEntry[field.name] = (faker as any)[method[0]][method[1]]();
            } else {
              console.warn(`Invalid faker method: ${field.fakerMethod}`);
              mockEntry[field.name] = null;
            }
            break;

          default:
            mockEntry[field.name] = null;
            break;
        }
      });

      mockDataArray.push(mockEntry);
    }

    const existingEntry = await prisma.aPIData.findUnique({
      where: { endpointId: EndpointId },
    });

    if (existingEntry) {
      await prisma.aPIData.update({
        where: { endpointId: EndpointId },
        data: {
          data: mockDataArray,
          count: count,
          updatedAt: new Date(),
        },
      });
    } else {
      await prisma.aPIData.create({
        data: {
          endpointId: EndpointId,
          data: mockDataArray,
          createdAt: new Date(),
          count,
        },
      });
    }
  } catch (error) {
    console.error("Error generating mock data:", error);
  }
}
