import styled from "styled-components";
import "./Style/product.css";
import { ProductData } from "../../API/ShoppingList/getShoppingList";
import { useEffect, useRef, useCallback, useState } from "react";
import useIntersect from "../../Hooks/useIntersect";

export const ProductImage = styled.img`
  width: 200px;
  height: 200px;
`;

interface Props {
  products: any;
  page: number;
}

export default function Product(props: Props) {

  const [isLoading, setIsLoading] = useState(true);
  const { page } = props;

  // const [_, setRef] = useIntersect((entry: any, observer: any, _page: number) => {
  //   console.log('Inside of userIntersect ', page);
  //   console.log('Inside of useIntersect ', _page);
  //   // props.onLastItemVisiable(_page);
  //   observer.unobserve(entry.target);
  //   observer.observe(entry.target);
  // }, {}, page);

  console.log('on render product ', page)

  return (
    <>
      {props.products&&props.products.map((item:any, index:number) => {
        console.log(item)
        if (index === props.products.length - 1) {
          return (
            <li key={index}>
              <a href={`/itemDetail/${item.itemId}`}>
                <div className="Product_Info">
                  {/* ref={setLastItemRef} */}
                  <ProductImage src={`${item.titleImageURL}`} />
                  <h3> {item.itemTitle} </h3>
                  <p>가격: {item.price}</p>
                </div>
                {/* {isLoading && <p ref={setRef}>Loading...</p>} */}
              </a>
            </li>
          );
        } else {
          return (
            <li key={index}>
              <a href={`/itemDetail/${item.itemId}`}>
                <div key={index} className="Product_Info">
                  <ProductImage src="" />
                  <h3> {item.itemTitle} </h3>
                  <p>가격: {item.price}</p>
                </div>
              </a>
            </li>
          );
        }
      })}
    </>
  );
}

// function detectBottom() {
//   var scrollTop = $(window).scrollTop();
//   var innerHeight = $(window).innerHeight();
//   var scrollHeight = $('body').prop('scrollHeight');
//   if (scrollTop + innerHeight >= scrollHeight) {
//       return true;
//   } else {
//       return false;
//   }
// }
