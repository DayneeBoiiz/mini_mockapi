import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {  EndpointWithMockData } from "@/next-types";

interface DeleteButtonProps {
  endpointId: number;
  setEndpoints: React.Dispatch<React.SetStateAction<EndpointWithMockData[]>>;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  endpointId,
  setEndpoints,
}) => {
  const [confirming, setConfirming] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/resource/${endpointId}`);
      toast.success("Resource deleted successfully!");

      setEndpoints((prevEndpoints) =>
        prevEndpoints.filter((endpoint) => endpoint.id !== endpointId)
      );
      setConfirming(false);
    } catch (error: any) {
      setConfirming(false);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
      toast.error(`Error deleting resource: ${errorMessage}`);
    }
  };

  return (
    <div>
      {confirming && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-6">
            <p className="text-gray-800 text-lg font-medium">
              Are you sure you want to delete this resource?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setConfirming(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-5 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setConfirming(true)}
        className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteButton;
