import { ProjectWithEndpoints } from "@/next-types";
import React, { useState, useEffect } from "react";

interface EditProjectFormProps {
  projectData: ProjectWithEndpoints;
  handleUpdateProject: (project: ProjectWithEndpoints) => void;
  setIsEditing: (value: boolean) => void;
}

const EditProjectForm: React.FC<EditProjectFormProps> = ({
  projectData,
  handleUpdateProject,
  setIsEditing,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [editedProject, setEditedProject] = useState(projectData);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdateProject(editedProject);
    setIsVisible(false);
    setTimeout(() => setIsEditing(false), 300);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className={`bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md z-50 transform transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Edit Project
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Project Name
          </label>
          <input
            type="text"
            name="name"
            value={editedProject.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={editedProject.description ?? ""}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => setIsEditing(false), 300);
            }}
            className="ml-4 text-gray-500 hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProjectForm;
