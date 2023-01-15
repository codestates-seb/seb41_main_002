import { useParams } from "react-router-dom";
import CustomButton from "../Commons/Buttons";
import "./Style/categoryTab.css";

interface Category {
  categoryENName: string;
  categoryKRName: string;
}

interface Props {
  setCategoryParams(category:string): React.SetStateAction<string>
}

export const ShoppingCategoryTab: Function = (
  props:Props
) => {
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

  return categoryTitle.map((category) => {
    return (
      <li
        key={category.categoryENName}
        onClick={() => props.setCategoryParams(category.categoryENName)}
      >
        <CustomButton
          fontColor="white"
          bgColor="gray"
          width="100px"
          padding="5px"
          content={`${category.categoryKRName}`}
        />
      </li>
    );
  });
};
