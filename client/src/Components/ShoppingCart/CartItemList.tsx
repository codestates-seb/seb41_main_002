import CustomButton from "../Commons/Buttons";
import {
  allDeleteProduct,
  deleteProduct,
} from "../../API/ShoppingCart/deleteProduct";
import "./Style/cartItemList.css";
import { useEffect, useState } from "react";

interface Props {
  cartData: any;
  accessToken: string | null;
  render: boolean;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CartItemList(props: Props) {
  return (
    <>
      {props.cartData && props.cartData.cart.length !== 0 ? (
        props.cartData.cart.map((cartItem: any, index: number) => {
          const productCountHandler = (count: number) => {
            if (cartItem.itemCount === 1 && count < 0) {
            } else {
              cartItem.itemCount = cartItem.itemCount + count;
              cartItem.itemTotalPrice =
                cartItem.itemCount *
                (cartItem.itemTotalPrice /
                  (count > 0
                    ? cartItem.itemCount - 1
                    : cartItem.itemCount + 1));
            }
          };
          const calculateTotalPrice = () => {};
          return (
            <div key={index}>
              <li key={cartItem.itemId} className="Shopping_List_Contents">
                <div className="Product_Container">
                  <div className="Cart_Number">
                    <span>{index + 1}번 제품</span>
                  </div>
                  <div className="Product_Profil">
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
                      <span
                        onClick={() => {
                          productCountHandler(1);
                          calculateTotalPrice();
                          props.setRender(!props.render);
                        }}
                      >
                        🔼
                      </span>
                      <span
                        onClick={() => {
                          productCountHandler(-1);
                          calculateTotalPrice();
                          props.setRender(!props.render);
                        }}
                      >
                        🔽
                      </span>
                    </div>
                    <div className="Product_Count_Container">
                      <span className="Product_Count">
                        수량: {cartItem.itemCount}개
                      </span>
                    </div>
                    <div className="Product_Price_Container">
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
                      deleteProduct(props.accessToken, cartItem.cartItemId);
                    }}
                    fontColor="white"
                    bgColor="var(--dark3)"
                    content="상품삭제"
                    width="100%"
                    padding="5px"
                    height="100%"
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
