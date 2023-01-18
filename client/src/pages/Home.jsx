import { useState } from "react";
import AddTodo from "../components/AddTodo";
import UpdateTodo from "../components/UpdateTodo";

import { useDeleteTodoMutation, useGetTodosQuery } from "../services/todos";

const SIZES = [5, 10, 25, 50];
function Home() {
  const [title, setTitle] = useState("");

  const [page, setPage] = useState(1);
  const [updateTodo, setUpdateTodo] = useState(false);
  const [todo, setTodo] = useState();

  const [size, setSize] = useState(10);

  const { data, isLoading, isError, refetch, isFetching } = useGetTodosQuery({
    title,
    page,
    size,
  });
  const [deleteTodo, { isLoading: deleteLoading }] = useDeleteTodoMutation();
  const handleDelete = async (id) => {
    await deleteTodo({ id });
    await refetch();
  };
  if (isLoading)
    return <h1 className="text-center text-blue-600 m-10">LOADING</h1>;
  if (isError) return <h1 className="text-center text-red-500 m-10">ERROR</h1>;
  const { docs, ...details } = data;
  return (
    <div className="m-20">
      <input
        type="text"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <span>Size: </span>
      <select value={size} onChange={(e) => setSize(e.target.value)}>
        {SIZES.map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ))}
      </select>
      <br />
      {updateTodo && (
        <UpdateTodo
          setUpdateTodo={setUpdateTodo}
          todo={todo}
          refetch={refetch}
          setTodo={setTodo}
        />
      )}
      {isFetching ? (
        <div>Fetching</div>
      ) : (
        docs?.map((todo) => {
          return (
            <div key={todo.id} className="border flex  items-center">
              <h4>{todo.title}</h4>
              <p>{todo.completed}</p>

              <button
                className="bg-red-600 p-2 m-2 "
                disabled={deleteLoading}
                onClick={() => handleDelete(todo.id)}
              >
                Remove Todo
              </button>
              <button
                className="bg-red-600 p-2 m-2 "
                disabled={deleteLoading}
                onClick={() => {
                  setTodo(todo);
                  setUpdateTodo(true);
                }}
              >
                Edit Todo
              </button>
            </div>
          );
        })
      )}
      <br />
      <div className="mx-auto text-center">
        {Array(data.totalPages)
          .fill(null)
          .map((_, i) => (
            <span
              key={i}
              style={{ margin: "19px", cursor: "pointer" }}
              onClick={() => {
                setPage(i + 1);
              }}
            >
              {i + 1}
            </span>
          ))}
      </div>

      <br />
      {/* {JSON.stringify(details, undefined, 2)} */}
      <br />
      <AddTodo refetch={refetch} />
    </div>
  );
}

export default Home;
