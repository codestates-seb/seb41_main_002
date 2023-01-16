import { useState } from "react";
import { useParams } from "react-router-dom";
import CustomButton from "../Commons/Buttons";
import "./Style/categoryTab.css";

interface Category {
  categoryENName: string;
  categoryKRName: string;
}

interface Props {
  setCategoryParams(category: string): React.SetStateAction<string>;
  setIsCustom(custom: boolean): React.SetStateAction<boolean>;
  isCustom: boolean;
  session: {
    memberId: number;
    accountId: string;
  };
  userTagInfo: string[];
}

export const ShoppingCategoryTab: Function = (props: Props) => {
  const [activateTag, setActivateTage] = useState(0);
  
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
              bgColor={activateTag === index ? "var(--gray)": "var(--lightgray)"}
              width="100px"
              padding="5px"
              content={`${category.categoryKRName}`}
              onClick={() => {
                setActivateTage(index);
                props.setCategoryParams(category.categoryENName);
              }}
            />
          </li>
        );
      })}
      {props.session && props.session ? (
        props.userTagInfo && props.userTagInfo.length !== 0 ? (
          <li>
            <CustomButton
              fontColor={props.isCustom ? "black" : "white"}
              bgColor={props.isCustom ? "var(--gray)": "var(--lightgray)"}
              fontsize={props.isCustom ? "21px" : "17px"}
              width="100px"
              padding="5px"
              content={"커스텀"}
              onClick={() => {
                props.setIsCustom(!props.isCustom);
              }}
            />
          </li>
        ) : (
          <a href="/">
            <CustomButton
              fontColor="white"
              bgColor="var(--lightgray)"
              width="100px"
              padding="5px"
              content={"커스텀"}
            />
          </a>
        )
      ) : (
        <a href="/login">
          <CustomButton
            fontColor="white"
            bgColor="var(--lightgray)"
            width="100px"
            padding="5px"
            content={"커스텀"}
          />
        </a>
      )}
    </>
  );
};
