import { useNavigate } from "react-router-dom";
import CustomButton from "../Commons/Buttons";
import "./Style/categoryTab.css";

interface Category {
  categoryENName: string;
  categoryKRName: string;
}

interface Props {
  setIsCustom(custom: boolean): React.SetStateAction<boolean>;
  isCustom: boolean;
  session: string | null;
  memberTagData: any;
  serchWord: string;
  pageNumber: number;
  setisCustom: React.Dispatch<React.SetStateAction<boolean>>;
  params: string
}

export const ShoppingCategoryTab: Function = (props: Props) => {
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
      {categoryTitle.map((category) => {
        return (
          <li key={category.categoryENName}>
            <CustomButton
              height="36px"
              fontColor={props.params === category.categoryENName ? "black" : "white"}
              fontsize={props.params === category.categoryENName ? "21px" : "17px"}
              bgColor={
                props.params === category.categoryENName ? "var(--gray)" : "var(--lightgray)"
              }
              width="100px"
              padding="5px"
              content={`${category.categoryKRName}`}
              onClick={() => {
                navigate(
                  `/items-list/${category.categoryENName}?custom=${props.isCustom}`
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
              fontColor={props.isCustom ? "black" : "white"}
              fontsize={props.isCustom ? "21px" : "17px"}
              bgColor={props.isCustom ? "var(--gray)" : "var(--lightgray)"}
              width="100px"
              padding="5px"
              content="커스텀"
              onClick={() => {
                props.setIsCustom(!props.isCustom);
                navigate(
                  `/items-list/all?custom=${props.isCustom}`
                );
              }}
            />
          </li>
        ) : (
          <li>
            <CustomButton
              fontColor={props.isCustom ? "black" : "white"}
              fontsize={props.isCustom ? "21px" : "17px"}
              bgColor={props.isCustom ? "var(--gray)" : "var(--lightgray)"}
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
            fontColor={props.isCustom ? "black" : "white"}
            fontsize={props.isCustom ? "21px" : "17px"}
            bgColor={props.isCustom ? "var(--gray)" : "var(--lightgray)"}
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
