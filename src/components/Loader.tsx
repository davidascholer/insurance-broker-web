import { LoaderOne } from "@/components/ui/loader";
import { cn } from "@/lib/utils";

const Loader = ({size}:{size?:string}) => {
  return (
    <div role="status">
      <LoaderOne />
      <span className={cn("sr-only", size)}>Loading...</span>
    </div>
  );
};
export default Loader;
