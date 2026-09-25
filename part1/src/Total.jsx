const Total = (parts) => {
  console.log(parts.parts)
  return (
    <p>{calculateTotal(parts.parts)}</p>
  )
}

const calculateTotal = parts => parts[0].exercises + parts[1].exercises + parts[2].exercises

export default Total;