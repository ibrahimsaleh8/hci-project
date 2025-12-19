import axios from "axios";
import { Link, useParams } from "react-router";
import { MainDomain } from "../components/ApiDomain";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import TaskCard from "../components/TaskCard";
import { Plus } from "lucide-react";
export type TaskProjectDataType = {
  description: string;
  id: number;
  projectId: number;
  status: string;
  title: string;
};
type ProjectDetailsDataType = {
  id: number;
  title: string;
  description: string;
  tasks: TaskProjectDataType[];
};

async function getPjectById(id: number): Promise<ProjectDetailsDataType> {
  const res = await axios.get(`${MainDomain}/projects/${id}`);
  return res.data;
}

export default function ShowPorjectPage() {
  const params = useParams();
  const [projectData, setProjectData] = useState<ProjectDetailsDataType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);

  const makeApiRefresh = (makeit: boolean) => {
    setRefresh(makeit);
  };

  useEffect(() => {
    if (params.id) {
      getPjectById(+params.id)
        .then((data) => setProjectData(data))
        .catch((err) => {
          console.log(err);
          if (axios.isAxiosError(err)) {
            setError(err.response?.data.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if (params.id && refresh) {
      getPjectById(+params.id)
        .then((data) => setProjectData(data))
        .catch((err) => {
          console.log(err);
          if (axios.isAxiosError(err)) {
            setError(err.response?.data.message);
          }
        })
        .finally(() => {
          setLoading(false);
          setRefresh(false);
        });
    }
  }, [params.id, refresh]);

  if (error)
    return (
      <div className="p-4 bg-red-500 text-white flex flex-col gap-2">
        <p className="text-2xl font-medium">Error Happend</p>
        <p className="pl-10 text-2xl font-medium">{error}</p>
      </div>
    );
  return loading && !projectData ? (
    <div className="flex items-center justify-center">
      <Loader />
    </div>
  ) : (
    projectData && (
      <div className="flex flex-col gap-2">
        <p className="text-2xl capitalize font-bold">{projectData.title}</p>
        <p className="font-medium capitalize">{projectData.description}</p>
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

            <div className="flex gap-4 flex-wrap">
              {projectData.tasks.filter((t) => t.status == "todo").length >
              0 ? (
                projectData.tasks
                  .filter((t) => t.status == "todo")
                  .map((task) => (
                    <TaskCard
                      makeRefresh={makeApiRefresh}
                      key={task.id}
                      taskData={task}
                    />
                  ))
              ) : (
                <div className="p-4 bg-zinc-500 text-white w-full h-32 flex items-center justify-center rounded-md">
                  No Tasks Found
                </div>
              )}
            </div>
          </div>

          {/* In Progress */}
          <div className="flex flex-col gap-4">
            <div className="border-b py-3 border-soft-border">
              <p className="px-4 py-1.5 font-medium bg-amber-400 text-black w-fit rounded-md">
                In Progress
              </p>
            </div>
            <div className="flex gap-4 flex-wrap">
              {projectData.tasks.filter((t) => t.status == "in-progress")
                .length > 0 ? (
                projectData.tasks
                  .filter((t) => t.status == "in-progress")
                  .map((task) => (
                    <TaskCard
                      makeRefresh={makeApiRefresh}
                      key={task.id}
                      taskData={task}
                    />
                  ))
              ) : (
                <div className="p-4 bg-zinc-500 text-white w-full h-32 flex items-center justify-center rounded-md">
                  No Tasks Found
                </div>
              )}
            </div>
          </div>

          {/* Done */}
          <div className="flex flex-col gap-4 ">
            <div className="border-b py-3 border-soft-border">
              <p className="px-4 py-1.5 font-medium bg-green-600 text-white w-fit rounded-md">
                Done
              </p>
            </div>
            <div className="flex gap-4 flex-wrap">
              {projectData.tasks.filter((t) => t.status == "done").length >
              0 ? (
                projectData.tasks
                  .filter((t) => t.status == "done")
                  .map((task) => (
                    <TaskCard
                      makeRefresh={makeApiRefresh}
                      key={task.id}
                      taskData={task}
                    />
                  ))
              ) : (
                <div className="p-4 bg-zinc-500 text-white w-full h-32 flex items-center justify-center rounded-md">
                  No Tasks Found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
