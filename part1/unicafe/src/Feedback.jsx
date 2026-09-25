import Button from './Button'

const Feedback = ({ handleClickGood, handleClickNeutral,handleClickBad }) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={handleClickGood} />
      <Button text="neutral" onClick={handleClickNeutral} />
      <Button text="bad" onClick={handleClickBad} />
    </div>
  )
}

export default Feedback