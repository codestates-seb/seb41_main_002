import { useState } from "react";
import { Link } from "react-router-dom";
import { ReviewType } from "../../API/MemberPage/MemberPageAPI";
import { Rating, SettingType } from "../Commons/Rating";

const ReviewsItem = ({ review }: { review: ReviewType }) => {
  const ratingSetting: SettingType = {
    ratingEdit: false,
    ratingSize: 20,
  };
  const [starRating, setStarRating] = useState(review.reviewRating);

  console.log(review);

  return (
    <div>
      <div className="Profile_History_Item">
        <div className="History_Image_Container">
          <img src={review.itemImageURL} alt="sample image" />
        </div>
        <div className="History_Product_Name">
          <span className="History_Detail_Indicator">상품명</span>
          <div>{review.itemTitle}</div>
        </div>
        <div className="History_Product_Info">
          <span className="History_Detail_Indicator">리뷰 제목</span>
          <Link to={`/itemDetail/${review.itemId}`}>
            <div>{review.reviewTitle}</div>
          </Link>
        </div>
        <div className="History_Product_Info">
          <span className="History_Detail_Indicator">별점</span>
          <div className="History_Rating_Wrapper">
            <Rating
              starRating={starRating}
              setStarRating={setStarRating}
              ratingSetting={ratingSetting}
            />
          </div>
        </div>
        <div className="History_Product_Info">
          <span className="History_Detail_Indicator">최근 리뷰 수정일</span>
          <div>{review.modifiedAt}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsItem;
