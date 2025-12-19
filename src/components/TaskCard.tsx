import type { TaskProjectDataType } from "../pages/ShowPorjectPage";
import ChangeTaskStatus from "./ChangeTaskStatus";
import DeleteTask from "./DeleteTask";
import TaskStatusBadge from "./TaskStatusBadge";

export default function TaskCard({
  taskData,
  makeRefresh,
}: {
  taskData: TaskProjectDataType;
  makeRefresh: (makeit: boolean) => void;
}) {
  return (
    <div className="md:min-w-96 min-w-full bg-amber-200 rounded-2xl p-4 flex flex-col gap-4 relative">
      <p className="font-medium capitalize">{taskData.title}</p>
      <p>{taskData.description}</p>
      <TaskStatusBadge status={taskData.status} />
      {/* ACTIONS */}
      <ChangeTaskStatus
        makeRefresh={makeRefresh}
        taskId={taskData.id}
        taskStatus={taskData.status}
      />
      <DeleteTask makeRefresh={makeRefresh} taskId={taskData.id} />
    </div>
  );
}
