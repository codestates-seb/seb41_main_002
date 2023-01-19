import { useEffect, useState } from "react";
import EmptyReviewContainer from "../Components/ItemDetail/EmptyReviewContainer";
import getItemDetail from "../API/ItemDetail/getItemDetail";
import ProductInfo from "../Components/ItemDetail/productInfo";
import { addCartItem } from "../API/ItemDetail/addCartItem";
import { ItemDetailData } from "../API/ItemDetail/getItemDetail";
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

  const [detailPageData, setDetailPageData] = useState<ItemDetailData | null>(
    null
  );
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
    const productSaleInfo = [
      {
        itemId: detailPageData && detailPageData?.itemInfo.itemId,
        itemTitle: detailPageData && detailPageData.itemInfo.itemTitle,
        itemImageURL: detailPageData && detailPageData.itemInfo.titleImageURL,
        itemTotalPrice: detailPageData && detailPageData.itemInfo.price,
        count: productCount,
      },
    ];
    const result = JSON.stringify(productSaleInfo);
    return window.localStorage.setItem("itemList", result);
  };

  //추후 session으로 변경예정
  const session = { memberId: 1, accountId: "kmklhy" };

  console.log(productTotalPrice)

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
        {session && session ? (
          <>
            <CustomButton
              fontColor="white"
              width="130px"
              bgColor="var(--gray)"
              padding="5px"
              content="장바구니에 추가"
              onClick={() => {
                addCartItem({
                  itemId: detailPageData?.itemInfo.itemId,
                  memberId: session && session.memberId,
                  itemCount: productCount,
                  itemTotalPrice: productTotalPrice,
                });
              }}
            />
            <CustomButton
              fontColor="white"
              width="130px"
              bgColor="var(--gray)"
              padding="5px"
              content="바로 구매"
              onClick={() => {
                sendProductSaleInfo();
                navigate(`/checkout`);
              }}
            />
          </>
        ) : (
          <>
            <CustomButton
              fontColor="white"
              width="130px"
              bgColor="var(--gray)"
              padding="5px"
              content="장바구니에 추가"
              onClick={() => {
                navigate(`/login`);
              }}
            />
            <CustomButton
              fontColor="white"
              width="130px"
              bgColor="var(--gray)"
              padding="5px"
              content="바로 구매"
              onClick={() => {
                navigate(`/login`);
              }}
            />
          </>
        )}
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
