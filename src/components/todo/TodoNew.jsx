import { useState } from "react";

const TodoNew = (props) => {
    const [valueInput, setValueInput] = useState("eric")

    const { addNewToDo } = props;
    // addNewToDo("eric");
    const handleClick = () => {
        addNewToDo(valueInput);
        setValueInput("");
    }
    const handleOnChange = (name) => {
        //console.log(">>>> handleOnChange", name)
        setValueInput(name)
    }
    return (
        <div className='todo-new'>
            <input type="text"
                onChange={(event) => handleOnChange(event.target.value)}
                value={valueInput}
            />
            <button
                style={{ cursor: "pointer" }}
                onClick={handleClick}
            >
                Add
            </button>
            my text input is = {valueInput}
        </div>
    )
}
export default TodoNew;