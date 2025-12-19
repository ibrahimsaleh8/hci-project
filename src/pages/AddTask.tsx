import { useEffect, useRef, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import type { ProjectDataType } from "../App";
import { MainDomain } from "../components/ApiDomain";
import { ShowToast } from "../components/Toast";
import { useNavigate } from "react-router";
type addNewTaskDataType = {
  title: string;
  description: string;
  status: string;
  projectId: number;
};

async function getAllProjects(): Promise<ProjectDataType[]> {
  const res = await axios.get(`${MainDomain}/projects`);
  return res.data;
}

async function addNewTask(data: addNewTaskDataType) {
  await axios.post(`${MainDomain}/tasks`, data);
}

export default function AddTask() {
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const projectId = useRef<HTMLSelectElement>(null);
  const status = useRef<HTMLSelectElement>(null);

  const [projects, setProjects] = useState<ProjectDataType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProjects()
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => {
        console.log("Error ", err);
        ShowToast.fire({
          title: "Fetching Error",
          icon: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const HandleAddTask = async () => {
    const data: addNewTaskDataType = {
      title: title.current?.value as string,
      description: description.current?.value as string,
      status: status.current?.value as string,
      projectId: Number(projectId.current?.value as string),
    };

    if (data.title.trim().length == 0) {
      ShowToast.fire({
        icon: "error",
        title: "Please Add Task Title",
      });
      return;
    }
    if (data.description.trim().length == 0) {
      ShowToast.fire({
        icon: "error",
        title: "Please Add Task Description",
      });
      return;
    }
    setAdding(true);
    await addNewTask(data)
      .then(() => {
        ShowToast.fire({
          icon: "success",
          title: "Task Has been added success",
        });
        navigate(`/project/${data.projectId}`);
      })
      .catch((err) => {
        console.log(err);
        ShowToast.fire({
          icon: "error",
          title: "Error happend while adding new task",
        });
      })
      .finally(() => {
        setAdding(false);
      });
  };

  return loading && !projects ? (
    <div className="flex items-center justify-center">
      <Loader />
    </div>
  ) : (
    projects && (
      <div className="flex flex-col gap-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            HandleAddTask();
          }}
          className="flex flex-col gap-6 w-full md:w-3/4 bg-[#f7f7f7] p-6 mx-auto">
          <h1 className="text-2xl font-medium">Add Task</h1>

          {/* Title */}
          <div className="flex flex-col gap-1">
            <label htmlFor="project-title">Title:</label>
            <input
              ref={title}
              className="p-2 bg-[#e7e7e7] border border-[#e7e7e7] duration-300 rounded-sm text-sm outline-0 focus:border-soft-border"
              type="text"
              id="project-title"
              placeholder="Title"
            />
          </div>

          {/* Desc */}
          <div className="flex flex-col gap-1">
            <label htmlFor="project-desc">Description:</label>
            <textarea
              ref={description}
              id="project-desc"
              className="p-2 bg-[#e7e7e7] border min-h-32 border-[#e7e7e7] duration-300 rounded-sm text-sm outline-0 focus:border-soft-border"
              placeholder="Description"
            />
          </div>

          {/* Project */}
          <div className="flex flex-col gap-0">
            <label className="text-sm" htmlFor="project-id">
              Project:
            </label>
            <select
              ref={projectId}
              className="py-2 text-sm text-black border-b outline-0"
              id="project-id">
              {projects.map((pr) => (
                <option key={pr.id} value={pr.id}>
                  {pr.title}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-0">
            <label className="text-sm" htmlFor="status">
              Status:
            </label>
            <select
              ref={status}
              className="py-2 text-sm text-black border-b outline-0"
              id="status">
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <button
            disabled={loading}
            className="px-4 py-1.5 cursor-pointer disabled:opacity-65 w-32 bg-green-600 hover:opacity-80 duration-300 text-white rounded-md">
            {adding ? <Loader /> : "Add"}
          </button>
        </form>
      </div>
    )
  );
}
