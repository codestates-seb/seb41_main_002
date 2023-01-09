import React, { useState } from "react";
import "./Style/ItemsTopList.css";

export default function ItemsTopList() {
  // 해당 상태의 기본값은 이전 페이지에서 이동할 때 전달받는 방식을 채택 예정
  // 현재는 첫 번째 카테고리인 "토너"를 기본값을 설정
  const [category, setCategory] = useState<string>("토너");
  const changeCategory = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const button: HTMLButtonElement = event.currentTarget;
    setCategory(button.name);
  };
  return (
    <div>
      <h2 className="Top_List_Title">이 달의 Top 10 {category}</h2>
      <ul className="Filter_Options">
        <li>
          <button
            className="Filter_Button"
            onClick={changeCategory}
            name="토너"
          >
            토너
          </button>
        </li>
        <li>
          <button
            className="Filter_Button"
            onClick={changeCategory}
            name="에센스"
          >
            에센스
          </button>
        </li>
        <li>
          <button
            className="Filter_Button"
            onClick={changeCategory}
            name="로션"
          >
            로션
          </button>
        </li>
        <li>
          <button
            className="Filter_Button"
            onClick={changeCategory}
            name="크림"
          >
            크림
          </button>
        </li>
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
