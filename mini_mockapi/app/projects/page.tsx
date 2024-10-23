"use client";

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProjectWithEndpoints } from "@/next-types";
import CreateProjectForm from "@/components/CreateProjectForm";
import toast from "react-hot-toast";

export default function Projects() {
  const [createProjectForm, setCreateProjectForm] = useState({
    name: "",
    description: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectWithEndpoints[]>([]);

  const handleUpdateCreateProjectForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCreateProjectForm({
      ...createProjectForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateProject = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/projects", createProjectForm);
      toast.success("Project created successfully!");

      setCreateProjectForm({ name: "", description: "" });
      setIsCreating(false);

      const updatedProjects = [...projects, response.data];
      setProjects(updatedProjects);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
      toast.error(`Error creating project: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/projects");
      const data = response.data;
      setProjects(data);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
      toast.error(`Error fetching projects: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-light-gray text-dark-gray">
        <main className="flex-1 p-6 bg-light-gray">
          <section className="py-16">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-bold">Projects</h2>
                <button
                  onClick={() => setIsCreating(true)}
                  className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-purple-700 transition transform hover:scale-105"
                >
                  + Create Project
                </button>
              </div>

              {isCreating && (
                <CreateProjectForm
                  createProjectForm={createProjectForm}
                  handleUpdateCreateProjectForm={handleUpdateCreateProjectForm}
                  handleCreateProject={handleCreateProject}
                  setIsCreating={setIsCreating}
                />
              )}

              {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-25 z-50 flex items-center justify-center">
                  <div className="loader border-t-4 border-purple-600 rounded-full w-12 h-12 animate-spin"></div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {projects.length === 0 ? (
                  <div className="col-span-1 sm:col-span-2 md:col-span-3 p-6 bg-gray-100 text-center rounded-lg shadow-md">
                    <p className="text-gray-600">No projects available.</p>
                  </div>
                ) : (
                  projects.map((project) => (
                    <Link key={project.id} href={`/projects/${project.id}`}>
                      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer">
                        <h3 className="text-xl font-semibold text-purple-600">
                          {project.name}
                        </h3>
                        <p className="text-gray-600 mt-2">
                          {project.endpoints.length} Endpoints
                        </p>
                        <p className="text-gray-500 mt-1">
                          Created on:{" "}
                          {new Date(project.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
