import { useState } from 'react'
import Feedback from './Feedback'
import Statistics from './Statistics'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback 
        handleClickGood={() => setGood(good + 1)} 
        handleClickNeutral={() => setNeutral(neutral + 1)} 
        handleClickBad={() => setBad(bad + 1)} 
      />
      <Statistics goodNumber={good} neutralNumber={neutral} badNumber={bad} />
    </div>
  )
}

export default App