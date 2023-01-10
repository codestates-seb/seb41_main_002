import React from "react";
import Home from "./Pages/Home";
import MemberPageEdit from "./Pages/MemberPageEdit";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ItemDetail from "./Pages/ItemDetail";
import ShoppingList from "./Pages/ShoppingList";
import MemberPage from "./Pages/MemberPage";
import ItemsTopList from "./Pages/ItemsTopList";
<<<<<<< HEAD
import Checkout from "./Pages/Checkout";
=======
import Review from "./Pages/Review";
>>>>>>> ccc4f32b454e7dd55dfa59388f30ebebf1dcec38

function App() {
  return (
    <>
      <div className="Browser_Container">
        <div className="Contents_Wrap">
          <BrowserRouter>
            <Routes>
              <Route path="/memberPage/:memberId" element={<MemberPage />} />
              <Route path="/itemDetail/:itemId" element={<ItemDetail />} />
              <Route path="/" element={<Home />} />
              <Route path="/member/edit" element={<MemberPageEdit />} />
              <Route path="/items-list" element={<ShoppingList />} />
              <Route path="/items-top-list" element={<ItemsTopList />} />
<<<<<<< HEAD
              <Route path="/checkout" element={<Checkout />} />
=======
              <Route path="/reviews" element={<Review/>}/>
>>>>>>> ccc4f32b454e7dd55dfa59388f30ebebf1dcec38
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
