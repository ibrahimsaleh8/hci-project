import { useRef } from "react";
import { ShowToast } from "../components/Toast";
type addNewTaskDataType = {
  title: string;
  description: string;
  status: string;
  projectId: number;
};

export default function AddTask() {
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const projectId = useRef<HTMLSelectElement>(null);
  const status = useRef<HTMLSelectElement>(null);

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
  };

  return (
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
            <option value={"prject 1"}>prject 1</option>
            <option value={"prject 2"}>prject 2</option>
            <option value={"prject 3"}>prject 3</option>
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

        <button className="px-4 py-1.5 cursor-pointer disabled:opacity-65 w-32 bg-green-600 hover:opacity-80 duration-300 text-white rounded-md">
          Add
        </button>
      </form>
    </div>
  );
}
