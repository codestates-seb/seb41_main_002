import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ItemDetail from "./Pages/ItemDetail";

function App() {
  return (
    <>
      <div className="Browser_Container">
        <div className="Contents_Wrap">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ItemDetail/>}/>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
