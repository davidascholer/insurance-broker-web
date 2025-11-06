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
    <div className="flex flex-row flex-wrap gap-5 justify-start, items-center p-2 max-w-[300px] min-w-[150px] text-start">
      <img src={imagePath} alt="pet" className="min-w-[100px] max-w-[300px] h-[300px] text-sm justify-self-center mt-2 object-cover" />
      <p className="sansita-bold text-lg mt-2">{title}</p>
      <p>{details}</p>
    </div>
  );
};
export default CoverageItem;
