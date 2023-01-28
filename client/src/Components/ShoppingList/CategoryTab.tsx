import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  session: string | null;
  memberTagData: any;
  serchWord: string;
  pageNumber: number;
  customCheck: boolean;
  setCustomCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShoppingCategoryTab: Function = (props: Props) => {
  console.log(props.memberTagData)
  const param = useParams();
  const [activateTag, setActivateTage] = useState(0);
  const navigate = useNavigate();
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
                setActivateTage(index);
                props.setCategoryParams(category.categoryENName);
                navigate(
                  `/items-list/${category.categoryENName}?custom=${props.isCustom}&title=${props.serchWord}&page=${props.pageNumber}`
                );
              }}
            />
          </li>
        );
      })}
      {props.memberTagData && props.memberTagData.memberTagsList !== null ? (
        props.memberTagData &&
        props.memberTagData.memberTagsList.length !== 0 ? (
          <li>
            <CustomButton
              fontColor={props.customCheck ? "black" : "white"}
              fontsize={props.customCheck ? "21px" : "17px"}
              bgColor={props.customCheck ? "var(--gray)" : "var(--lightgray)"}
              width="100px"
              padding="5px"
              content="커스텀"
              onClick={() => {
                navigate(
                  `/items-top-list/${param.categoryENName}?custom=${
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
                navigate(`/skin-test/${props.session}`);
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
              navigate("/login");
            }}
          />
        </li>
      )}
    </>
  );
};
