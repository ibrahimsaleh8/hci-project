import { Link } from "react-router";
import { Plus } from "lucide-react";
import { useState } from "react";

function App() {
  const [searchTxt, setSearchTxt] = useState("");
  console.log("searchTxt ", searchTxt);
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

      <div className="flex gap-5 flex-wrap">Projects</div>
    </div>
  );
}

export default App;
