import styled from "styled-components";
import { ProductImage } from "../../Pages/ShoppingPage";
import "./Style/topProductList.css";
// 추후 리팩토링 예정
interface Props {
  topProductData: any;
}

export default function TopProductList(props: Props) {
  return (
    <>
      {props.topProductData &&
        props.topProductData.map((product: any) => {
          return (
            <li key={product.itemId}>
              <a href={`/itemDetail/${product.itemId}`}>
                <div className="Shopping_Product_Info">
                  <ProductImage src={`${product.titleImageURL}`} />
                  <div className="Product_Text_Container">
                    <h4 className="Product_Title_Content">
                      {product.itemTitle}{" "}
                    </h4>
                    <p className="Product_Price_Content">
                      가격: {product.price}원
                    </p>
                  </div>
                </div>
              </a>
            </li>
          );
        })}
    </>
  );
}
