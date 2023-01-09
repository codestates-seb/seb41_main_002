import React from "react";
import Home from "./Pages/Home";
import MemberPageEdit from "./Pages/MemberPageEdit";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="Browser_Container">
        <div className="Contents_Wrap">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/member/edit" element={<MemberPageEdit/>}/>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
