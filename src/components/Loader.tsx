import { LoaderOne } from "@/components/ui/loader";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div role="status">
      <LoaderOne className={className} />
      <span className="sr-only">Loading...</span>
    </div>
  );
};
export default Loader;
