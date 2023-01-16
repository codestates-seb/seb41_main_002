import { TopProductData } from "../../API/ItemTopList/getTopList";
import { ProductImage } from "../ShoppingList/Product";
interface Props {
  topProductData: TopProductData[];
}

export default function TopProductList(props: Props) {
  
  return (
    <>
      {props.topProductData&&props.topProductData.map((product)=>{
        console.log(product)
        return(
          <li key={product.itemId}>
             <a href={`/itemDetail/${product.itemId}`}>
                <div className="Product_Info">
                  <ProductImage src="" />
                  <h3> {product.itemTitle} </h3>
                  <p>가격: {product.price}</p>
                </div>
              </a>
          </li>
        )
      })}
    </>
  );
}
