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
    <div className="insurer-item-container">
      <img src={imagePath} alt={altImageText} />
      <p className="bold">{priceText}</p>
      <p>{details}</p>
    </div>
  );
};
export default InsurerItem;
