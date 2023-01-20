import React from "react";
import { useState } from "react";
import {
  NavigateFunction,
  Params,
  useNavigate,
  useParams,
} from "react-router-dom";
import CustomButton from "../Commons/Buttons";

interface Props {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setCategoryENName: React.Dispatch<React.SetStateAction<string>>;
  session: {
    memberId: number;
    accountId: string;
  };
  navigate: NavigateFunction;
  customCheck: boolean;
  setCustomCheck: React.Dispatch<React.SetStateAction<boolean>>;
  params: Readonly<Params<string>>;
  userCustomInfo: any;
}

export default function TopListCategoryTab(props: Props) {
  console.log(props.userCustomInfo && props.userCustomInfo.memberTagsList);
  const [activateTag, setActivateTage] = useState(0);
  interface Category {
    categoryENName: string;
    categoryKRName: string;
  }
  console.log(props.params);
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
                props.navigate(
                  `/items-top-list/${category.categoryENName}?custom=${props.customCheck}`
                );
              }}
            />
          </li>
        );
      })}
      {props.session && props.session ? (
        props.userCustomInfo && props.userCustomInfo.memberTagsList.length !== 0 ? (
          <li>
            <CustomButton
              fontColor={props.customCheck ? "black" : "white"}
              fontsize={props.customCheck ? "21px" : "17px"}
              bgColor={props.customCheck ? "var(--gray)" : "var(--lightgray)"}
              width="100px"
              padding="5px"
              content="커스텀"
              onClick={() => {
                props.navigate(
                  `/items-top-list/${props.params.categoryENName}?custom=${
                    props.customCheck && props.customCheck
                  }`
                );
                props.setCustomCheck(!props.customCheck);
              }}
            />
          </li>
        ) : (
          <li>
            <CustomButton
              fontColor={props.customCheck ? "black" : "white"}
              fontsize={props.customCheck ? "21px" : "17px"}
              bgColor={props.customCheck ? "var(--gray)" : "var(--lightgray)"}
              width="100px"
              padding="5px"
              content="커스텀"
              onClick={() => {
                props.navigate("/");
              }}
            />
          </li>
        )
      ) : (
        <li>
          <CustomButton
            fontColor={props.customCheck ? "black" : "white"}
            fontsize={props.customCheck ? "21px" : "17px"}
            bgColor={props.customCheck ? "var(--gray)" : "var(--lightgray)"}
            width="100px"
            padding="5px"
            content="커스텀"
            onClick={() => {
              props.navigate("/login");
            }}
          />
        </li>
      )}
    </>
  );
}
