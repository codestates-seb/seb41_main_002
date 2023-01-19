import React from "react";
import "./Style/itemDetail.css";

const ItemDetail = () => {
  return (
    <div className="Detail_Container">
      <div className="Item_Container">
        <div className="Item_Img">
          <img src="https://cdn.pixabay.com/photo/2019/04/06/19/22/glass-4108085_960_720.jpg 1x, https://cdn.pixabay.com/photo/2019/04/06/19/22/glass-4108085_1280.jpg" />
        </div>
        <ul className="Item_Described">
          <li>
            <span>제품명</span>
            <p>어머 너무 이뻐요 로션</p>
          </li>
          <li>
            <span>가격</span>
            <p>40,000원</p>
          </li>
          <li>
            <span>카테고리</span>
            <p>로션</p>
          </li>
          <li>
            <span>태그</span>
            <p></p>
          </li>
          <li>
            <span>구매수량</span>
            <p>1</p>
          </li>
          <li>
            <span>별점</span>
            <p>★★★★★</p>
          </li>
          <li>
            <p>본문</p>
          </li>
        </ul>
      </div>
      <div className="Item_Contents"></div>
      <div className="Item_Submit">
        <button>장바구니에 추가</button>
        <button>바로 구매</button>
      </div>
      <div className="Item_Reviews">
        <ul>
          <li>리뷰1</li>
        </ul>
      </div>
    </div>
  );
};

export default ItemDetail;
