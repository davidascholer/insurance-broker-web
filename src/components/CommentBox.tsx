import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

interface CommentBoxProps extends React.ComponentProps<"textarea"> {
  onSubmit: () => void;
  submitDisabled?: boolean;
}

function CommentBox({
  className,
  submitDisabled,
  onSubmit,
  ...props
}: CommentBoxProps) {
  const handleEnterPress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div
      className={cn(
        "relative w-full h-full p-xl min-h-20 rounded-xl",
        className
      )}
    >
      {/* <div style={{ position: "relative", width: "300px", height: "150px" }}> */}
      <textarea
        data-slot="textarea"
        className={cn(
          "p-xl h-full border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        )}
        onKeyDown={handleEnterPress}
        {...props}
      />
      <Button
        type="submit"
        variant={"ghost"}
        disabled={submitDisabled}
        className="absolute bottom-2 right-2 p-0 cursor-pointer"
      >
        <Send className="size-8" />
      </Button>
    </div>
  );
}

export default CommentBox;
