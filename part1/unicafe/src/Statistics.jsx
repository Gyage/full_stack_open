import StatisticLine from "./StatisticLine";

const Statistics = ({ goodNumber, neutralNumber, badNumber }) => {
  const sum = badNumber + neutralNumber + goodNumber;
  const calculateAverage = () => (goodNumber - badNumber) / sum;
  const calculatePositive = () => goodNumber / sum * 100;

  if (sum === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text={"good"} value={goodNumber} />
      <StatisticLine text={"neutral"} value={neutralNumber} />
      <StatisticLine text={"bad"} value={badNumber} />
      <StatisticLine text={"all"} value={sum} />
      <StatisticLine text={"average"} value={calculateAverage()} />
      <StatisticLine text={"positive"} value={calculatePositive() + "%"} />
    </div>
  )
}

export default Statistics