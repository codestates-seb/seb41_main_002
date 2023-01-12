import { ShoppingCategoryTab } from "../Components/ShoppingList/CategoryTab"
import CustomButton from "../Components/Commons/Buttons";
import shoppingList from "../data/shoppingList.json"
import "./Style/shoppingList.css";

console.log(shoppingList.cosmetics)

export default function ShoppingList() {
  return (
    <div>
      <div className="Shopping_List_Search">
        <input
          type="text"
          placeholder="검색하세요"
          className="Search_Bar"
        ></input>
      </div>
      <ul className="Filter_Options">
        <ShoppingCategoryTab/>
      </ul>
      <div className="Products_Gallery">
        {/* 아래 상품들은 이후 데이터를 활용한 .map 방식으로 구성할 예정 */}
        <ul className="Products_Row">
          <li className="Product_Detail">
            <img
              src="https://picsum.photos/200?random=1"
              alt="sample image"
            ></img>
            <p>상품명</p>
            <p>가격</p>
          </li>
          <li className="Product_Detail">
            <img
              src="https://picsum.photos/200?random=2"
              alt="sample image"
            ></img>
            <p>상품명</p>
            <p>가격</p>
          </li>
          <li className="Product_Detail">
            <img
              src="https://picsum.photos/200?random=3"
              alt="sample image"
            ></img>
            <p>상품명</p>
            <p>가격</p>
          </li>
          <li className="Product_Detail">
            <img
              src="https://picsum.photos/200?random=4"
              alt="sample image"
            ></img>
            <p>상품명</p>
            <p>가격</p>
          </li>
        </ul>
        <ul className="Products_Row">
          <li className="Product_Detail">
            <img
              src="https://picsum.photos/200?random=5"
              alt="sample image"
            ></img>
            <p>상품명</p>
            <p>가격</p>
          </li>
          <li className="Product_Detail">
            <img
              src="https://picsum.photos/200?random=6"
              alt="sample image"
            ></img>
            <p>상품명</p>
            <p>가격</p>
          </li>
          <li className="Product_Detail">
            <img
              src="https://picsum.photos/200?random=7"
              alt="sample image"
            ></img>
            <p>상품명</p>
            <p>가격</p>
          </li>
          <li className="Product_Detail">
            <img
              src="https://picsum.photos/200?random=8"
              alt="sample image"
            ></img>
            <p>상품명</p>
            <p>가격</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
