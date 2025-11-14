import { useNavigate } from "react-router-dom";

const InsurerItem = ({
  imagePath,
  altImageText,
}: {
  imagePath: string;
  altImageText: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-row flex-wrap gap-4 justify-center items-center max-w-[280px] min-w-[150px] text-center cursor-pointer"
      onClick={() => {
        navigate("/info");
      }}
    >
      <img
        src={imagePath}
        alt={altImageText}
        className="w-[175px] h-auto max-h-[150px] object-contain text-dark mt-2"
      />
    </div>
  );
};
export default InsurerItem;
