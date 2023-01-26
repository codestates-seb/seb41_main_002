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
  const [productCount, setProductCount] = useState([]);
  //추후 로직 변경 예정
  const productTotalPrice: any =
    cartData &&
    cartData?.cart.map((el) => {
      return el.itemTotalPrice;
    });

  const navigate = useNavigate();

  const callCartData = async () => {
    const result = await getShoppingCart(accessToken as string);
    setCartData(result);
  };

  const accessToken = sessionStorage.getItem("memberId");
  //추후 타입수정 예정
  const calculateTotalPrice = (count: number) => {
    productTotalPrice &&
      productTotalPrice.map((el: number) => {
        return el * count;
      });
  };

  useEffect(() => {
    calculateTotalPrice(1);
  }, []);

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
        <div className="All_Check_Section">
          <input type={"checkbox"} />
          <span className="All_Check">전체선택</span>
        </div>
        <ul className="Shopping_List_Container">
          <CartItemList cartData={cartData} accessToken={accessToken} />
        </ul>
      </div>
      <div className="Price_Info_Container">
        <span>제품가격: 원</span>
        <span> + 배송비 4,000원</span>
        <span> - 구독 2,000원</span>
        <span> = 총 42,000원</span>
        <div className="Cart_Payment_Button">
          <button>결제하기</button>
        </div>
      </div>
    </div>
  );
}
