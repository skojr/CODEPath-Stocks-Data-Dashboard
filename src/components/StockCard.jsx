import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StockCard = ({ symbol }) => {
  const [fullDetails, setFullDetails] = useState(null);

  const FPM_API_KEY = import.meta.env.VITE_FPM_API_KEY;
  const FPM_API_URL = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${FPM_API_KEY}`;

  const fallbackImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABU1BMVEX//////v/5..."; // your full base64 image string

  const fetchCompanyDetails = async () => {
    try {
      const response = await axios.get(FPM_API_URL);
      const data = response.data;
      setFullDetails(data[0]);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  useEffect(() => {
    fetchCompanyDetails();
  }, [symbol]);

  return (
    <Link to={`/detailView/${symbol}`}>
      <img
        src={fullDetails?.image || fallbackImage}
        alt={`${symbol} logo`}
        style={{ cursor: "pointer", width: "100px", height: "100px" }}
      />
    </Link>
  );
};

export default StockCard;
