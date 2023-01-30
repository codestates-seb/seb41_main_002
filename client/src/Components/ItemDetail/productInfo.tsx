import styled from "styled-components";
import { Rating } from "../Commons/Rating";
import { SkinTag } from "../Commons/TypeBadge";
import CustomButton from "../Commons/Buttons";
import { ItemDetailDataType } from "../../API/ItemDetail/getItemDetail";
import "./Style/productInfo.css";
import { addCartItem } from "../../API/ItemDetail/addCartItem";
import { NavigateFunction } from "react-router-dom";

const ProductList = styled.li<{ height?: string; borderBtm?: string }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${(props) => (props.height ? props.height : "11%")};
  border-bottom: ${(props) =>
    props.borderBtm ? props.borderBtm : "1px solid black"};
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  border-right: 1px solid black;
  height: 100%;
  width: 20%;

  & > span {
    display: flex;
    align-items: center;
    font-size: 19px;
  }
`;

const ContentsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  height: 100%;
  align-items: center;

  & > span {
    font-size: 19px;
  }
`;

const CountContainer = styled(ContentsContainer)`
  justify-content: space-evenly;
`

interface ItemType {
  itemId: number;
  itemTitle: string;
  categoryKRName: string;
  titleImageURL: string;
  contentImageURL: string;
  content: string;
  price: number;
  tagList: string[];
  rating: number;
}

interface Props {
  productInfo?: ItemType;
  productCount: number;
  setProductCount: React.Dispatch<React.SetStateAction<number>>;
  detailPageData: ItemDetailDataType | null;
  session: string | null;
  productTotalPrice: number;
  sendProductSaleInfo: () => void;
  navigate: NavigateFunction;
}

export default function ProductInfo(props: Props) {
  const ratingCount = props.productInfo?.rating as number;
  return (
    <>
      <ul className="Item_Described">
        <ProductList>
          <TitleContainer>
            <span>제품명</span>
          </TitleContainer>
          <ContentsContainer>
            <span>{props.productInfo?.itemTitle}</span>
          </ContentsContainer>
        </ProductList>
        <ProductList>
          <TitleContainer>
            <span>가격</span>
          </TitleContainer>
          <ContentsContainer>
            <span>{props.productInfo?.price} 원</span>
          </ContentsContainer>
        </ProductList>
        <ProductList>
          <TitleContainer>
            <span>카테고리</span>
          </TitleContainer>
          <ContentsContainer>
            <span>{props.productInfo?.categoryKRName}</span>
          </ContentsContainer>
        </ProductList>
        <ProductList>
          <TitleContainer>
            <span>추천타입</span>
          </TitleContainer>
          <ContentsContainer>
            {props.productInfo &&
              props.productInfo?.tagList.map((tags) => {
                return <div key={tags}>{SkinTag(tags)}</div>;
              })}
          </ContentsContainer>
        </ProductList>
        <ProductList>
          <TitleContainer>
            <span>별점</span>
          </TitleContainer>
          <ContentsContainer>
            <div className="Rating_Container">
              <Rating
                starRating={ratingCount}
                ratingSetting={{ ratingEdit: false, ratingSize: 30 }}
              />
            </div>
          </ContentsContainer>
        </ProductList>
        <ProductList height="24.9%">
          <TitleContainer>
            <span>본문</span>
          </TitleContainer>
          <ContentsContainer>
            <span>{props.productInfo?.content}</span>
          </ContentsContainer>
        </ProductList>
        <ProductList height="20%" borderBtm="none">
          <TitleContainer>
            <span>구매 수량</span>
          </TitleContainer>
          <CountContainer>
            <div className="Count_Container">
              <div className="Count_Handle_Container">
                <span
                  onClick={() => props.setProductCount(props.productCount + 1)}
                >
                  🔼
                </span>
                {props.productCount === 0 ? (
                  <span>🔽</span>
                ) : (
                  <span
                    onClick={() =>
                      props.setProductCount(props.productCount - 1)
                    }
                  >
                    🔽
                  </span>
                )}
              </div>
              <span className="Product_Total_Count">
                {props.productCount} 개
              </span>
            </div>
            {props.session && props.session ? (
              <div>
                <CustomButton
                  marginRight="10px"
                  height="40px"
                  fontColor="white"
                  width="130px"
                  bgColor="var(--gray)"
                  padding="5px"
                  content="장바구니에 추가"
                  onClick={() => {
                    addCartItem({
                      itemId: props.detailPageData?.itemInfo.itemId,
                      memberId: props.session && props.session,
                      itemCount: props.productCount,
                      itemTotalPrice: props.productTotalPrice,
                    });
                  }}
                />
                <CustomButton
                  height="40px"
                  fontColor="white"
                  width="130px"
                  bgColor="var(--gray)"
                  padding="5px"
                  content="바로 구매"
                  onClick={() => {
                    props.sendProductSaleInfo();
                  }}
                />
              </div>
            ) : (
              <div>
                <CustomButton
                  marginRight="10px"
                  height="40px"
                  fontColor="white"
                  width="130px"
                  bgColor="var(--gray)"
                  padding="5px"
                  content="장바구니에 추가"
                  onClick={() => {
                    props.navigate(`/login`);
                  }}
                />
                <CustomButton
                  height="40px"
                  fontColor="white"
                  width="130px"
                  bgColor="var(--gray)"
                  padding="5px"
                  content="바로 구매"
                  onClick={() => {
                    props.navigate(`/login`);
                  }}
                />
              </div>
            )}
          </CountContainer>
        </ProductList>
      </ul>
    </>
  );
}
