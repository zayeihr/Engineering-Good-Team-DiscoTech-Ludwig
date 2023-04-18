

const App = (props) => {
  const { notes } = props
  return (
    <div>
      <h1>Notes</h1>
      <ul>
      {notes.map(props => 
          <li key = {props.id}>
            {props.content}
          </li>
        )}
      </ul>
    </div>
  )
}

export default App