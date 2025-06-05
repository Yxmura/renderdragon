
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "online" | "offline" | "unknown";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusColor = () => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "offline":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("w-2 h-2 rounded-full", getStatusColor())} />
      <span className="text-sm capitalize">{status}</span>
    </div>
  );
}
