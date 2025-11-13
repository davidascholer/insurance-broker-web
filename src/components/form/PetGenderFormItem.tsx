import { Button } from "../ui/button";

const PetGenderFormItem = ({
  setGenderSelected,
}: {
  setGenderSelected: (gender: "male" | "female") => void;
}) => {
  return (
    <div className="flex py-4 gap-4">
      <Button
        className="cursor-pointer"
        onClick={() => setGenderSelected("male")}
      >
        Male
      </Button>
      <Button
        className="cursor-pointer"
        onClick={() => setGenderSelected("female")}
      >
        Female
      </Button>
    </div>
  );
};

export default PetGenderFormItem;
