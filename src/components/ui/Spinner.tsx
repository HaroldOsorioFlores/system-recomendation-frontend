import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

export function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  return (
    <div role="status" {...props}>
      <Loader2
        className={cn(
          "animate-spin",
          {
            "w-4 h-4": size === "sm",
            "w-8 h-8": size === "md",
            "w-12 h-12": size === "lg",
          },
          className
        )}
      />
      <span className="sr-only">Cargando...</span>
    </div>
  );
}
