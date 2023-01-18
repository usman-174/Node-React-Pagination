// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
  reducerPath: "todoApi",
  tagTypes: ["Todos"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: ({ title, page, size }) => {
        if (title.length > 3) {
          return `todos?page=${page}&size=${size}&title=${title}`;
        }
        return `todos?page=${page}&size=${size}`;
      },
    }),
    // Add Todo
    addTodo: builder.mutation({
      query: body => ({
        url: 'todos',
        method: 'POST',
        body   
    }),
    invalidatesTags: ['Todos']
    }),
    // Delete
    deleteTodo: builder.mutation({
      query: ({id} )=> ({
        url: `todos?id=${id}`,
        method: 'DELETE',
           
    }),
    invalidatesTags: ['Todos']
    }),
    // Update
    updateTodo: builder.mutation({
      query: ({id,...body} )=> ({
        url: `todos?id=${id}`,
        method: 'PATCH',
        body
           
    }),
    invalidatesTags: ['Todos']
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation ,useDeleteTodoMutation,useUpdateTodoMutation} = todoApi;
