import "./Style/shoppingList.css";
import { getProductList } from "../API/ShoppingList/getShoppingList";
import { useEffect, useRef, useState } from "react";

interface ProductProps {
  itemId: number;
  itmeTitle: string;
  price: number;
  titleImageURL: string;
}

interface ProductListProps {
  products: ProductProps[];
  onBottomReached: () => void;
}

const ProductList = (props: ProductListProps) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(props.onBottomReached);
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, [bottomRef]);

  return (
    <div>
      {props.products.length === 0
        ? []
        : props.products.map((item) => (
            <div
              key={item.itemId}
              style={{ width: "100%", marginTop: 75, marginBottom: 75 }}
            >
              <div>
                <img src={item.titleImageURL} />
                <h3> {item.itmeTitle} </h3>
                <p>가격: {item.price}</p>
              </div>
            </div>
          ))}
      <div ref={bottomRef}> 최하단 </div>
    </div>
  );
};

const getProducts = async (
  categoryName: string,
  custom: boolean,
  page = 0,
  keyword = ""
): Promise<ProductProps[]> => {
  if (page === 0) {
    return [];
  }
  const results = await getProductList({
    categoryENName: categoryName,
    custom,
    page,
    keyword,
  });
  return results.map((item) => ({
    itemId: item.itemId,
    itmeTitle: item.itemTitle,
    price: item.price,
    titleImageURL: item.titleImageURL,
  }));
};

export default function ShoppingPage() {
  /**
   * 1) 상품 리스트를 렌더링 할 수 있도록 컴포넌트를 구현한다 (OK)
   * 2) 상품 리스트 데이터를 서버에서 가져와서 컴포넌트로 전달 할 수 있도록 한다. (OK)
   * 3) 상품 리스트의 최하단에 도착했을 때를 포착한다. (OK)
   * 4) 최하단에 도착했음을 포착했을 때, 서버에서 새로운 데이터를 가져온다.
   * 5) 새로운 데이터를 가져왔을 때, 상품 리스트 데이터를 갱신한다.
   */

  const [pageNumber, setPageNumber] = useState<number>(0);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [fetchingStatus, setFetchingStatus] = useState<boolean>(false);
  const [inited, setInited] = useState<boolean>(false);

  const setProductsData = async () => {
    console.log("####### Debug #######");

    console.log("### products");
    console.log(products);

    console.log("### page");
    console.log(pageNumber);

    console.log("### fetching status");
    console.log(fetchingStatus);

    console.log("#####################");
    if (fetchingStatus || !inited) {
      try {
        let newProducts: ProductProps[] = [];
        const fetchedProducts = await getProducts("all", false, pageNumber);

        newProducts = newProducts.concat(products);
        newProducts = newProducts.concat(fetchedProducts);

        console.log('newProducts');
        console.log(newProducts);

        setProducts(newProducts);
        setFetchingStatus(false);
        setInited(true)
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (!inited) {
      setProductsData()
    }
  }, [inited])

  /* useEffect(() => {
    setProductsData();
  }, [pageNumber, products]); */

  return (
    <div>
      <div className="Product_List_Container">
        <ProductList
          products={products}
          onBottomReached={() => {
            console.log("onBottomReached");
            if (!fetchingStatus) {
                console.log("increment page");
                console.log(pageNumber);
                setFetchingStatus(true);
                setPageNumber(pageNumber + 1);
            }
          }}
        />
      </div>
    </div>
  );
}
