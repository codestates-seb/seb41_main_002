import { useEffect, useState } from "react";
import EmptyReviewContainer from "../Components/ItemDetail/EmptyReviewContainer";
import getItemDetail from "../API/ItemDetail/getItemDetail";
import ProductInfo from "../Components/ItemDetail/productInfo";
import { ItemDetailData } from "../API/ItemDetail/getItemDetail";
import { useParams } from "react-router-dom";
import ProductReview from "../Components/ItemDetail/ProductReview";
import CustomButton from "../Components/Commons/Buttons";
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
  const [productCount, setProductCount] = useState(1);

  // const arr: LocalType[] = [
  //   {
  //     itemId: 1,
  //     itemTitle: "상품이름1",
  //     itemImageURL: "https://picsum.photos/75?random=1",
  //     itemTotalPrice: 30000,
  //     count: 3,
  //   },
  //   {
  //     itemId: 2,
  //     itemTitle: "상품이름2",
  //     itemImageURL: "https://picsum.photos/75?random=2",
  //     itemTotalPrice: 20000,
  //     count: 2,
  //   },
  //   {
  //     itemId: 3,
  //     itemTitle: "상품이름3",
  //     itemImageURL: "https://picsum.photos/75?random=3",
  //     itemTotalPrice: 60000,
  //     count: 6,
  //   },
  // ];

  // const arrString = JSON.stringify(arr);
  // window.localStorage.setItem("itemList", arrString);

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
        <ProductInfo
          productInfo={detailPageData?.itemInfo}
          productCount={productCount}
          setProductCount={setProductCount}
        />
      </div>
      <div className="Item_Contents">
        <img src={`${detailPageData?.itemInfo.contentImageURL}`} />
      </div>
      <div className="Item_Submit">
        <CustomButton
          fontColor="white"
          width="130px"
          bgColor="var(--gray)"
          padding="5px"
          content="장바구니에 추가"
        />
        <CustomButton
          fontColor="white"
          width="130px"
          bgColor="var(--gray)"
          padding="5px"
          content="바로 구매"
        />
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
