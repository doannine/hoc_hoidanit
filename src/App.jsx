import TodoData from './components/todo/TodoData'
import TodoNew from './components/todo/TodoNew'
import './components/todo/todo.css'
import reactLogo from './assets/react.svg'
import { useState } from 'react'

const App = () => {
  const [todoList, setTodoList] = useState([
    // { id: 1, name: "Learning React" },
    // { id: 2, name: "watching youtube" }
  ])



  const addNewToDo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 100000),
      name: name
    }

    setTodoList([...todoList, newTodo])
    //array.push
  }
  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const deleteTodo = (id) => {
    console.log("checkid>>>>", id)
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>

      <TodoNew
        addNewToDo={addNewToDo}
      />

      {todoList.length > 0 ?
        <TodoData
          todoList={todoList}
          deleteTodo={deleteTodo}
        />
        :
        <div className='todo-image'>
          <img src={reactLogo} className='logo' />
        </div>
      }

      {/* {todoList.length > 0 &&

        <TodoData
          todoList={todoList}
        />

      }

      {todoList.length === 0 &&
        <div className='todo-image'>
          <img src={reactLogo} className='logo' />
        </div>
      } */}

    </div>
  )
}

export default App
