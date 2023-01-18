import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./store";
import "./index.css";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { todoApi } from "./services/todos";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApiProvider api={todoApi}>
        <App />
      </ApiProvider>
    </Provider>
  </React.StrictMode>
);
