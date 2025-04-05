const Stats = ({ symbol, stockMap, std, avgHigh, numOfStocks }) => {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Stats</h2>
      <p><strong>Symbol:</strong> {symbol}</p>
      <p><strong>Avg High:</strong> {avgHigh}</p>
      <p><strong>Volatility:</strong> {std}</p>
      <p><strong>Data Points:</strong> {numOfStocks}</p>
    </div>
  );
};

export default Stats;
