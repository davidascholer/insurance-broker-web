import { LoaderOne } from "@/components/ui/loader";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div role="status" className="mx-auto">
      <LoaderOne className={className} />
      <span className="sr-only">Loading...</span>
    </div>
  );
};
export default Loader;
