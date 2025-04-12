import axios from "axios";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const StockChart = ({ symbol }) => {
  const [highData, setHighData] = useState(null);
  const [closeData, setCloseData] = useState(null);

  const TWELVE_API_KEY = import.meta.env.VITE_TWELVE_API_KEY;
  const TWELVE_API_URL = `https://api.twelvedata.com/time_series?apikey=${TWELVE_API_KEY}&interval=1day&symbol=${symbol}&country=US&type=stock&timezone=utc`;

  const fetchStockDetails = async () => {
    try {
      const response = await axios.get(TWELVE_API_URL);
      const data = response.data.values;
      console.log(data);

      const highFormatted = data.map((point) => ({
        time: point.datetime,
        price: parseFloat(point.high),
      }));

      const closeFormatted = data.map((point) => ({
        time: point.datetime,
        price: parseFloat(point.close),
      }));

      setHighData(highFormatted.reverse());
      setCloseData(closeFormatted.reverse());
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  useEffect(() => {
    fetchStockDetails();
  }, [symbol]);

  const renderChart = (data, title, strokeColor, yLabel) => (
    <div style={{ width: "100%", height: 400, marginBottom: "3rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>{title}</h2>
      {data && data.length > 0 ? (
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={(str) => str}
              label={{ value: "Date", position: "bottom", offset: -10 }}
            />
            <YAxis
              domain={["dataMin", "dataMax"]}
              label={{ value: yLabel, angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              labelFormatter={(label) => `Date: ${label}`}
              formatter={(value) => [`$${value.toFixed(2)}`, yLabel]}
            />
            <Line type="monotone" dataKey="price" stroke={strokeColor} dot={false} name={yLabel} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p style={{ textAlign: "center" }}>Loading {yLabel.toLowerCase()} chart...</p>
      )}
    </div>
  );

  return (
    <div>
      {renderChart(highData, `${symbol} Daily High Price (Past 30 Days)`, "#8884d8", "High Price")}
      {renderChart(closeData, `${symbol} Daily Close Price (Past 30 Days)`, "#22c55e", "Close Price")}
    </div>
  );
};

export default StockChart;

