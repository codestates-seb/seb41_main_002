import "./Style/shoppingCart.css";
import styled from "styled-components";

const BenefitContents = styled.span<{ marginLeft: string }>`
  color: black;
  font-size: 21px;
  margin-left: ${(props) => props.marginLeft};
`;

export default function ShoppingCart() {
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
                <span className="List_Product_Name">어머 너무 이뻐요 앰플</span>
              </div>
              <div className="Product_Price_Info">
                <span className="Product_Count">수량: 1개</span>
                <span className="Product_Price">가격: 40,000원</span>
              </div>
            </div>
            <div className="Product_Delete"><button className="Cart_Delete_Button">상품 삭제</button></div>
          </li>
        </ul>
      </div>
    </div>
  );
}