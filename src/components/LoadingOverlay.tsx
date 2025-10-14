import React from "react";
import { cn } from "@/lib/utils";
import { LoaderOne } from "@/components/ui/loader";

interface LoadingOverlayProps {
  /** Whether the overlay is visible */
  isVisible?: boolean;
  /** Custom message to display below the spinner */
  message?: string;
  /** Additional CSS classes for the overlay */
  className?: string;
  /** z-index value for the overlay (default: 50) */
  zIndex?: number;
  /** Custom opacity for the background (default: 0.7) */
  opacity?: number;
  /** Size of the loading spinner */
  spinnerSize?: "sm" | "md" | "lg";
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible = false,
  className,
  zIndex = 50,
  opacity = 0.7,
  spinnerSize = "md",
}) => {
  if (!isVisible) return null;

  const spinnerSizeClasses = {
    sm: "scale-75",
    md: "scale-100",
    lg: "scale-125",
  };

  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center",
        "transition-all duration-300 ease-in-out",
        className
      )}
      style={{
        zIndex,
        backgroundColor: `rgba(12, 81, 99, ${opacity})`, // Using --primary-teal-dark with custom opacity
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="loading-message"
    >
      <div className="flex flex-col items-center justify-center p-6">
        <div className={cn(spinnerSizeClasses[spinnerSize])}>
          <LoaderOne />
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
