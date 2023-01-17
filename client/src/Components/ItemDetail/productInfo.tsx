import styled from "styled-components";
import TypeBadge from "../Commons/TypeBadge";

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
  productInfo: ItemType | undefined;
}

export default function ProductInfo(props: Props) {
  console.log(props.productInfo);

  const tagList = (tags: string) => {
    switch (tags) {
      case "지성":
        return (
          <TypeBadge
            bgColor="black"
            padding="5px"
            fontSize="11px"
            content={`${tags}`}
          />
        );
      case "건성":
        return (
          <TypeBadge
            bgColor="gray"
            padding="5px"
            fontSize="11px"
            content={`${tags}`}
          />
        );
      case "복합성":
        return (
          <TypeBadge
            bgColor="Pink"
            padding="5px"
            fontSize="11px"
            content={`${tags}`}
          />
        );
      case "미백":
        return (
          <TypeBadge
            bgColor="red"
            padding="5px"
            fontSize="11px"
            content={`${tags}`}
          />
        );
      case "주름":
        return (
          <TypeBadge
            bgColor="blue"
            padding="5px"
            fontSize="11px"
            content={`${tags}`}
          />
        );
      case "여드름성":
        return (
          <TypeBadge
            bgColor="gold"
            padding="5px"
            fontSize="11px"
            content={`${tags}`}
          />
        );
      case "일반피부":
        return (
          <TypeBadge
            bgColor="yellow"
            padding="5px"
            fontSize="11px"
            content={`${tags}`}
          />
        );
    }
  };
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
                return <>{tagList(tags)}</>;
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
          <ContentsContainer>{/* rating 컴포넌트 */}</ContentsContainer>
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
