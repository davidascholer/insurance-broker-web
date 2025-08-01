import { Button } from "../ui/button";

const AnimalForm = ({ onSubmit }: { onSubmit: Function }) => {
  return (
    <div className="flex py-4 gap-4">
      <Button className="cursor-pointer" onClick={() => onSubmit("dog")}>
        Dog
      </Button>
      <Button className="cursor-pointer" onClick={() => onSubmit("cat")}>
        Cat
      </Button>
    </div>
  );
};

export default AnimalForm;
