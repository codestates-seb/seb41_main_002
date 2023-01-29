import { useEffect } from "react";
import styled from "styled-components";
import { TagButtonProps } from "../../Pages/SkinTestPage";

const EffectButton = styled.button<TagButtonProps>`
  height: ${(props) => (props.height ? props.height : "30px")};
  font-size: ${(props) => (props.fontsize ? props.fontsize : "20px")};
  align-items: center;
  display: inline-flex;
  justify-content: center;
  //추후 로직추가 예정
  background: ${(props) => "rgba(0, 0, 0, 0.281)"};
  &:hover {
    transition: all 0.3s ease;
    cursor: pointer;
    background-color: hsla(0, 1%, 100%, 0.3);
  }
`;

interface Props {
  effectArr: {
    effectCategory: string;
  }[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  setIsSubmitCheck: React.Dispatch<React.SetStateAction<boolean>>
}

export const ToggleButtons = (props: Props) => {
  useEffect(() => {
  }, [props.selectedItems]);
  return (
    <div>
      {props.effectArr.map((el) => (
        <EffectButton
          onClick={() => {
            props.setIsSubmitCheck(true)
            if (props.selectedItems.includes(el.effectCategory)) {
              const newSelectedItems = props.selectedItems.filter(
                (item) => item != el.effectCategory
              );
              props.setSelectedItems(newSelectedItems);
            } else {
              const newSelectedItems = [...props.selectedItems];
              newSelectedItems.push(el.effectCategory);
              props.setSelectedItems(newSelectedItems);
            }
          }}
          //추후 로직변경 예정
          style={
            props.selectedItems.includes(el.effectCategory)
              ? { backgroundColor: "pink" }
              : {}
          }
        >
          {el.effectCategory}
        </EffectButton>
      ))}
    </div>
  );
};
