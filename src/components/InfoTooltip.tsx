import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export function InfoTooltip({ msg }: { msg?: string }) {
  const [open, setOpen] = useState(false); // State to control popover visibility

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="bg-(--coral-light) text-(--primary-teal-dark) hover:bg-(--primary-coral) size-6 text-sm rounded-full "
      >
        <Button
          variant="ghost"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="sansita-regular cursor-pointer p-0"
        >
          i
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 z-100"
        onOpenAutoFocus={(e) => e.stopPropagation()}
      >
        <p className="text-muted-foreground text-sm">{msg}</p>
      </PopoverContent>
    </Popover>
  );
}
export default InfoTooltip;
