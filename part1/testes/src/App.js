 

import { useState } from 'react'

const History = (props) => {
  if (props.allClicks.length ===  0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0) 

  const handleLeftClick = () => {
    setAll(allClicks.concat('L')) // adds letter 'L', .concat makes a copy while .push directly changes the react element
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)  
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight) 
    setTotal(updatedRight + left)  
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      {/* <p>{allClicks.join(' ')}</p>  */}
      <noscript> .join joins the stuff in an array into a string</noscript>
      <p>total: {total}</p>
      <History allClicks={allClicks} />
    </div>
  )
} 

// slay

export default App;
