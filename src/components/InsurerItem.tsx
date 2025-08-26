const InsurerItem = ({
  imagePath,
  altImageText,
  priceText,
  details,
}: {
  imagePath: string;
  altImageText: string;
  priceText: string;
  details: string;
}) => {
  return (
    <div className="flex flex-row flex-wrap gap-4 justify-center items-center p-4 max-w-[280px] min-w-[150px] text-center">
      <img src={imagePath} alt={altImageText} className="min-w-[100px] max-w-[150px] h-auto max-h-[150px] object-contain text-dark mt-2" />
      <p className="bold">{priceText}</p>
      <p>{details}</p>
    </div>
  );
};
export default InsurerItem;
