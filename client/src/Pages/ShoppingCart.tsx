import styled from "styled-components";
import CustomButton from "../Components/Commons/Buttons";
import { useEffect, useState } from "react";
import {
  getShoppingCart,
  CartDataType,
} from "../API/ShoppingCart/getShoppingCart";
import { allDeleteProduct } from "../API/ShoppingCart/deleteProduct";
import { useNavigate } from "react-router-dom";
import CartItemList from "../Components/ShoppingCart/CartItemList";
import { LocalType } from "../Function/payment";
import "./Style/shoppingCart.css";

const BenefitContents = styled.span<{ marginLeft: string }>`
  color: white;
  font-size: 21px;
  margin-left: ${(props) => props.marginLeft};
  margin-right: 10px;
`;

export default function ShoppingCart() {
  const [cartData, setCartData] = useState<CartDataType | null>(null);
  const [render, setRender] = useState(false);
  const navigate = useNavigate();
  const callCartData = async () => {
    const result = await getShoppingCart(accessToken as string);
    setCartData(result);
  };

  const pushProductData = () => {
    const localProductArr: LocalType[] = [];
    cartData &&
      cartData.cart.map((product) => {
        return localProductArr.push({
          itemId: product.itemId,
          itemTitle: product.itemTitle,
          itemImageURL: product.titleImageURL,
          itemTotalPrice: product.itemTotalPrice,
          itemCount: product.itemCount,
        });
      });
    const arrString = JSON.stringify(localProductArr);
    window.sessionStorage.setItem("cartpayment", "true");
    window.sessionStorage.removeItem("itemList");
    window.sessionStorage.setItem("itemList", arrString);
  };
  const itemPriceArr =
    cartData?.cart &&
    cartData?.cart.map((el) => {
      return el.itemTotalPrice;
    });

  const totalResult =
    itemPriceArr && itemPriceArr?.length !== 0
      ? itemPriceArr?.reduce((acc, cur) => {
          return acc + cur;
        })
      : 0;
  const deliveryTotalPrice = (totalResult as number) + 3000;
  const subscribeTotalPrice = (totalResult as number) + 2000;
  const accessToken = sessionStorage.getItem("memberId");
  useEffect(() => {
    callCartData();
  }, []);

  return (
    <div className="Shopping_Cart_Container">
      <div className="Member_Benefits_Info">
        <div className="Benefits_Container">
          <BenefitContents marginLeft="0px">
            혜택정보 | 적립금: {cartData?.memberReserve}원
          </BenefitContents>
          {cartData?.isSubscribed ? (
            <BenefitContents marginLeft="15px">
              프리미엄 구독 진행중!
            </BenefitContents>
          ) : (
            <>
              <BenefitContents marginLeft="15px">
                구독중이 아닙니다
              </BenefitContents>
              <CustomButton
                height="40px"
                fontColor="black"
                fontsize="15px"
                bgColor="var(--gray)"
                content="구독하러 가기"
                width="110px"
                padding="10px"
                onClick={() => navigate(`/members/${accessToken}/subscribe`)}
              />
            </>
          )}
        </div>
      </div>
      <div
        className={
          cartData?.cart[0] !== undefined
            ? "Cart_List_Container"
            : "Empty_List_Container"
        }
      >
        <div className="List_Category_Container">
          <div className="All_Check_Section">
            <div className="Cart_Item_Id">제품번호</div>
            <div className="Cart_Product_Info">제품정보</div>
            <div className="Count_Price_Container">
              <div className="Cart_Product_Count">수량</div>
              <div className="Cart_Product_Price">제품가격</div>
            </div>
          </div>
          {cartData?.cart[0] !== undefined ? (
            <div
              className="Cart_Product_Delete"
              onClick={() => {
                allDeleteProduct(accessToken);
              }}
            >
              전체삭제
            </div>
          ) : (
            <div
              className="Cart_Product_Delete"
              onClick={() => {
                alert("삭제할 품목이 없습니다 🐰");
              }}
            >
              전체삭제
            </div>
          )}
        </div>
        <ul className="Shopping_List_Container">
          {cartData?.cart[0] !== undefined ? (
            <CartItemList
              cartData={cartData}
              accessToken={accessToken}
              setRender={setRender}
              render={render}
            />
          ) : (
            <div className="Empty_List">
              제품이 존재하지 않습니다,
              <a className="List_Navigate" href="/items-list/all">
                여기
              </a>
              를 클릭해서 상품을 구경하세요
            </div>
          )}
        </ul>
      </div>
      <div className="Price_Info_Container">
        <span>제품가격: {totalResult}원</span>
        <span> + 배송비 3,000원</span>
        {cartData?.isSubscribed ? <span> - 구독 1,000원</span> : null}
        {cartData?.isSubscribed ? (
          <span> = 총 {subscribeTotalPrice}원</span>
        ) : (
          <span> = 총 {deliveryTotalPrice}원</span>
        )}
        <div className="Cart_Payment_Button">
          {cartData && cartData.cart.length === 1 ? (
            <CustomButton
              fontsize="13px"
              fontColor="white"
              bgColor="var(--dark3)"
              content="결제하기"
              width="100%"
              height="100%"
              padding="5px"
              onClick={() => {
                pushProductData();
                navigate("/order/checkout");
              }}
            />
          ) : (
            <a href="/items-list/all">제품담으러가기</a>
        )}
        </div>
      </div>
    </div>
  );
}
