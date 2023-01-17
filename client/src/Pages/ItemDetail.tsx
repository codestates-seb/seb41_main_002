import React, { useState } from "react";
import styled from "styled-components";
import TypeBadge from "../Components/Commons/TypeBadge";
import "./Style/itemDetail.css";

interface ProductProps {
  height?: string;
}

const ProductList = styled.li<ProductProps>`
  display: flex;
  width: 100%;
  height: ${(props) => (props.height ? props.height : "11%")};
  border-bottom: 1px solid black;
`;

const ItemDetail = () => {
  const [detailPageData, setDetailPageData] = useState({})
  

  return (
    <div className="Detail_Container">
      <div className="Item_Container">
        <img
          className="Item_Img"
          src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202112/16/4ab8f74f-79e5-4c14-bdbe-efe62f05b6ee.jpg"
        />
        <ul className="Item_Described">
          <ProductList></ProductList>
          <ProductList></ProductList>
          <ProductList></ProductList>
          <ProductList></ProductList>
          <ProductList></ProductList>
          <ProductList></ProductList>
          <ProductList></ProductList>
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
