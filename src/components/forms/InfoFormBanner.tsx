const InfoFormBanner = () => {
  return (
    <div className="flex flex-col text-lg sansita-bold gap-6 justify-center items-center w-full rounded-sm text-(--text-dark) text-center">
      <h1
        className="sansita-bold text-5xl w-full"
        aria-label="Main headline for pet insurance services"
      >
        Compare pet insurance plans for dogs & cats.
      </h1>
      <ul className="flex flex-row flex-wrap w-full list-disc gap-8 justify-evenly px-4 mb-4">
        <li>Customized coverage</li>
        <li>100% free service</li>
        <li>No credit check</li>
        <li>Risk-free cancellation</li>
      </ul>
    </div>
  );
};
export default InfoFormBanner;
