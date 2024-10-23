import { ProjectWithEndpoints } from "@/next-types";
import Link from "next/link";
import React from "react";

type ProjectNavbarProps = {
  project: ProjectWithEndpoints;
};

const ProjectNavbar: React.FC<ProjectNavbarProps> = ({ project }) => {
  return (
    <nav className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm flex items-center space-x-2">
      <Link
        href="/"
        className="text-purple-600 hover:text-purple-800 transition duration-200"
      >
        Home
      </Link>
      <span className="text-gray-500">&gt;</span>
      <Link
        href="/projects"
        className="text-purple-600 hover:text-purple-800 transition duration-200"
      >
        Projects
      </Link>
      <span className="text-gray-500">&gt;</span>
      <span className="text-gray-600 font-semibold">{project?.name}</span>
    </nav>
  );
};

export default ProjectNavbar;
