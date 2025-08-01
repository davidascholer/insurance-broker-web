import { Button } from "../ui/button";

const GenderForm = ({ onSubmit }: { onSubmit: Function }) => {
  return (
    <div className="flex py-4 gap-4">
      <Button className="cursor-pointer" onClick={() => onSubmit("male")}>
        Male
      </Button>
      <Button className="cursor-pointer" onClick={() => onSubmit("female")}>
        Female
      </Button>
    </div>
  );
};

export default GenderForm;
