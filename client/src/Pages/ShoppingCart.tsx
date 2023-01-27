import styled from "styled-components";
import CustomButton from "../Components/Commons/Buttons";
import { useEffect, useState } from "react";
import { getShoppingCart } from "../API/ShoppingCart/getShoppingCart";
import "./Style/shoppingCart.css";
import { CartDataType } from "../API/ShoppingCart/getShoppingCart";
import { useNavigate } from "react-router-dom";
import CartItemList from "../Components/ShoppingCart/CartItemList";

const BenefitContents = styled.span<{ marginLeft: string }>`
  color: black;
  font-size: 21px;
  margin-left: ${(props) => props.marginLeft};
`;

export default function ShoppingCart() {
  const [cartData, setCartData] = useState<CartDataType | null>(null);
  const [render, setRender] = useState(false);
  const [allPrice, setAllPrice] = useState(0);

  const navigate = useNavigate();

  const callCartData = async () => {
    const result = await getShoppingCart(accessToken as string);
    setCartData(result);
  };

  const resultArr =
    cartData?.cart &&
    cartData?.cart.map((el) => {
      return el.itemTotalPrice;
    });

  const totalResult = resultArr?.reduce((acc, cur) => {
    return acc + cur;
  });

  const deliveryTotalPrice = (totalResult as number) + 3000;
  const subscribeTotalPrice = (totalResult as number) + 2000;

  console.log(subscribeTotalPrice);

  const accessToken = sessionStorage.getItem("memberId");
  //추후 타입수정 예정
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
      <div className="Cart_List_Container">
        <div className="List_Category_Container">
        <div className="All_Check_Section">
          <div className="Cart_Item_Id">제품번호</div>
          <div className="Cart_Product_Info">제품정보</div>
          <div className="Count_Price_Container">
            <div className="Cart_Product_Count">수량</div>
            <div className="Cart_Product_Price">제품가격</div>
          </div>
        </div>
          <div className="Cart_Product_Delete">삭제</div>
        </div>
        <ul className="Shopping_List_Container">
          <CartItemList
            cartData={cartData}
            accessToken={accessToken}
            setRender={setRender}
            render={render}
          />
        </ul>
      </div>
      <div className="Price_Info_Container">
        <span>제품가격: {totalResult}원</span>
        <span> + 배송비 3,000원</span>
        {cartData?.isSubscribed ? <span> - 구독 1,000원</span> : null}
        {cartData?.isSubscribed ? <span> = 총 {subscribeTotalPrice}원</span> : <span> = 총 {deliveryTotalPrice}원</span>}
        <div className="Cart_Payment_Button">
          <button>결제하기</button>
        </div>
      </div>
    </div>
  );
}
