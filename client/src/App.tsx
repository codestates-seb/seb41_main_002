import React from "react";
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
              <Route path="/items" element={<ShoppingList />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
