import { LoaderOne } from "@/components/ui/loader";

const Loader = () => {
  return (
    <div role="status">
      <LoaderOne />
      <span className="sr-only">Loading...</span>
    </div>
  );
};
export default Loader;
