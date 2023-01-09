import React from "react";
import Home from "./Pages/Home";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ItemDetail from "./Pages/ItemDetail";
import ShoppingList from "./Pages/ShoppingList";
import ItemsTopList from "./Pages/ItemsTopList";

function App() {
  return (
    <>
      <div className="Browser_Container">
        <div className="Contents_Wrap">
          <BrowserRouter>
            <Routes>
              <Route path="/itemDetail/:itemId" element={<ItemDetail/>}/>
              <Route path="/" element={<Home />} />
              <Route path="/items-list" element={<ShoppingList />} />
              <Route path="/items-top-list" element={<ItemsTopList />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
