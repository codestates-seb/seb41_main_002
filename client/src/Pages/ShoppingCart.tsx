import "./Style/shoppingCart.css";
import styled from "styled-components";
import OrderedListItem from "../Components/Commons/OrderedListItem";

const BenefitContents = styled.span<{ marginLeft: string }>`
  color: black;
  font-size: 21px;
  margin-left: ${(props) => props.marginLeft};
`;

export default function ShoppingCart() {
  // 데이터가 잘 들어가는지 확인하기 위한 더미데이터 => 추후 삭제 예정입니다.
  // 데이터의 내용은 Checkout.tsx의 items와 동일합니다.
  interface ItemInterface {
    name: string;
    price: number;
    count: number;
  }

  const items: ItemInterface[] = [
    { name: "어머 너무 이뻐요 앰플", price: 30000, count: 1 },
    { name: "어머 너무 촉촉해요 앰플", price: 20000, count: 2 },
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
        {/* 추후 map 예정 */}
        <ul className="Shopping_List_Container">
          <li className="Shopping_List_Contents">
            <div className="Product_Check">
              <input type={"checkbox"} /> <span>선택</span>
            </div>
            <div className="Product_Container">
              <div className="Product_Info">
                <img src="" className="List_Product_Image" />
                <a>
                  <span className="List_Product_Name">
                    어머 너무 이뻐요 앰플
                  </span>
                </a>
              </div>
              <div className="Product_Price_Info">
                <span className="Product_Count">수량: 1개</span>
                <span className="Product_Price">가격: 40,000원</span>
              </div>
            </div>
            <div className="Product_Delete">
              <button className="Cart_Delete_Button">상품 삭제</button>
            </div>
          </li>
          {/* 비교를 위해 기존 li 요소를 유지한 채 새로운 li 요소를 추가했습니다. */}
          <li className="Shopping_List_Contents">
            <div className="Product_Check">
              <input type={"checkbox"} /> <span>선택</span>
            </div>
            <div className="Product_Container">
              <div className="Product_Container">
                <OrderedListItem item={items[1]} idx={1} />;
              </div>
            </div>
            <div className="Product_Delete">
              <button className="Cart_Delete_Button">상품 삭제</button>
            </div>
          </li>
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
