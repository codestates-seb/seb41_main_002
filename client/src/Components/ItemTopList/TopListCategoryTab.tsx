import React from "react";
import { useState } from "react";
import CustomButton from "../Commons/Buttons";

interface Props {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setCategoryENName: React.Dispatch<React.SetStateAction<string>>;
  session: {
    memberId: number;
    accountId: string;
  };
}

export default function TopListCategoryTab(props: Props) {
  const [activateTag, setActivateTage] = useState(0);
  const [customCheck, setCustomCheck] = useState(false);
  interface Category {
    categoryENName: string;
    categoryKRName: string;
  }

  const categoryTitle: Array<Category> = [
    {
      categoryKRName: "전체",
      categoryENName: "all",
    },
    {
      categoryKRName: "토너",
      categoryENName: "toner",
    },
    {
      categoryKRName: "크림",
      categoryENName: "cream",
    },
    {
      categoryKRName: "로션",
      categoryENName: "lotion",
    },
    {
      categoryKRName: "클렌징",
      categoryENName: "cleansing",
    },
    {
      categoryKRName: "선크림",
      categoryENName: "suncream",
    },
  ];

  return (
    <>
      {categoryTitle.map((category, index) => {
        return (
          <li key={category.categoryENName}>
            <CustomButton
              fontColor={activateTag === index ? "black" : "white"}
              fontsize={activateTag === index ? "21px" : "17px"}
              bgColor={
                activateTag === index ? "var(--gray)" : "var(--lightgray)"
              }
              width="100px"
              padding="5px"
              content={`${category.categoryKRName}`}
              onClick={() => {
                props.setCategory(category.categoryKRName);
                props.setCategoryENName(category.categoryENName);
                setActivateTage(index);
              }}
            />
          </li>
        );
      })}
      {/* 추후 session 여부와 user Tag정보로 조건부 랜더링 진행할 예정 */}
      <li>
        <CustomButton
          fontColor={customCheck ? "black" : "white"}
          fontsize={customCheck ? "21px" : "17px"}
          bgColor={customCheck ? "var(--gray)" : "var(--lightgray)"}
          width="100px"
          padding="5px"
          content="커스텀"
          onClick={() => {
            setCustomCheck(!customCheck);
          }}
        />
      </li>
    </>
  );
}
