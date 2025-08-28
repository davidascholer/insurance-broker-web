// Create a React component that renders the PIPA icon as a circular image with a light pink background and a white border.
import { cn } from "@/lib/utils";
import React from "react";

const PipaIcon = React.forwardRef<
  HTMLDivElement,
  { style?: React.CSSProperties; className: string }
>(({ style, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "w-[40px] aspect-square bg-(--text-dark) rounded-full flex items-center justify-center overflow-hidden",
        className
      )}
      style={style}
    >
      <img
        src="/logo192.png" // assuming the PIPA logo is in the public folder
        alt="PIPA Logo"
        className="w-[32px] object-contain mt-[4px]"
      />
    </div>
  );
});

export default PipaIcon;
