import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";

interface CommentBoxProps extends React.ComponentProps<"textarea"> {
  onSubmit: () => void;
  submitDisabled?: boolean;
  populatedText?: string;
}

function CommentBox({
  className,
  submitDisabled,
  onSubmit,
  populatedText = "",
  ...props
}: CommentBoxProps) {
  const { replace } = useFieldArray({ name: "botMessage" });

  useEffect(() => {
    replace(populatedText);
  }, [populatedText, replace]);

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
        "relative w-full h-full p-xl min-h-12 rounded-xl",
        className
      )}
    >
      {/* <div style={{ position: "relative", width: "300px", height: "150px" }}> */}
      <textarea
        data-slot="textarea"
        className={cn(
          "p-xl h-full placeholder:text-muted-foreground flex field-sizing-content w-full rounded-md bg-transparent px-3 py-2 text-base transition-[color,box-shadow] outline-none disabled:opacity-50 md:text-sm"
        )}
        onKeyDown={handleEnterPress}
        {...props}
      />
      <Button
        type="submit"
        variant={"ghost"}
        disabled={submitDisabled}
        className=" w-8 absolute bottom-2 right-2 p-0 cursor-pointer hover:bg-(--primary-teal) hover:text-(--light-pink) disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Send className="size-7" />
      </Button>
    </div>
  );
}

export default CommentBox;
