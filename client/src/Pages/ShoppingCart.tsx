import styled from "styled-components";
import OrderedListItem from "../Components/Commons/OrderedListItem";
import { useEffect, useState } from "react";
import { getShoppingCart } from "../API/ShoppingCart/getShoppingCart";
import "./Style/shoppingCart.css";
import { CartDataType } from "../API/ShoppingCart/getShoppingCart";

const BenefitContents = styled.span<{ marginLeft: string }>`
  color: black;
  font-size: 21px;
  margin-left: ${(props) => props.marginLeft};
`;

export default function ShoppingCart() {
  const [cartData, setCartData] = useState<CartDataType | undefined>(undefined);

  console.log(cartData?.cart);

  const callCartData = async () => {
    const result = await getShoppingCart(1);
    setCartData(result);
  };

  useEffect(() => {
    callCartData();
  }, []);
  // 데이터가 잘 들어가는지 확인하기 위한 더미데이터 => 추후 삭제 예정입니다.
  // 데이터의 내용은 Checkout.tsx의 items와 동일합니다.
  interface ItemInterface {
    itemId: number;
    itemImageURL: string;
    itemTitle: string;
    itemTotalPrice: number;
    count: number;
  }

  const items: ItemInterface[] = [
    {
      itemId: 1,
      itemImageURL: "https://picsum.photos/75?random=1",
      itemTitle: "어머 너무 이뻐요 앰플",
      itemTotalPrice: 30000,
      count: 1,
    },
    {
      itemId: 2,
      itemImageURL: "https://picsum.photos/75?random=2",
      itemTitle: "개추어 앰플",
      itemTotalPrice: 20000,
      count: 1,
    },
  ];

  return (
    <div className="Shopping_Cart_Container">
      <div className="Member_Benefits_Info">
        <div className="Benefits_Container">
          <BenefitContents marginLeft="0px">
            혜택정보 | 적립금: 30000원
          </BenefitContents>
          <BenefitContents marginLeft="15px">
            프리미엄 구독 진행중!
          </BenefitContents>
        </div>
      </div>
      <div className="Cart_List_Container">
        <div className="All_Check_Section">
          <input type={"checkbox"} />
          <span className="All_Check">전체선택</span>
        </div>
        <ul className="Shopping_List_Container">
          {items&&items.map((cartItem: any) => {
            console.log(cartItem)
            return (
              <li key={cartItem.itemId} className="Shopping_List_Contents">
                <div className="Product_Check">
                  <input type={"checkbox"} /> <span>선택</span>
                </div>
                <div className="Product_Container">
                  <div className="Product_Info">
                    <img src={`${cartItem.itemImageURL}`} className="List_Product_Image" />
                    <a>
                      <span className="List_Product_Name">
                        {cartItem.itemTitle}
                      </span>
                    </a>
                  </div>
                  <div className="Product_Price_Info">
                    <span className="Product_Count">수량: {cartItem.count}개</span>
                    <span className="Product_Price">가격: {cartItem.itemTotalPrice}원</span>
                  </div>
                </div>
                <div className="Product_Delete">
                  <button className="Cart_Delete_Button">상품 삭제</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="Price_Info_Container">
        <span>제품가격: 40,000원</span>
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
