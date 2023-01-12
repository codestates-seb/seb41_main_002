import CustomButton from "../Commons/Buttons";
import "./Style/categoryTab.css";

export const ShoppingCategoryTab: Function = () => {
  const categoryTitle: string[] = [
    "전체",
    "토너",
    "크림",
    "로션",
    "클렌징",
    "선크림",
    "내맞춤",
  ];

  return categoryTitle.map((category) => {
    return (
      <li key={category}>
        <CustomButton
          fontColor="white"
          bgColor="gray"
          width="100px"
          padding="5px"
          content={`${category}`}
        />
      </li>
    );
  });
};
