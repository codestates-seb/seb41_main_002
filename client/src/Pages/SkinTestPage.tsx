import { useEffect, useState } from "react";
import styled from "styled-components";
import { addSkinTest } from "../API/SkinTestPage/addSkinTest";
import { ToggleButtons } from "../Components/Commons/ToggleButtons";
import "./Style/skinTestPage.css";

export interface TagButtonProps {
  height?: string;
  width?: string;
  fontsize?: string;
  backgroundColor?: string;
  mapIndex?: number;
  arrIndex?: number | null;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  overlapCheck?: boolean;
  selectedItems?: string[];
}

const TagButton = styled.button<TagButtonProps>`
  height: ${(props) => (props.height ? props.height : "30px")};
  font-size: ${(props) => (props.fontsize ? props.fontsize : "20px")};
  align-items: center;
  display: inline-flex;
  justify-content: center;
  background: ${(props) =>
    props.mapIndex === props.arrIndex
      ? props.backgroundColor
      : "rgba(0, 0, 0, 0.281);"};
  &:hover {
    transition: all 0.3s ease;
    cursor: pointer;
    background-color: hsla(0, 1%, 100%, 0.3);
  }
`;

const LeftCarouselTextWrapper = styled.div<{
  isTransitionEnd: boolean;
  textColor: string;
}>`
  display: flex;
  align-items: center;
  flex-direction: column;
  h3,
  h2 {
    transition-delay: 0.1s;
    transform: ${(props) =>
      props.isTransitionEnd ? "translate(-30px, 0)" : "none"};
  }
`;

export default function SkinTestPage() {
  const [isSkinActivate, setIsSkinActivate] = useState<boolean>(false);
  const [isAnceActivate, setIsAnceActivate] = useState<boolean>(false);
  const [isSubmitCheck, setIsSubmitCheck] = useState<boolean>(false);
  const [skinTypeResult, setSkinTypeResult] = useState<string>("");
  const [acneTypeResult, setAcenTypeResult] = useState<string>("");
  const [resultArr, setResultArr] = useState<string[]>([]);
  const [skinTagIndex, setSkinTagIndex] = useState<number | null>(null);
  const [acneTagIndex, setAcneTagIndex] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const skinTestArr: string[] = [skinTypeResult, acneTypeResult];
  const [resultSectionActive, setResultSectionActive] =
    useState<boolean>(false);
  const memberId = sessionStorage.getItem("memberId");
  const addSkinTestHandler = (tag: string, skinTag: string, index: number) => {
    switch (skinTag) {
      case "피부타입":
        setSkinTypeResult(tag);
        setIsSkinActivate(true);
        setSkinTagIndex(index);
        break;
      case "여드름타입":
        setAcenTypeResult(tag);
        setIsAnceActivate(true);
        setAcneTagIndex(index);
        break;
    }
  };

  const conCatArr = () => {
    setResultArr([...skinTestArr].concat(selectedItems));
  };

  useEffect(() => {
    conCatArr();
  }, [selectedItems]);

  const skinTypeArr: any = [
    {
      skinTag: "피부타입",
      questionAnswer: "상",
      skinCategory: "건성",
    },
    {
      skinTag: "피부타입",
      questionAnswer: "중",
      skinCategory: "지성",
    },
    {
      skinTag: "피부타입",
      questionAnswer: "하",
      skinCategory: "복합성",
    },
  ];

  const acneTypeArr = [
    {
      skinTag: "여드름타입",
      questionAnswer: "여드름이 많다",
      anceCategory: "여드름성 피부",
    },
    {
      skinTag: "여드름타입",
      questionAnswer: "깨끗하고 맑고 자신있다",
      anceCategory: "일반피부",
    },
  ];

  const interestEffectArr = [
    {
      effectCategory: "미백",
    },
    {
      effectCategory: "주름",
    },
    {
      effectCategory: "보습",
    },
    {
      effectCategory: "모공",
    },
    {
      effectCategory: "수분",
    },
    {
      effectCategory: "탄력",
    },
  ];
  return (
    <div className="Test_Page_Container">
      <LeftCarouselTextWrapper isTransitionEnd={true} textColor={"white"}>
        <h1>안녕하세요 고객님 여긴 본인의 피부타입을 검사하는 페이지 입니다</h1>
        <h2>본인의 맞춤 피부를 검사하고 그에맞는 제품을 추천 받아보세요</h2>
      </LeftCarouselTextWrapper>
      <div className="Skin_Test_ContentBox">
        <div className="Test_Type_Container">
          <h2>
            건조한 계절이나 환절기에 화장품을 바르지 않았을때 얼굴이 당기나요?
          </h2>
          <div className="Type_Test_Content">
            {skinTypeArr.map((el: any, index: number) => {
              return (
                <div className="Type_Tag_Btn" key={el.skinCategory}>
                  <TagButton
                    mapIndex={index}
                    arrIndex={skinTagIndex}
                    backgroundColor="pink"
                    onClick={() => {
                      addSkinTestHandler(el.skinCategory, el.skinTag, index);
                    }}
                  >
                    {el.questionAnswer}
                  </TagButton>
                </div>
              );
            })}
          </div>
        </div>
        {isSkinActivate ? (
          <div className="Test_Type_Container">
            <h2>현재 본인의 피부 트러블 상태는 어떤가요?</h2>
            <div className="Type_Test_Content">
              {acneTypeArr.map((el: any, index: number) => {
                return (
                  <div className="Type_Tag_Btn" key={el.questionAnswer}>
                    <TagButton
                      backgroundColor="pink"
                      mapIndex={index}
                      arrIndex={acneTagIndex}
                      onClick={() => {
                        addSkinTestHandler(el.anceCategory, el.skinTag, index);
                      }}
                    >
                      {el.questionAnswer}
                    </TagButton>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
        {isAnceActivate ? (
          <div className="Test_Type_Container">
            <h2>피부 개선 효능중 관심있는 태그를 골라주세요!</h2>
            <div className="Type_Test_Content">
              <ToggleButtons
                effectArr={interestEffectArr}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                setIsSubmitCheck={setIsSubmitCheck}
              />
            </div>
          </div>
        ) : null}
        <div className="Submit_Section">
          {isSubmitCheck ? (
            <TagButton
              height="40px"
              onClick={() => {
                addSkinTest(memberId, resultArr);
                setIsSubmitCheck(false);
                setResultSectionActive(true);
              }}
            >
              Submit
            </TagButton>
          ) : null}
        </div>
        {resultSectionActive ? (
          <div className="Test_Result">
            <h1> 피부 타입의 결과를 알려드립니다!</h1>
            <div>
              <h2>
                당신의 피부타입은 {resultArr[0]}이고, {resultArr[1]} 입니다
              </h2>
            </div>
            <div>
              <h2>당신이 관심있는 효능은 </h2>
              {selectedItems.map((el: any) => {
                return <h2 key={el}>{el}</h2>;
              })}
              <h2>입니다</h2>
              <h2>
                제품을 보러가시려면{" "}
                <a className="Navigate_Shopping_List" href="/items-list/all">
                  여기
                </a>
                를 Click하세요!
              </h2>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
