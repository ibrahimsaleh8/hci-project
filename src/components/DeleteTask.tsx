import axios from "axios";
import { Trash2 } from "lucide-react";
import { MainDomain } from "./ApiDomain";
import { ShowToast } from "./Toast";
import Swal from "sweetalert2";

async function deleteTaskApi(id: number) {
  await axios.delete(`${MainDomain}/tasks/${id}`);
}

export default function DeleteTask({
  taskId,
  makeRefresh,
}: {
  taskId: number;
  makeRefresh: (makeit: boolean) => void;
}) {
  const HandelDeleteTask = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteTaskApi(taskId)
          .catch((err) => {
            console.log(err);
            ShowToast.fire({
              icon: "error",
              title: "Error Happend while deleteing task",
            });
          })
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Task Deleted Success",
              icon: "success",
            });
            makeRefresh(true);
          });
      }
    });
  };

  return (
    <button
      onClick={HandelDeleteTask}
      className="absolute right-2 top-2 w-6 h-6 flex items-center justify-center rounded-md cursor-pointer bg-red-500 text-white">
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
