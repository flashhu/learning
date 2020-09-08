import React, { useState } from 'react';

interface AddTodoFormProps {
    addTodo: AddTodo
}
 
export const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTodo }) => {
    const [newTodo, setNewTodo] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value);
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        addTodo(newTodo);
        setNewTodo("");
    }

    return (
        <form>
            <input type="text" value={newTodo} onChange={handleChange} />
            <button type="submit" onClick={handleSubmit}>Add</button>
        </form>
    )
}