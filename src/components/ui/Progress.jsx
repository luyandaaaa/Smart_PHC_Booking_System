import React from "react";
// import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../lib/utils";

const Progress = React.forwardRef(function Progress({ className, value = 0, barColor, style, ...props }, ref) {
  // Remove barColor from props so it doesn't go to the DOM
  return (
    <div
      ref={ref}
      className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
      style={{ boxShadow: '0 1px 2px 0 rgba(59,130,246,0.05)', ...style }}
      {...props}
    >
      <div
        className="h-full flex-1 bg-primary transition-all"
        style={{ width: `${value}%`, borderRadius: 9999, background: barColor || undefined }}
      />
    </div>
  );
});
Progress.displayName = "Progress";

export { Progress };
