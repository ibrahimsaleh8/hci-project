import { useState } from "react";
import { ShowToast } from "../components/Toast";
import axios from "axios";
import { MainDomain } from "../components/ApiDomain";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";
async function CreateNewProject(data: { title: string; description: string }) {
  await axios.post(`${MainDomain}/projects`, data);
}
export default function AddProject() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const HandleAddNewPorject = async () => {
    console.log(title);
    console.log(desc);

    if (title.trim().length == 0) {
      ShowToast.fire({
        title: "Please Add Title",
        icon: "error",
      });
      return;
    }

    if (desc.trim().length == 0) {
      ShowToast.fire({
        title: "Please Add Description",
        icon: "error",
      });
      return;
    }
    setLoading(true);
    await CreateNewProject({ description: desc, title })
      .then(() => {
        ShowToast.fire({
          icon: "success",
          title: "Project added success",
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        ShowToast.fire({
          icon: "error",
          title: "Error Happend When adding new project",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          HandleAddNewPorject();
        }}
        className="flex flex-col gap-6 md:w-3/4 w-full bg-[#f7f7f7] p-6 mx-auto">
        <h1 className="text-2xl font-medium">Add New Project</h1>

        <div className="flex flex-col gap-1">
          <label htmlFor="project-title">Title:</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 bg-[#e7e7e7] border border-[#e7e7e7] duration-300 rounded-sm text-sm outline-0 focus:border-soft-border"
            type="text"
            id="project-title"
            placeholder="Title"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="project-desc">Description:</label>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            id="project-desc"
            className="p-2 bg-[#e7e7e7] border min-h-32 border-[#e7e7e7] duration-300 rounded-sm text-sm outline-0 focus:border-soft-border"
            placeholder="Description"
          />
        </div>
        <button
          disabled={loading}
          className="px-4 py-1.5 cursor-pointer disabled:opacity-65 w-32 bg-green-600 hover:opacity-80 duration-300 text-white rounded-md">
          {loading ? <Loader /> : "Add"}
        </button>
      </form>
    </div>
  );
}
