import React from "react";
import { useState } from "react";
import { NavigateFunction, Params } from "react-router-dom";
import CustomButton from "../Commons/Buttons";

interface Props {
  setCategoryENName: React.Dispatch<React.SetStateAction<string>>;
  session: string | null;
  navigate: NavigateFunction;
  customCheck: boolean;
  setCustomCheck: React.Dispatch<React.SetStateAction<boolean>>;
  params: Readonly<Params<string>>;
  //추후 리팩토링 예정
  userCustomInfo: any;
}

export default function TopListCategoryTab(props: Props) {
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
        // console.log(props.params.categoryENName)
        console.log(props.params.categoryENName === category.categoryENName);
        return (
          <li key={category.categoryENName}>
            <CustomButton
              fontColor={
                props.params.categoryENName === category.categoryENName
                  ? "black"
                  : "white"
              }
              fontsize={
                props.params.categoryENName === category.categoryENName
                  ? "21px"
                  : "17px"
              }
              bgColor={
                props.params.categoryENName === category.categoryENName
                  ? "var(--gray)"
                  : "var(--lightgray)"
              }
              width="100px"
              padding="5px"
              content={`${category.categoryKRName}`}
              onClick={() => {
                props.setCategoryENName(category.categoryENName);

                props.navigate(`/items-top-list/${category.categoryENName}`);
              }}
            />
          </li>
        );
      })}
      {props.userCustomInfo && props.userCustomInfo.memberTagsList !== null ? (
        props.userCustomInfo &&
        props.userCustomInfo.memberTagsList.length !== 0 ? (
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
                  `/items-top-list/${props.params.categoryENName}`
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
