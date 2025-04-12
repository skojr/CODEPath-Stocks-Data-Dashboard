import React, { Component, useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import axios from "axios";
import StockChart from "./StockChart";

const StockDetail = ({ symbol }) => {
  const [fullDetails, setFullDetails] = useState();
  const FPM_API_KEY = import.meta.env.VITE_FPM_API_KEY;
  const FPM_API_URL = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${FPM_API_KEY}`;

  const fetchCompanyDetails = async () => {
    try {
      const response = await axios.get(FPM_API_URL);
      const data = response.data;
      console.log(data);
      setFullDetails(data[0]);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  useEffect(() => {
    fetchCompanyDetails();
  }, [symbol]);

  if (!fullDetails) return <p>Loading company details...</p>;

  return (
    <div>
      <div className="stock-detail-header">
        <img
          src={fullDetails.image}
          alt={`${fullDetails.companyName} logo`}
        />
        <div className="stock-info">
          <h1 className="company-name">{fullDetails.companyName}</h1>
          <p className="stock-subheader">
            {fullDetails.exchange} • Sector: {fullDetails.sector}
          </p>
          <p className="stock-price">Current Price: ${fullDetails.price}</p>
        </div>
      </div>

      <div className="stock-details">
        <p>
          <strong>CEO:</strong> {fullDetails.ceo}
        </p>
      </div>

      <StockChart symbol={symbol} />
    </div>
  );
};
export default StockDetail;
