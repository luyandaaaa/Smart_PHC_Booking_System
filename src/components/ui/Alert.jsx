import React from "react";
import { cn } from "../../lib/utils";

const alertVariants = {
  default: "relative w-full rounded-lg border p-4 bg-background text-foreground",
  destructive: "border-destructive/50 text-destructive dark:border-destructive relative w-full rounded-lg border p-4 [&>svg]:text-destructive",
};

function getAlertClass(variant = "default") {
  return alertVariants[variant] || alertVariants.default;
}

const Alert = React.forwardRef(function Alert({ className, variant = "default", ...props }, ref) {
  return (
    <div ref={ref} role="alert" className={cn(getAlertClass(variant), className)} {...props} />
  );
});
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef(function AlertTitle({ className, ...props }, ref) {
  return (
    <h5 ref={ref} className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
  );
});
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(function AlertDescription({ className, ...props }, ref) {
  return (
    <div ref={ref} className={cn("text-sm", className)} {...props} />
  );
});
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
