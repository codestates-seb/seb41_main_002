import { useState } from "react";
import styled from "styled-components";
import productList from "../../data/shoppingList.json";
import "./Style/product.css";

const ProductImage = styled.img`
  width: 200px;
  height: 200px;
`;

export default function Product() {
  const [getProductData, setGetProductData] = useState(productList.cosmetics);

  console.log(getProductData);
  return (
    <>
      {getProductData &&
        getProductData.map((product, index) => {
          return (
              <li className="Product_Info" key={index}>
                <ProductImage src={`${product.titleImageURL}`} />
                <h2>{product.itemTitle}</h2>
                <h3>{product.price}</h3>
              </li>
          );
        })}
    </>
  );
}