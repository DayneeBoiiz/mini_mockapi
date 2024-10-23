"use client";

import Link from "next/link";
import {
  Endpoint,
  EndpointWithMockData,
  ProjectWithEndpoints,
} from "@/next-types";
import React, { useEffect, useState } from "react";
import AddEndpointModal from "@/components/AddEndpointModal";
import { useParams } from "next/navigation";
import axios from "axios";
import AnimatedProgressBar from "@/components/AnimatedProgressBar";
import EditEndpointModal from "@/components/EditEndpointModal";
import DeleteButton from "@/components/DeleteButton";
import { FaEdit, FaTrash } from "react-icons/fa";
import ProjectNavbar from "@/components/ProjectNavbar";
import ConfirmDeleteModal from "@/components/ConfirmDelete";
import { useRouter } from "next/navigation";
import EditProjectForm from "@/components/EditProjectForm";
import toast from "react-hot-toast";
import { APIData } from "@prisma/client";

const ProjectDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [project, setProject] = useState<ProjectWithEndpoints>();
  const [currentEndpoint, setCurrentEndpoint] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [endpoints, setEndpoints] = useState<EndpointWithMockData[]>([]);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const params = useParams<{ id: string }>();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openEditModal = (endpoint: Endpoint) => {
    setCurrentEndpoint(endpoint);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setCurrentEndpoint(null);
    setIsEditModalOpen(false);
  };
  const openConfirmDelete = () => setIsConfirmDeleteOpen(true);
  const closeConfirmDelete = () => setIsConfirmDeleteOpen(false);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [endpointData, setEndpointData] = useState<any>(null);

  useEffect(() => {
    const fetchEndpoints = async () => {
      try {
        const response = await axios.get(`/api/projects/${params.id}`);
        setProject(response.data.project);
        setEndpoints(response.data.project.endpoints);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred";
        toast.error(`Error fetching endpoints: ${errorMessage}`);
      }
    };

    fetchEndpoints();
  }, [params.id]);

  const deleteProject = async () => {
    try {
      await axios.delete(`/api/projects/${project?.id}`);
      closeConfirmDelete();
      router.push("/projects");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
      toast.error(`Error deleting project: ${errorMessage}`);
    } finally {
      closeConfirmDelete();
    }
  };

  const handleUpdateProject = async (project: ProjectWithEndpoints) => {
    try {
      await axios.put(`/api/projects/${params.id}`, project);
      toast.success("Project updated successfully!");
      setProject(project);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
      toast.error(`Error updating project: ${errorMessage}`);
    } finally {
      closeEditModal();
    }
  };

  const setData = (mockData: APIData) => {
    if (Array.isArray(mockData)) {
      const dataObject = mockData[0].data;
      setEndpointData(dataObject);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ProjectNavbar project={project!} />

      <div className="flex flex-col mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-purple-600">
            {project?.name}
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setIsEditing(true);
              }}
              className="flex items-center px-3 py-2 text-sm font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 transition duration-200"
              aria-label="Edit Project"
            >
              <FaEdit className="mr-1" /> Edit
            </button>
            <button
              onClick={openConfirmDelete}
              className="flex items-center px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-200"
              aria-label="Delete Project"
            >
              <FaTrash className="mr-1" /> Delete
            </button>
          </div>
        </div>
        <p className="text-gray-500">{project?.description}</p>
      </div>

      <div className="p-2rounded-lg shadow-sm pb-2">
        <p className="text-xs sm:text-sm text-gray-600 mb-2 text-start">
          Use the following URL format:{" "}
          <code className="bg-purple-100 text-purple-800 font-mono p-1 rounded-md shadow-sm">
            http://localhost:3000/api/{project?.id}/:endpoint
          </code>
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Resources</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {endpoints && endpoints.length > 0 ? (
          endpoints.map((endpoint) => (
            <div
              key={endpoint.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 relative group"
            >
              <div className="flex justify-between items-center mb-3">
                <Link
                  href={`/api/${project?.id}${endpoint.route}`}
                  target="_blank"
                  className="font-bold text-purple-600 text-lg group-hover:underline transition"
                >
                  {endpoint.resourceName}
                </Link>
              </div>

              <div className="flex items-center space-x-4 mb-2">
                <div className="w-full" title="Click to generate mock data">
                  <AnimatedProgressBar EndpointId={endpoint.id} />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => {
                    setData(endpoint.mockData);
                    setIsDataModalOpen(true);
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
                >
                  Data
                </button>
                <button
                  onClick={() => openEditModal(endpoint)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                >
                  Edit
                </button>
                <DeleteButton
                  endpointId={endpoint.id}
                  setEndpoints={setEndpoints}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No endpoints available</p>
        )}
      </div>

      <button
        onClick={openModal}
        className="fixed bottom-10 right-10 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition transform hover:scale-110"
      >
        + Add Endpoint
      </button>

      <AddEndpointModal
        id={params.id}
        isOpen={isModalOpen}
        onClose={closeModal}
        setEndpoints={setEndpoints}
      />

      <EditEndpointModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        endpoint={currentEndpoint}
      />

      <ConfirmDeleteModal
        isOpen={isConfirmDeleteOpen}
        onClose={closeConfirmDelete}
        onConfirm={deleteProject}
      />

      {isEditing && (
        <EditProjectForm
          projectData={project!}
          handleUpdateProject={handleUpdateProject}
          setIsEditing={setIsEditing}
        />
      )}

      {isDataModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative max-h-[90%] overflow-y-auto bg-white px-6 pt-6 rounded-xl shadow-lg w-screen sm:w-[60%] mx-4 transition-all duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold text-purple-600 mb-4 text-center">
              Endpoint Data
            </h2>

            {endpointData ? (
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                {JSON.stringify(endpointData, null, 2)}
              </pre>
            ) : (
              <p>Loading data...</p>
            )}

            <div className="sticky bg-white bottom-0 right-0 space-x-2 p-3 flex justify-end mt-4">
              <button
                onClick={() => setIsDataModalOpen(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
