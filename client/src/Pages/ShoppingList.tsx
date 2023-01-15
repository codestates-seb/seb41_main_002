import { ShoppingCategoryTab } from "../Components/ShoppingList/CategoryTab";
import Product from "../Components/ShoppingList/Product";
import { getProductList } from "../API/ShoppingList/getShoppingList";
import { ProductData } from "../API/ShoppingList/getShoppingList";
import { Link } from "react-router-dom";
import "./Style/shoppingList.css";
import { useEffect, useRef, useState } from "react";

// ShoppingList에 무한스크롤

// [x] 1) 페이지 처음 진입시 1페이지에 해당되는 검색 결과를 노출한다.
// [ ] 2) 검색 결과 페이지 화면에서 스크롤이 최하단에 위치했을 때, 다음 페이지의 검색 결과를 노출한다.
// [ ] 3) 페이지를 불러 오는동안에는 로딩 화면을 노출해야 한다.
// [ ] 4) ?
//
// 그 외 참고 사항
// 페이지 크기는 16개


export default function ShoppingList() {
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [page, setPage] = useState(1);
  const productList = async () => {
    const result = await getProductList({ categoryENName: "toner", page });
    setProductData(productData.concat(result));
  };
  
  useEffect(() => {
    productList()
  },[page]);

  console.log(productData)
  return (
    <div className="Shopping_List_Container">
      <div className="Shopping_List_Search">
        <input
          type="text"
          placeholder="검색하세요"
          className="Search_Bar"
        ></input>
      </div>
      <div className="Tab_Container">
        <ul className="Tab_List">
          <ShoppingCategoryTab />
        </ul>
      </div>
      <div className="Product_List_Container">
        <ul className="Product_List">
          <Product
            products={productData}
            onLastItemVisiable={() => {
              console.log('setPage');
              setPage(page + 1)
            }}
          />
        </ul>
      </div>
    </div>
  );
}