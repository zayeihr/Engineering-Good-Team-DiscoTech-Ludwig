import { useState } from 'react'

const Button = (props) => <button onClick = {props.click}>{props.text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  

  //declaring elements
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
 
  //functions and event handlers here
  const NewAnecdote = () => {
    const rand = Math.round(Math.random() * 7)
    setSelected(rand)
  }
  const Votey = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const Biggy = () => {
    var largest = points[0]
    var k = 0
    for (var i = 0; i < points.length; i++) {
      if (largest < points[i]) {
        largest = points[i];
        k = i;
      }
    }
    return (
      <>
        <p>{anecdotes[k]}</p>
        <p>has {largest} votes</p>
      </>
    )
  }

  return (
    <div>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <Button click = {Votey} text = 'Vote' />
      <Button click = {NewAnecdote} text = 'Next Anecdote' />
      <h1>Anecdote with the most votes</h1>
      <Biggy />
    </div>
  )
}

export default App