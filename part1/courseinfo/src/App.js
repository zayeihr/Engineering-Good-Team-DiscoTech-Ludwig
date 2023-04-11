
const Header = (props) => {
  return <h1>{props.name}</h1>
}


const Parts = (props) => 
  <div>
    <p>This section of the course is titled "<b>{props.parts.name}</b>"</p>
    <p>"<b>{props.parts.name}"</b>  has {props.parts.exercises} exercises</p>
  </div>

const Content = (props) => 
  <div>
      <Parts parts = {props.parts[0]} />
      <Parts parts = {props.parts[1]} />
      <Parts parts = {props.parts[2]} />
  </div>



const Total = (props) => 
  <>
   <p>Number of Exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  </> 



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  

  return (
    <div>
      <Header name = {course.name} />   
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  )
}

export default App




// Notes: 

// import { useState } from 'react'

// const Display = (props) => {
//   return (
//     <div>{props.counter}</div>
//   )
// }

// const Button = (props) => {
//   return (
//     <button onClick={props.handleClick}> 
//       {props.text}
//     </button>
//   )
// }

// const App = () => {
//   const [counter, setCounter] = useState(0)
//   console.log('rendering with counter value', counter)

//   const increaseByOne = () => {
//     console.log('increasing, value before', counter)
//     setCounter(counter + 1)
//   }

//   const decreaseByOne = () => { 
//     console.log('decreasing, value before', counter)
//     setCounter(counter - 1)
//   }

//   const setToZero = () => {
//     console.log('resetting to zero, value before', counter)
//     setCounter(0)
//   }

//   return (
//     <div>
//       <Display counter={counter} />
//       <Button handleClick={increaseByOne} text="plus" />
//       <Button handleClick={setToZero} text="zero" />
//       <Button handleClick={decreaseByOne} text="minus" />
//     </div>
//   )
// }

// export default App