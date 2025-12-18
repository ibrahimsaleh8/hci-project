import { Trash2 } from "lucide-react";

export default function DeleteTask({ taskId }: { taskId: number }) {
  const HandelDeleteTask = async () => {
    console.log(taskId);
  };

  return (
    <button
      onClick={HandelDeleteTask}
      className="absolute right-2 top-2 w-6 h-6 flex items-center justify-center rounded-md cursor-pointer bg-red-500 text-white">
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
