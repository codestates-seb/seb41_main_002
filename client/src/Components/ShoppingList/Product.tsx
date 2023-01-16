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
  products: ProductData[];
  onLastItemVisiable: () => void;
}

export default function Product(props: Props) {
  // const lastItemRef = useRef(null);
  // const setLastItemRef = useCallback((node: any) => {
  //   lastItemRef.current = node;
  //   if (node) {
  //     const observer = new IntersectionObserver(([entry]) => {
  //       if (entry.isIntersecting) {
  //         console.log("isIntersecting: " + entry.isIntersecting);
  //         props.onLastItemVisiable();
  //       }
  //     });
  //     if (lastItemRef.current) {
  //       observer.observe(lastItemRef.current);
  //     }
  //   }
  // }, []);

  const [isLoading, setIsLoading] = useState(true);

  const [_, setRef] = useIntersect((entry: any, observer: any) => {
    props.onLastItemVisiable();
    observer.unobserve(entry.target);
    observer.observe(entry.target);
  }, {});

  return (
    <>
      {props.products.map((item, index) => {
        if (index === props.products.length - 1) {
          return (
            <li key={index}>
              <a href={`/itemDetail/${item.itemId}`}>
                <div className="Product_Info">
                  {/* ref={setLastItemRef} */}
                  <ProductImage src="" />
                  <h3> {item.itemTitle} </h3>
                  <p>가격: {item.price}</p>
                </div>
                {isLoading && <p ref={setRef}>Loading...</p>}
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
