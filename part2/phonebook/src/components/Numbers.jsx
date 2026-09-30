import Number from "./Number"

const Numbers = ({ persons }) => {
  const numbers = persons.map(person =>
    <Number key={person.name} person={person} />
  )

  return (
    <>
      <h3>Numbers</h3>
      {numbers}
    </>
  )
}

export default Numbers