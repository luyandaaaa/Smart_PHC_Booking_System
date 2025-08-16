import React from "react";
import { cn } from "../../lib/utils";

const badgeVariants = {
  default: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
  secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
  outline: "text-foreground",
};

function getBadgeClass(variant = "default") {
  return badgeVariants[variant] || badgeVariants.default;
}

const Badge = React.forwardRef(function Badge({ className, variant = "default", ...props }, ref) {
  return (
    <div ref={ref} className={cn(getBadgeClass(variant), className)} {...props} />
  );
});

export { Badge };
