import TodoData from './components/todo/TodoData'
import TodoNew from './components/todo/TodoNew'
import './components/todo/todo.css'
import reactLogo from './assets/react.svg'

const App = () => {

  const hoidanit = "nine";
  const age = 20;
  const data = {
    address: "hanoi",
    coutry: "vietnam"
  }

  const addNewToDo = (name) => {
    alert(`call me :)) ${name}`)
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew
        addNewToDo={addNewToDo}
      />
      <TodoData
        name={hoidanit}
        age={age}
        data={data}

      />
      <div className='todo-image'>
        <img src={reactLogo} className='logo' />
      </div>
    </div>
  )
}

export default App
