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
      <p>good {goodNumber}</p>
      <p>neutral {neutralNumber}</p>
      <p>bad {badNumber}</p>
      <p>all {sum}</p>
      <p>average {calculateAverage()}</p>
      <p>positive {calculatePositive()}%</p>
    </div>
  )
}

export default Statistics