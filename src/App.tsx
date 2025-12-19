import { Link } from "react-router";
import ProjectCard from "./components/ProjectCard";
import { Plus } from "lucide-react";
import axios from "axios";
import { MainDomain } from "./components/ApiDomain";
import { useEffect, useMemo, useState } from "react";
import { ShowToast } from "./components/Toast";
import Loader from "./components/Loader";
export type ProjectDataType = {
  id: number;
  title: string;
  description: string;
  tasksCount: number;
};

async function getAllProjects(): Promise<ProjectDataType[]> {
  const res = await axios.get(`${MainDomain}/projects`);
  return res.data;
}
function App() {
  const [projects, setProjects] = useState<ProjectDataType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTxt, setSearchTxt] = useState("");
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

  const projectsData = useMemo(() => {
    if (projects) {
      return searchTxt.trim().length > 0
        ? projects.filter((p) =>
            p.title.toLowerCase().includes(searchTxt.toLowerCase())
          )
        : projects;
    }
    return null;
  }, [projects, searchTxt]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 justify-between flex-wrap">
        <h1 className="text-2xl font-medium">All Projects</h1>
        <Link
          className="px-4 py-1.5 bg-black flex items-center gap-2 mr-3 text-white rounded-md"
          to={"/add-project"}>
          <Plus className="w-4 h-4" /> Add Project
        </Link>
      </div>

      <div className="md:w-96 w-full">
        <input
          onChange={(e) => setSearchTxt(e.target.value)}
          className="w-full px-4 py-1.5 rounded-md border border-soft-border bg-white"
          type="search"
          placeholder="Search"
        />
      </div>

      <div className="flex gap-5 flex-wrap">
        {loading && !projectsData ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          projectsData && (
            <>
              {projectsData.length > 0 ? (
                projectsData.map((project) => (
                  <ProjectCard projectData={project} key={project.id} />
                ))
              ) : (
                <p className="text-2xl font-medium">No Projects Found...</p>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
}

export default App;
