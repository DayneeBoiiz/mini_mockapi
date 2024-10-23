"use client";

import { useState } from "react";
import SchemaInput from "./SchemaInput";
import {  EndpointWithMockData, Field, HttpMethods } from "@/next-types";
import HttpMethodSelector from "./HttpMethodSelector";
import axios from "axios";
import toast from "react-hot-toast";

const AddEndpointModal = ({
  isOpen,
  onClose,
  id,
  setEndpoints,
}: {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  setEndpoints: React.Dispatch<React.SetStateAction<EndpointWithMockData[]>>;
}) => {
  const [resourceName, setResourceName] = useState("");
  const [enabledMethods, setEnabledMethods] = useState<HttpMethods>({
    GET: true,
    POST: true,
    PUT: true,
    DELETE: true,
  });

  const [fields, setFields] = useState<Field[]>([
    { name: "id", type: "Object ID", fakerMethod: "" },
    { name: "createdAt", type: "Faker.js", fakerMethod: "date.recent" },
    { name: "name", type: "Faker.js", fakerMethod: "name.fullName" },
    { name: "avatar", type: "Faker.js", fakerMethod: "image.avatar" },
  ]);

  const handleToggle = (method: keyof HttpMethods) => {
    setEnabledMethods((prev) => ({
      ...prev,
      [method]: !prev[method],
    }));
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post("/api/resource", {
        resourceName,
        enabledMethods,
        fields,
        id,
      });

      toast.success("Resource created successfully!");

      onClose();

      setEndpoints((prevEndpoints) => [
        ...prevEndpoints,
        response.data.endpoint,
      ]);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
      toast.error(`Error creating resource: ${errorMessage}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        className={`relative max-h-[90%] overflow-y-auto bg-white px-6 pt-6 rounded-xl shadow-lg w-screen md:w-[80%] lg:w-[40%] mx-4 transition-all duration-300 ease-in-out`}
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
          Add or Edit Resource
        </h2>

        <div className="mb-4">
          <label
            htmlFor="resourceName"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Resource Name
          </label>
          <input
            id="resourceName"
            type="text"
            value={resourceName}
            onChange={(e) => setResourceName(e.target.value)}
            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-gray-400 focus:ring-0 placeholder-gray-400"
            placeholder="e.g. users, products, etc."
          />
        </div>

        <HttpMethodSelector
          enabledMethods={enabledMethods}
          handleToggle={handleToggle}
        />

        <div className="mb-4 w-full">
          <label
            htmlFor="mockData"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Mock Data Schema
          </label>
          <SchemaInput fields={fields} setFields={setFields} />
        </div>

        <div className="sticky bg-white bottom-0 right-0 flex space-x-2 p-3">
          <button
            onClick={onClose}
            className="px-4 py-2 flex-1 bg-gray-500 text-white rounded-md text-sm hover:bg-gray-600 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 flex-1 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition-all"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEndpointModal;
