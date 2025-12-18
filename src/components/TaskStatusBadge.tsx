export default function TaskStatusBadge({ status }: { status: string }) {
  const styleClasses =
    status == "todo"
      ? "bg-gray-600 text-white"
      : status == "in-progress"
      ? "bg-amber-400 text-black"
      : "bg-green-600 text-white";
  return (
    <p
      className={`capitalize px-4 py-1.5 w-fit rounded-md text-sm font-medium ${styleClasses}`}>
      {status}
    </p>
  );
}
