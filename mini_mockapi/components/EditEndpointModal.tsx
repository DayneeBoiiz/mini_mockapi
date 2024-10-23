"use client";

import { useState, useEffect } from "react";
import SchemaInput from "./SchemaInput";
import { Field, HttpMethods, Endpoint } from "@/next-types";
import HttpMethodSelector from "./HttpMethodSelector";
import axios from "axios";
import toast from "react-hot-toast";

const EditEndpointModal = ({
  isOpen,
  onClose,
  endpoint,
}: {
  isOpen: boolean;
  onClose: () => void;
  endpoint: Endpoint | null;
}) => {
  const [resourceName, setResourceName] = useState("");
  const [enabledMethods, setEnabledMethods] = useState<HttpMethods>({
    GET: false,
    POST: false,
    PUT: false,
    DELETE: false,
  });
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    if (endpoint) {
      setResourceName(endpoint.resourceName || "");
      setEnabledMethods({
        GET: endpoint.methods.includes("GET"),
        POST: endpoint.methods.includes("POST"),
        PUT: endpoint.methods.includes("PUT"),
        DELETE: endpoint.methods.includes("DELETE"),
      });
      setFields(endpoint.schema ? JSON.parse(endpoint.schema) : []);
    }
  }, [endpoint]);

  const handleToggle = (method: keyof HttpMethods) => {
    setEnabledMethods((prev) => ({
      ...prev,
      [method]: !prev[method],
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/resource/${endpoint?.id}`, {
        resourceName,
        enabledMethods,
        fields,
      });

      toast.success("Resource updated successfully!");
      onClose();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
      toast.error(`Error updating resource: ${errorMessage}`);
    }
  };

  if (!isOpen || !endpoint) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative max-h-[90%] overflow-y-auto bg-white px-6 pt-6 rounded-xl shadow-lg w-screen md:w-[80%] lg:w-[40%] mx-4 transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4 text-center">
          Edit Resource
        </h2>

        <div className="mb-4">
          <label
            htmlFor="resourceName"
            className="block text-sm font-medium text-gray-700"
          >
            Resource Name
          </label>
          <input
            id="resourceName"
            type="text"
            value={resourceName}
            onChange={(e) => setResourceName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-purple-500 focus:ring-purple-500"
            placeholder="e.g. users, products, etc."
          />
        </div>

        <HttpMethodSelector
          enabledMethods={enabledMethods}
          handleToggle={handleToggle}
        />

        <div className="mb-4">
          <label
            htmlFor="mockData"
            className="block text-sm font-medium text-gray-700"
          >
            Mock Data Schema
          </label>
          <SchemaInput fields={fields} setFields={setFields} />
        </div>

        <div className="sticky bg-white bottom-0 right-0 flex space-x-2 p-3">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex-1"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex-1"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEndpointModal;
