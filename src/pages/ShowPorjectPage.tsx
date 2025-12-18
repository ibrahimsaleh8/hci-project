import { Link, useParams } from "react-router";
import { Plus } from "lucide-react";
export type TaskProjectDataType = {
  description: string;
  id: number;
  projectId: number;
  status: string;
  title: string;
};
export type ProjectDetailsDataType = {
  id: number;
  title: string;
  description: string;
  tasks: TaskProjectDataType[];
};

export default function ShowPorjectPage() {
  const params = useParams();
  console.log("params", params);
  return (
    <div className="flex flex-col gap-2">
      <p className="text-2xl capitalize font-bold">Title</p>
      <p className="font-medium capitalize">description</p>
      <Link
        className="px-4 py-1.5 bg-black text-white ml-auto flex items-center gap-2 rounded-md"
        to={"/add-task"}>
        <Plus className="w-4 h-4" /> Add Task
      </Link>

      {/* tasks */}
      <div className="flex flex-col gap-6 mt-4">
        {/* To do */}
        <div className="flex flex-col gap-4 ">
          <div className="border-b py-3 border-soft-border">
            <p className="px-4 py-1.5 font-medium bg-gray-700 text-white w-fit rounded-md">
              To Do
            </p>
          </div>

          <div className="flex gap-4 flex-wrap">TaskCard TaskCard</div>
        </div>

        {/* In Progress */}
        <div className="flex flex-col gap-4">
          <div className="border-b py-3 border-soft-border">
            <p className="px-4 py-1.5 font-medium bg-amber-400 text-black w-fit rounded-md">
              In Progress
            </p>
          </div>
          <div className="flex gap-4 flex-wrap">TaskCard TaskCard</div>
        </div>

        {/* Done */}
        <div className="flex flex-col gap-4 ">
          <div className="border-b py-3 border-soft-border">
            <p className="px-4 py-1.5 font-medium bg-green-600 text-white w-fit rounded-md">
              Done
            </p>
          </div>
          <div className="flex gap-4 flex-wrap">TaskCardTaskCard</div>
        </div>
      </div>
    </div>
  );
}
