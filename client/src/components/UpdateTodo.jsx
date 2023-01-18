import React from "react";
import { useState } from "react";
import { useUpdateTodoMutation } from "../services/todos";

const UpdateTodo = ({ setUpdateTodo, todo, setTodo, refetch }) => {
  const [title, setTitle] = useState(todo.title);
  const [updateTodo, { error, isLoading }] = useUpdateTodoMutation();
  const handleUpdateTodo = async () => {
    if (title.length > 3) {
      await updateTodo({ title, userId: 3, id: todo.id });
      refetch();
      setUpdateTodo(false);
      setTodo(false);
    }
  };
  return (
    <div className="text-center mx-auto m-10">
      <div className="text-center text-xl">Update Todo </div>
      <input
        type="text"
        placeholder="Title..."
        value={title}
        className="w-full"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="m-2" disabled={isLoading} onClick={handleUpdateTodo}>
        {!isLoading ? "Update Todo" : "updating"}
      </button>

      {error && JSON.stringify(error)}
    </div>
  );
};

export default UpdateTodo;
