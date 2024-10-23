import { Project, Endpoint, APIData } from "@prisma/client";
import { fakerMethods } from "./lib/methods";

export type ProjectWithEndpoints = Project & { endpoints: Endpoint[] };

interface Field {
  [key: string]: string;
  name: string;
  type: (typeof dataTypes)[number];
  fakerMethod: string;
}

type HttpMethods = {
  GET: boolean;
  POST: boolean;
  PUT: boolean;
  DELETE: boolean;
};

export type FakerMethodKeys = keyof typeof fakerMethods;

export type Endpoint = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  methods: string[];
  route: string;
  projectId: string;
  resourceName: string;
  schema: string;
};

export type EndpointWithMockData = Endpoint & { mockData: APIData };
