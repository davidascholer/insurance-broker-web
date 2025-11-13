import { Button } from "../ui/button";

const PetAnimalFormItem = ({
  setAnimalSelected,
}: {
  setAnimalSelected: (animal: "dog" | "cat") => void;
}) => {
  return (
    <div className="flex py-4 gap-4">
      <Button
        className="cursor-pointer"
        onClick={() => setAnimalSelected("dog")}
      >
        Dog
      </Button>
      <Button
        className="cursor-pointer"
        onClick={() => setAnimalSelected("cat")}
      >
        Cat
      </Button>
    </div>
  );
};

export default PetAnimalFormItem;
