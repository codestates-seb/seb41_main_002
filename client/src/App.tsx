import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Review from "./Pages/Review";
import SignUp from "./Pages/SignUp";
import Checkout from "./Pages/Checkout";
import ItemDetail from "./Pages/ItemDetail";
import MemberPage from "./Pages/MemberPage";
import ShoppingList from "./Pages/ShoppingList";
import ItemsTopList from "./Pages/ItemsTopList";
import ShoppingCart from "./Pages/ShoppingCart";
import MemberPageEdit from "./Pages/MemberPageEdit";
import SubscriptionPage from "./Pages/SubscriptionPage";
import Footer from "./Components/Commons/Footer";
import EventDetail from "./Pages/EventDetail";
import Header from "./Components/Commons/Header";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div className="Browser_Container">
        <div className="Contents_Wrap">
          <BrowserRouter>
            <Header />
            <Routes>
              <Route />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/memberPage/:memberId" element={<MemberPage />} />
              <Route path="/itemDetail/:itemId" element={<ItemDetail />} />
              <Route path="/" element={<Home />} />
              <Route path="/member/edit" element={<MemberPageEdit />} />
              <Route path="/items-list" element={<ShoppingList />} />
              <Route path="/items-top-list" element={<ItemsTopList />} />
              <Route
                path="/members/:memberId/carts"
                element={<ShoppingCart />}
              />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/reviews" element={<Review />} />
              <Route path="/members/:memberId/subscribe" element={<SubscriptionPage />} />
              <Route path="/events/:eventId" element={<EventDetail />} />
            </Routes>
          </BrowserRouter>
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default App;
