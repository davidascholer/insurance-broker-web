import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function InfoTooltip({ msg }: { msg?: string }) {
  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="bg-(--primary-coral) text-(--primary-teal-dark) hover:bg-(--coral-light) w-4 h-4 text-sm rounded-full "
      >
        <Button variant="ghost" className="sansita-regular cursor-pointer p-0">
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
