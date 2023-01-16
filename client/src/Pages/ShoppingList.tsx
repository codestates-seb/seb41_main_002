import { ShoppingCategoryTab } from "../Components/ShoppingList/CategoryTab";
import Product from "../Components/ShoppingList/Product";
import { getProductList } from "../API/ShoppingList/getShoppingList";
import { ProductData } from "../API/ShoppingList/getShoppingList";
import { Link } from "react-router-dom";
import "./Style/shoppingList.css";
import React, { useEffect, useRef, useState } from "react";

export default function ShoppingList() {
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [page, setPage] = useState(1);
  const [categoryParam, setCategoryParams] = useState("all");
  const [isCustom, setIsCustom] = useState(false);
  const [serchWord, setSerchWord] = useState("");
  const productList = async () => {
    const result = await getProductList({
      categoryENName: categoryParam,
      page: page,
      custom: isCustom,
      keyword: serchWord,
    });
    setProductData(productData.concat(result));
  };

  const serchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      productList();
    }
  };

  useEffect(() => {
    productList();
  }, [page, categoryParam, isCustom]);

  // 더미 session
  const session = {
    memberId: 1,
    accountId: "abc",
  };
  // 추후 데이터 접근 확인 필요
  const userTagInfo = productData[0] && productData[0].member.memberTagsList;

  return (
    <div className="Shopping_List_Container">
      <div className="Shopping_List_Search">
        <input
          type="text"
          placeholder="검색하세요"
          className="Search_Bar"
          defaultValue={serchWord}
          onChange={(e) => setSerchWord(e.target.value)}
          onKeyUp={(e) => {
            if (serchWord.length !== 0) {
              serchSubmit(e);
            } else {
              alert("검색어를 입력해주세요!");
            }
          }}
        />
      </div>
      <div className="Tab_Container">
        <ul className="Tab_List">
          <ShoppingCategoryTab
            setCategoryParams={setCategoryParams}
            setIsCustom={setIsCustom}
            isCustom={isCustom}
            session={session}
            userTagInfo={userTagInfo}
          />
        </ul>
      </div>
      <div className="Product_List_Container">
        <ul className="Product_List">
          <Product
            products={productData}
            onLastItemVisiable={() => {
              console.log("setPage");
              setPage(page + 1);
            }}
          />
        </ul>
      </div>
    </div>
  );
}
