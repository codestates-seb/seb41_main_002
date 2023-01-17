import styled from "styled-components";
import Rating from "../Commons/Rating";
import { SkinTag } from "../Commons/TypeBadge";
import "./Style/productInfo.css"

const ProductList = styled.li<{ height?: string }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${(props) => (props.height ? props.height : "11%")};
  border-bottom: 1px solid black;
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
}

export default function ProductInfo(props: Props) {
  const ratingCount = props.productInfo?.rating as number
  console.log(props.productInfo);
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
                return <>{SkinTag(tags)}</>;
              })}
          </ContentsContainer>
        </ProductList>
        <ProductList>
          <TitleContainer>
            <span>구매 수량</span>
          </TitleContainer>
          <ContentsContainer>
            <span>1개</span>
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
        <ProductList height="34%">
          <TitleContainer>
            <span>본문</span>
          </TitleContainer>
          <ContentsContainer>
            <span>{props.productInfo?.content}</span>
          </ContentsContainer>
        </ProductList>
      </ul>
    </>
  );
}
