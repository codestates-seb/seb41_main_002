import "./Style/cartItemList.css";

interface Props {
  cartData: any;
}

export default function CartItemList(props: Props) {
  return (
    <>
      {props.cartData && props.cartData.cart.length !==0 ?
        props.cartData.cart.map((cartItem: any) => {
          return (
            <>
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
                    <button className="Cart_Delete_Button">상품 삭제</button>
                  </div>
                </li>
            </>
          );
        }): <div className="Empty_Cart">장바구니가 비어있습니다.</div>}
    </>
  );
}
