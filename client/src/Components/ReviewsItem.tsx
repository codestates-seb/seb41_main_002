import { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Commons/Rating";

interface ReviewType {
  reviewId: number;
  itemId: number;
  itemImageURL: string;
  itemTitle: string;
  reviewTitle: string;
  createdAt: string;
  modifiedAt: string;
  reviewRating: number;
}

const ReviewsItem = ({ review }: { review: ReviewType }) => {
  type settingType = {
    ratingEdit: boolean;
    ratingSize: number;
  };
  const ratingSetting: settingType = {
    ratingEdit: false,
    ratingSize: 20,
  };
  const [starRating, setStarRating] = useState(review.reviewRating);

  return (
    <div>
      <div className="Profile_History_Item">
        <div>
          <Link to={`/itemDetail/${review.itemId}`}>
            <span>{review.itemTitle}</span>
            <div>
              <img src={review.itemImageURL} alt="sample image" />
            </div>
          </Link>
        </div>
        <div>
          <span className="History_Detail_Indicator">리뷰 제목</span>
          <div>{review.reviewTitle}</div>
        </div>
        <div>
          <span className="History_Detail_Indicator">별점</span>
          <div className="History_Rating_Wrapper">
            <Rating
              starRating={starRating}
              setStarRating={setStarRating}
              ratingSetting={ratingSetting}
            />
          </div>
        </div>
        <div>
          <span className="History_Detail_Indicator">최근 리뷰 수정일</span>
          <div>{review.modifiedAt}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsItem;
