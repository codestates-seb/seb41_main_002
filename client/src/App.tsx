import React from "react";
import Home from "./Pages/Home";
import MemberPageEdit from "./Pages/MemberPageEdit";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ItemDetail from "./Pages/ItemDetail";
import ShoppingList from "./Pages/ShoppingList";
import MemberPage from "./Pages/MemberPage";
import ItemsTopList from "./Pages/ItemsTopList";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Review from "./Pages/Review";

function App() {
  return (
    <>
      <div className="Browser_Container">
        <div className="Contents_Wrap">
          <BrowserRouter>
            <Routes>
              <Route path="/signUp" element={<SignUp/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/memberPage/:memberId" element={<MemberPage />} />
              <Route path="/itemDetail/:itemId" element={<ItemDetail />} />
              <Route path="/" element={<Home />} />
              <Route path="/member/edit" element={<MemberPageEdit />} />
              <Route path="/items-list" element={<ShoppingList />} />
              <Route path="/items-top-list" element={<ItemsTopList />} />
              <Route path="/reviews" element={<Review/>}/>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
