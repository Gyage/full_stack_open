const Total = ({ parts }) => {
  const sumTotal = parts.reduce((total, part) => (total + part.exercises), 0)

  return (
    <b>total of {sumTotal} exercises</b>
  )
}

export default Total;