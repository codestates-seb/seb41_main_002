import { ShoppingCategoryTab } from "../Components/ShoppingList/CategoryTab";
import { Link } from "react-router-dom";
import "./Style/shoppingList.css";
import Product from "../Components/ShoppingList/Product";

export default function ShoppingList() {
  return (
    <div className="Shopping_List_Container">
      <div className="Shopping_List_Search">
        <input
          type="text"
          placeholder="검색하세요"
          className="Search_Bar"
        ></input>
      </div>
      <div className="Tab_Container">
      <ul className="Tab_List">
        <ShoppingCategoryTab />
      </ul>
      </div>
      <div className="Product_List_Container">
      <ul className="Product_List">
        <Product />
      </ul>
      </div>
    </div>
  );
}
