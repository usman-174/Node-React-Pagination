import React, { useState } from "react";
import { useAddTodoMutation } from "../services/todos";

const AddTodo = ({refetch}) => {
  const [title, setTitle] = useState("");
  const [addTodo, { error, isLoading }] = useAddTodoMutation();
  const handleAddTodo = async () => {
    if (title.length > 3) {
      setTitle("")
      await addTodo({ title, userId: 3 });
      refetch()
    }
  };
  //   if (isError) return <h1>Error</h1>;

  return (
    <div className="text-center mx-auto m-10">
      <input
        type="text"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="m-2" disabled={isLoading} onClick={handleAddTodo}>
        {!isLoading ? "Add Todo" : "Loading"}
      </button>

      {error && JSON.stringify(error)}
    </div>
  );
};

export default AddTodo;
