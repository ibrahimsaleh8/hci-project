export default function ChangeTaskStatus({
  taskStatus,
  taskId,
}: {
  taskId: number;
  taskStatus: string;
}) {
  const HandleUpdateTask = async (newStatus: string) => {
    console.log(newStatus);
  };

  return (
    <div className="mt-2  pt-2 flex flex-col gap-3">
      <div className="flex flex-col gap-0">
        <label className="text-sm font-medium" htmlFor={`mark-as-${taskId}`}>
          Mark As:
        </label>
        <select
          defaultValue={taskStatus}
          className="py-2 text-sm text-black border-b outline-0"
          onChange={(e) => {
            console.log(e.target.value);
            if (taskStatus != e.target.value) {
              HandleUpdateTask(e.target.value);
            }
          }}
          id={`mark-as-${taskId}`}>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
}
