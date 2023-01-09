import React from "react";
import Home from "./Pages/Home";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ItemDetail from "./Pages/ItemDetail";
import ShoppingList from "./Pages/ShoppingList";

function App() {
  return (
    <>
      <div className="Browser_Container">
        <div className="Contents_Wrap">
          <BrowserRouter>
            <Routes>
              <Route path="/itemDetail/:itemId" element={<ItemDetail/>}/>
              <Route path="/" element={<Home />} />
              <Route path="/items" element={<ShoppingList />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
