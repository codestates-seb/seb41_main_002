import { useEffect, useState } from "react";
import styled from "styled-components";
import getItemDetail from "../API/ItemDetail/getItemDetail";
import ProductInfo from "../Components/ItemDetail/productInfo";
import { ItemDetailData } from "../API/ItemDetail/getItemDetail";
import { useParams } from "react-router-dom";
import "./Style/itemDetail.css";

const ProductList = styled.li<{ height?: string }>`
  display: flex;
  width: 100%;
  height: ${(props) => (props.height ? props.height : "11%")};
  border-bottom: 1px solid black;
`;

const ItemDetail = () => {
  let { itemId } = useParams();

  const productDetailData = async () => {
    const result = await getItemDetail(itemId);
    setDetailPageData(result);
  };

  const [detailPageData, setDetailPageData] = useState<ItemDetailData | null>(
    null
  );

  console.log(detailPageData?.itemInfo)
  
  useEffect(() => {
    productDetailData();
  }, []);

  return (
    <div className="Detail_Container">
      <div className="Item_Container">
        <img
          className="Item_Img"
          src={`${detailPageData?.itemInfo.titleImageURL}`}
        />
        <ProductInfo productInfo={detailPageData?.itemInfo}/>
      </div>
      <div className="Item_Contents">
        <img  src={`${detailPageData?.itemInfo.contentImageURL}`}/>
      </div>
      <div className="Item_Submit">
        <button>장바구니에 추가</button>
        <button>바로 구매</button>
      </div>
      <div className="Item_Reviews">
        <ul>
          <li>리뷰1</li>
        </ul>
      </div>
    </div>
  );
};

export default ItemDetail;
