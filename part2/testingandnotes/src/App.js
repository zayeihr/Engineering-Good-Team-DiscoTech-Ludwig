
const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <li>
            {note.content}
          </li>
        )}
      </ul>
    </div>
  )
}

export default App

// Because the code generating the li tags is JavaScript,
// it must be wrapped in curly braces in a JSX template just
// like all other JavaScript code.
