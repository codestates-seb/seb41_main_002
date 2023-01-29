import "./Style/shoppingPage.css";
import {
  getProductList,
  getMemberTagList,
} from "../API/ShoppingList/getShoppingList";
import { useEffect, useRef, useState } from "react";
import { ShoppingCategoryTab } from "../Components/ShoppingList/CategoryTab";
import styled from "styled-components";

export const ProductImage = styled.img`
  width: 200px;
  height: 200px;
`;

interface ProductProps {
  itemId: number;
  itmeTitle: string;
  price: number;
  titleImageURL: string;
}

interface ProductListProps {
  products: ProductProps[];
}

const ProductList = (props: ProductListProps) => {
  return (
    <>
      {props.products.length === 0
        ? []
        : props.products.map((item, index) => (
            <li key={index}>
              <a href={`/itemDetail/${item.itemId}`}>
                <div className="Shopping_Product_Info">
                  <ProductImage src={`${item.titleImageURL}`} />
                  <h4> {item.itmeTitle} </h4>
                  <p>가격: {item.price}</p>
                </div>
              </a>
            </li>
          ))}
    </>
  );
};

const getProducts = async (
  categoryName: string,
  custom: boolean,
  page = 0,
  keyword = "",
  accessToken? : string|null
): Promise<ProductProps[]> => {
  const results = await getProductList({
    categoryENName: categoryName,
    custom,
    page,
    keyword,
    accessToken
  });
  return results.map((item) => ({
    itemId: item.itemId,
    itmeTitle: item.itemTitle,
    price: item.price,
    titleImageURL: item.titleImageURL,
  }));
};

export default function ShoppingPage() {
  const [categoryParam, setCategoryParams] = useState("all");
  const [isCustom, setIsCustom] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [memberTagData, setMemberTagData] = useState<any>(null);
  const [fetchingStatus, setFetchingStatus] = useState<boolean>(false);
  const [serchWord, setSerchWord] = useState("");
  const [lock, setLock] = useState<boolean>(false);
  const bottomRef = useRef(null);
  const accessToken = sessionStorage.getItem("accessToken");
  const session = sessionStorage.getItem("memberId");
  const fetchMemberTagData = async () => {
    const result = await getMemberTagList({
      categoryENName: categoryParam,
      custom: isCustom,
      page: pageNumber,
      keyword: serchWord,
      accessToken: accessToken,
    });
    setMemberTagData(result);
  };

  useEffect(() => {
    fetchMemberTagData();
  },[]);
  
  useEffect(() => {
    setProducts([]);
    setLock(false);
    setPageNumber(1);
  }, [categoryParam, serchWord]);


  useEffect(() => {
    fetchProducts();
  }, [pageNumber, isCustom]);

  const fetchProducts = async () => {
    setFetchingStatus(true);
    let newProducts: ProductProps[] = [...products];
    const fetchedProducts = await getProducts(
      categoryParam,
      isCustom,
      pageNumber,
      serchWord,
      accessToken,
    );
    if (fetchedProducts.length === 0) {
      setLock(true);
    } else {
      newProducts = newProducts.concat(fetchedProducts);
      setProducts(newProducts);
      setFetchingStatus(false);
    }
  };
  
  const tabChangeFetch = async () => {
    const result = await getProducts(
      categoryParam,
      isCustom,
      pageNumber,
      serchWord
      );
      return result;
    };


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (lock === true) {
          return;
        }
        setPageNumber(pageNumber + 1);
      }
    });
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, [products]);

  const serchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      tabChangeFetch();
    }
  };

  return (
    <div>
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
              serchWord={serchWord}
              pageNumber={pageNumber}
              memberTagData={memberTagData}
            />
          </ul>
        </div>
        <div className="Product_List_Container">
          <ul className="Product_List">
            <ProductList products={products} />
          </ul>
        </div>
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
