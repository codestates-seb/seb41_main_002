import { TopProductData } from "../../API/ItemTopList/getTopList";
import { ProductImage } from "../ShoppingList/Product";
import "./Style/topProductList.css"
// 추후 리팩토링 예정
interface Props {
  topProductData: any;
}

export default function TopProductList(props: Props) {
  return (
    <>
      {props.topProductData&&props.topProductData.map((product:any)=>{
        return(
          <li key={product.itemId}>
             <a href={`/itemDetail/${product.itemId}`}>
                <div className="Product_Info">
                  <ProductImage src={`${product.titleImageURL}`} />
                  <h4 className="Product_Title"> {product.itemTitle} </h4>
                  <p>가격: {product.price}원</p>
                </div>
              </a>
          </li>
        )
      })}
    </>
  );
}
