import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header.tsx";
import ShowPorjectPage from "./pages/ShowPorjectPage.tsx";
import AddProject from "./pages/AddProject.tsx";
import AddTask from "./pages/AddTask.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <div
        style={{
          minHeight: "calc(100vh - 80px)",
        }}
        className="w-full relative">
        {/* Dashed Grid */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
            WebkitMaskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        <div className="p-4 container mx-auto relative">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="add-project" element={<AddProject />} />
            <Route path="add-task" element={<AddTask />} />
            <Route path="project">
              <Route path=":id" element={<ShowPorjectPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>
);
