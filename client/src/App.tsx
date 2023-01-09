import React from "react";
import Home from "./Pages/Home";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ShoppingList from "./Pages/ShoppingList";

function App() {
  return (
    <>
      <div className="Browser_Container">
        <div className="Contents_Wrap">
          <BrowserRouter>
            <Routes>
<<<<<<< HEAD
              <Route path="/items" element={<ShoppingList />} />
=======
              <Route path="/" element={<Home />} />
>>>>>>> 849731ba0cca22e5bf631ca7ffe383ca10433dc2
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
