import CustomButton from "../Commons/Buttons";
import { deleteProduct } from "../../API/ShoppingCart/deleteProduct";
import "./Style/cartItemList.css";
import { NavigateFunction } from "react-router-dom";

interface Props {
  cartData: any;
  accessToken: string | null;
}

export default function CartItemList(props: Props) {
  return (
    <>
      {props.cartData && props.cartData.cart.length !== 0 ? (
        props.cartData.cart.map((cartItem: any, index: number) => {
          return (
            <div key={index}>
              <li key={cartItem.itemId} className="Shopping_List_Contents">
                <div className="Product_Check">
                  <input type={"checkbox"} /> <span>선택</span>
                </div>
                <div className="Product_Container">
                  <div className="Product_Info">
                    <img
                      src={`${cartItem.titleImageURL}`}
                      className="List_Product_Image"
                    />
                    <a>
                      <span className="List_Product_Name">
                        {cartItem.itemTitle}
                      </span>
                    </a>
                  </div>
                  <div className="Product_Price_Info">
                    <div className="Count_Change">
                      <span>🔼</span>
                      <span>🔽</span>
                    </div>
                    <div>
                      <span className="Product_Count">
                        수량: {cartItem.itemCount}개
                      </span>
                    </div>
                    <div>
                      <span className="Product_Price">
                        가격: {cartItem.itemTotalPrice}원
                      </span>
                    </div>
                  </div>
                </div>
                <div className="Product_Delete">
                  <CustomButton
                    //추후 memberId로 변경될 예정
                    onClick={() => {
                      deleteProduct(props.accessToken);
                    }}
                    fontColor="white"
                    bgColor="var(--dark3)"
                    content="상품삭제"
                    width="100%"
                    padding="5px"
                  />
                </div>
              </li>
            </div>
          );
        })
      ) : (
        <div className="Empty_Cart">장바구니가 비어있습니다.</div>
      )}
    </>
  );
}
