import React, { useState, useEffect } from "react";

interface CreateProjectFormProps {
  createProjectForm: {
    name: string;
    description: string;
  };
  handleUpdateCreateProjectForm: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreateProject: () => void;
  setIsCreating: (value: boolean) => void;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
  createProjectForm,
  handleUpdateCreateProjectForm,
  handleCreateProject,
  setIsCreating,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
      <form
        className={`bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md z-50 transform transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Create Project
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Project Name
          </label>
          <input
            type="text"
            name="name"
            value={createProjectForm.name}
            onChange={handleUpdateCreateProjectForm}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={createProjectForm.description}
            onChange={handleUpdateCreateProjectForm}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCreateProject}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200"
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => setIsCreating(false), 300); // delay closing to match animation
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

export default CreateProjectForm;
