const CoverageItem = ({
  imagePath,
  title,
  details,
}: {
  imagePath: string;
  title: string;
  details: string;
}) => {
  return (
    <div className="flex flex-col gap-4 justify-start items-center p-2 text-center max-w-[250px]">
      <img src={imagePath} alt="pet" className="w-[150px]" />
      <p className="sansita-bold text-xl">{title}</p>
      <p className="text-sm font-light nunito-sans-medium">{details}</p>
    </div>
  );
};
export default CoverageItem;
