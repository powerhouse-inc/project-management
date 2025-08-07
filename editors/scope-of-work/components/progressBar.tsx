export const ProgressBar = ({ progress }: { progress: any }) => {
  if (!progress) {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gray-300 h-2 rounded-full"
          style={{ width: "0%" }}
        ></div>
      </div>
    );
  }

  // Case 1: Binary progress {completed: boolean}
  if ("completed" in progress && typeof progress.completed === "boolean") {
    const percentage = progress.completed ? 100 : 0;
    const bgColor = progress.completed ? "bg-green-500" : "bg-gray-300";
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${bgColor} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  }

  // Case 2: Percentage progress {value: number}
  if ("value" in progress && typeof progress.value === "number") {
    const percentage = Math.min(Math.max(progress.value, 0), 100);
    const bgColor =
      percentage >= 100
        ? "bg-green-500"
        : percentage >= 50
          ? "bg-yellow-500"
          : "bg-blue-500";
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${bgColor} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
        <div className="text-xs text-gray-600 mt-1">
          {percentage.toFixed(1)}%
        </div>
      </div>
    );
  }

  // Case 3: Story points progress {completed: number, total: number}
  if (
    "completed" in progress &&
    "total" in progress &&
    typeof progress.completed === "number" &&
    typeof progress.total === "number"
  ) {
    const percentage =
      progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;
    const bgColor =
      percentage >= 100
        ? "bg-green-500"
        : percentage >= 50
          ? "bg-yellow-500"
          : "bg-blue-500";
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${bgColor} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
        <div className="text-xs text-gray-600 mt-1">
          {progress.completed}/{progress.total} SP
        </div>
      </div>
    );
  }

  // Fallback for unknown progress type
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-gray-300 h-2 rounded-full"
        style={{ width: "0%" }}
      ></div>
    </div>
  );
};

export default ProgressBar;
