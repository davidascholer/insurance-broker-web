import { useNavigate } from "react-router-dom";

const FetchQuoteButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/quotes");
  };
  return (
    <button className="btn-primary nunito-sans-bold" onClick={handleClick}>Fetch a Quote</button>
  );
};

export default FetchQuoteButton;
