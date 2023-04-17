import { useState } from 'react'

const Button = (props) => <button onClick = {props.click}>{props.text}</button>

const StatisticLine = (props) => {
  return (
    <>
    <p>{props.text}: {props.value}</p>
    </>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props
  const total = good + neutral + bad
  const average = (good * 1 + neutral*0 + bad * -1)/total
  const positive = good/total*100

  if (isNaN(average) || isNaN(positive)) {
    return (
      <div>
        No feedback given
      </div>
    )
  } 
  return (
    <>
      <StatisticLine text = 'good' value = {good} />
      <StatisticLine text = 'neutral' value = {neutral} />
      <StatisticLine text = 'bad' value = {bad} />
      <StatisticLine text = 'all' value = {good + neutral + bad} />
      <p>average: {average}</p>
      <p>positive: {positive}%</p>
    </>
    )
} 


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => {
    const newGood = good + 1
    setGood(newGood)
  }

  const badClick = () => {
    const newBad = bad + 1
    setBad(newBad)
  }

  const neutralClick = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
  }



  return (
    <div>
      <h1>give feedback</h1>
      <Button text = "good" click = {goodClick}/>
      <Button text = "neutral" click = {neutralClick}/>
      <Button text = "bad" click = {badClick} />
      <h1>statistics</h1>
      <Statistics good = {good} bad = {bad} neutral = {neutral}/>
    </div>
  )
}

export default App