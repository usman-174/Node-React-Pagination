import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import SingleTodo from "./pages/SingleTodo";


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
     
        <Route index element={<Home />} />
        <Route path="todos/:id" element={<SingleTodo />} />
        
        <Route path="*" element={<NoPage />} />
    
    </Routes>
  </BrowserRouter>
  );
}
