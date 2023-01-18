import { useEffect, useState } from "react";
import EmptyReviewContainer from "../Components/ItemDetail/EmptyReviewContainer";
import getItemDetail from "../API/ItemDetail/getItemDetail";
import ProductInfo from "../Components/ItemDetail/productInfo";
import { ItemDetailData } from "../API/ItemDetail/getItemDetail";
import { useParams } from "react-router-dom";
import ProductReview from "../Components/ItemDetail/ProductReview";
import "./Style/itemDetail.css";

const ItemDetail = () => {
  let { itemId } = useParams();

  const productDetailData = async () => {
    const result = await getItemDetail(itemId);
    setDetailPageData(result);
  };

  const [detailPageData, setDetailPageData] = useState<ItemDetailData | null>(
    null
  );

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
        <ProductInfo productInfo={detailPageData?.itemInfo} />
      </div>
      <div className="Item_Contents">
        <img src={`${detailPageData?.itemInfo.contentImageURL}`} />
      </div>
      <div className="Item_Submit">
        <button>장바구니에 추가</button>
        <button>바로 구매</button>
      </div>
      {detailPageData?.reviews && detailPageData.reviews.length !== 0 ? (
        <ProductReview reviewsInfo={detailPageData?.reviews} />
      ) : (
        <EmptyReviewContainer />
      )}
    </div>
  );
};

export default ItemDetail;
