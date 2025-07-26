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
    <div className="coverage-item-container">
      <img src={imagePath} alt="pet" />
      <p className="bold sansita-bold">{title}</p>
      <p>{details}</p>
    </div>
  );
};
export default CoverageItem;
