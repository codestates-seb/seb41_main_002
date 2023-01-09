import React from "react";
import Home from "./Pages/Home";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
