import React, { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
}

const TodoItem: React.FC<{
  todo: Todo;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
}> = ({ todo, onDelete, onEdit }) => {
  const [isEditing, setEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  useEffect(() => {
    setNewText(todo.text);
  }, [todo.text]);

  const handleEdit = () => {
    onEdit(todo.id, newText);
    setEditing(false);
  };

  return (
    <li className="flex items-center space-x-2">
      {isEditing ? (
        <>
          <input
            type="text"
            className="border-b border-gray-300 outline-none"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <p className="w-2/3">{todo.text}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
};

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: newTodo }]);
    setNewTodo("");
  };

  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id: number, text: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="w-1/3 mx-auto mt-4">
      <h1 className="text-2xl mb-4">Todo List</h1>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Add a new todo"
          className="w-2/3 border border-gray-300 p-2 outline-none"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2" onClick={handleAddTodo}>
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default Todo;
