import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

export interface SettingType {
  ratingEdit: boolean;
  ratingSize: number;
}

interface RatingProps {
  starRating: number;
  setStarRating?: Dispatch<SetStateAction<number>>;
  ratingSetting: SettingType;
}

interface RatingStyleType {
  rating: number;
  size: number;
}

const RatingBox = styled.div<RatingStyleType>`
  position: relative;
  font-size: ${(props) => props.size + "px"};
  width: max-content;
  cursor: pointer;
  .Star_Ratings_Fill {
    position: absolute;
    color: yellow;
    z-index: 1;
    clip: rect(
      0px,
      ${(props) => props.size * 5 * (props.rating / 5) + "px"},
      49px,
      0px
    );
  }
  .Star_Ratings_Base {
    position: absolute;
    color: var(--lightgray1);
  }
`;

export const Rating = (props: RatingProps) => {
  const ratingClickEdit = (rating: number) => {
    if (props.ratingSetting.ratingEdit) {
      props.setStarRating?.(rating);
    }
  };

  return (
    <RatingBox rating={props.starRating} size={props.ratingSetting.ratingSize}>
      <div className="Star_Ratings_Fill">
        <span
          onClick={() => {
            ratingClickEdit(1);
          }}
        >
          ★
        </span>
        <span
          onClick={() => {
            ratingClickEdit(2);
          }}
        >
          ★
        </span>
        <span
          onClick={() => {
            ratingClickEdit(3);
          }}
        >
          ★
        </span>
        <span
          onClick={() => {
            ratingClickEdit(4);
          }}
        >
          ★
        </span>
        <span
          onClick={() => {
            ratingClickEdit(5);
          }}
        >
          ★
        </span>
      </div>
      <div className="Star_Ratings_Base">
        <span
          onClick={() => {
            ratingClickEdit(1);
          }}
        >
          ★
        </span>
        <span
          onClick={() => {
            ratingClickEdit(2);
          }}
        >
          ★
        </span>
        <span
          onClick={() => {
            ratingClickEdit(3);
          }}
        >
          ★
        </span>
        <span
          onClick={() => {
            ratingClickEdit(4);
          }}
        >
          ★
        </span>
        <span
          onClick={() => {
            ratingClickEdit(5);
          }}
        >
          ★
        </span>
      </div>
    </RatingBox>
  );
};
