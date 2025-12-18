import { ChartBarDecreasing, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import type { ProjectDataType } from "../App";

export default function ProjectCard({
  projectData,
}: {
  projectData: ProjectDataType;
}) {
  return (
    <div className="md:min-w-96 min-w-full bg-second-black text-white p-4 rounded-md flex flex-col gap-3">
      <p className="font-bold text-lg">{projectData.title}</p>
      <p>{projectData.description}</p>
      <div className="flex items-center gap-4 justify-between mt-3 border-t border-soft-border pt-5">
        <p className="bg-amber-400 text-black font-medium px-4 py-1.5 rounded-md text-sm flex items-center gap-3">
          <ChartBarDecreasing className="w-4 h-4" />
          {projectData.tasksCount} Tasks
        </p>
        <Link
          className="px-4 py-1.5 bg-amber-50 text-black hover:bg-black hover:text-white duration-300 border border-amber-50 text-sm rounded-md font-medium flex items-center gap-2"
          to={`/project/${projectData.id}`}>
          View Tasks
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
