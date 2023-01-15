import CustomButton from "../Commons/Buttons";
import "./Style/categoryTab.css";

interface Category {
  categoryENName: string;
  categoryKRName: string;
}

export const ShoppingCategoryTab: Function = () => {
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
      <li key={category.categoryENName} onClick={() => category.categoryENName}>
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
