import { useEffect, useState } from "react";
import EmptyReviewContainer from "../Components/ItemDetail/EmptyReviewContainer";
import getItemDetail from "../API/ItemDetail/getItemDetail";
import ProductInfo from "../Components/ItemDetail/productInfo";
import { ItemDetailDataType } from "../API/ItemDetail/getItemDetail";
import { useNavigate, useParams } from "react-router-dom";
import ProductReview from "../Components/ItemDetail/ProductReview";
import CustomButton from "../Components/Commons/Buttons";
import "./Style/itemDetail.css";

const ItemDetail = () => {
  let { itemId } = useParams();

  const productDetailData = async () => {
    const result = await getItemDetail(itemId);
    setDetailPageData(result);
  };

  const [detailPageData, setDetailPageData] =
    useState<ItemDetailDataType | null>(null);
  //추후 count 로직 리팩토링 예정
  const [productCount, setProductCount] = useState(0);
  const [productTotalPrice, setProductTotalPrice] = useState(0);

  const calculateTotalPrice = () => {
    //추후 타입 리팩토링 예정
    const result: any =
      detailPageData && detailPageData?.itemInfo.price * productCount;
    setProductTotalPrice(result);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [productCount]);

  const navigate = useNavigate();
  const sendProductSaleInfo = () => {
    if (productCount !== 0) {
      const productSaleInfo = [
        {
          itemId: detailPageData && detailPageData?.itemInfo.itemId,
          itemTitle: detailPageData && detailPageData.itemInfo.itemTitle,
          itemImageURL: detailPageData && detailPageData.itemInfo.titleImageURL,
          itemTotalPrice:
            detailPageData && detailPageData.itemInfo.price * productCount,
          itemCount: productCount,
        },
      ];
      window.sessionStorage.removeItem("cartpayment");
      window.sessionStorage.removeItem("itemList");
      const result = JSON.stringify(productSaleInfo);
      window.sessionStorage.setItem("itemList", result);
      navigate(`/order/checkout`);
    } else {
      alert("제품 수량을 확인해주세요 🐰");
    }
  };

  const session = sessionStorage.getItem("memberId");

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
          session={session}
          navigate={navigate}
          sendProductSaleInfo={sendProductSaleInfo}
          productTotalPrice={productTotalPrice}
          detailPageData={detailPageData}
          productInfo={detailPageData?.itemInfo}
          productCount={productCount}
          setProductCount={setProductCount}
        />
      </div>
      <div className="Item_Contents">
        <img src={`${detailPageData?.itemInfo.contentImageURL}`} />
      </div>
      {/* <div className="Item_Submit">
      </div> */}
      {detailPageData?.reviews && detailPageData.reviews.length !== 0 ? (
        <ProductReview reviewsInfo={detailPageData?.reviews} />
      ) : (
        <EmptyReviewContainer />
      )}
    </div>
  );
};

export default ItemDetail;
