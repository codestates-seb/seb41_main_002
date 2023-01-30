import React, { useEffect, useState } from "react";
import {
  getReviewInfo,
  ReviewInfoDelete,
  ReviewInfoType,
  ReviewInfoUpdate,
  ReviewUserInfoType,
} from "../../API/Review";
import { Rating, SettingType } from "./Rating";
import "../Style/reviewInfo.css";
import "../../Pages/Style/review.css";

interface PropsType {
  reviewId: number;
}

const ReviewInfo = ({ reviewId }: PropsType) => {
  const [reviewUpdate, setReviewUpdate] = useState(false);

  const ratingSetting: SettingType = {
    ratingEdit: reviewUpdate,
    ratingSize: 30,
  };
  const [starRating, setStarRating] = useState(5);
  useEffect(() => {
    getReviewInfo(reviewId).then((res) => {
      setStarRating(res.reviewRating);
      setReviewInfo(res);
    });
  }, []);

  const memberId = sessionStorage.getItem("memberId");

  const [reviewInfo, setReviewInfo] = useState<ReviewUserInfoType>({
    titleImageURL: "",
    itemTitle: "",
    memberId: 0,
    reviewTitle: "",
    reviewContent: "",
    reviewRating: 0,
  });

  const onReviewTextHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setReviewInfo({ ...reviewInfo, [name]: value });
  };
  const onReviewUpdateCancel = () => {
    setReviewUpdate(false);
    getReviewInfo(reviewId).then((res) => {
      setStarRating(res.reviewRating);
      setReviewInfo(res);
    });
  };

  const onReviewUpdate = () => {
    const review = {
      memberId: reviewInfo.memberId,
      reviewTitle: reviewInfo.reviewTitle,
      reviewContent: reviewInfo.reviewContent,
      reviewRating: starRating,
    };
    if (window.confirm("수정하시겠습니까?")) {
      setReviewUpdate(false);
      ReviewInfoUpdate(reviewId, review).then(() => {
        alert("수정되었습니다.");
        window.location.reload();
      })
    } else {
      alert("취소했습니다.");
    }
  };

  const onReviewDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      ReviewInfoDelete(reviewId);
      alert("리뷰를 삭제했습니다.");
      window.location.reload();
    } else {
      alert("취소했습니다.");
    }
  };

  const test = () => {
    console.log(reviewInfo);
    setStarRating(reviewInfo.reviewRating);
  };

  return (
    <div className="ReviewInfo_Container">
      <div className="Review_Item_Info">
        <img src={reviewInfo.titleImageURL} />
        <ul>
          <li>
            <div onClick={test} className="Review_Item_Tag">
              제품명
            </div>
            <div className="Review_Item">{reviewInfo.itemTitle}</div>
          </li>
          <li>
            <div className="Review_Item_Tag">별점</div>
            <div className="Review_Rating">
              <Rating
                starRating={starRating}
                setStarRating={setStarRating}
                ratingSetting={ratingSetting}
              />
            </div>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="Review_Header">제목</h2>
        <div className="Review_Title">
          <input
            type="text"
            className="textBox"
            name="reviewTitle"
            value={reviewInfo.reviewTitle}
            onChange={onReviewTextHandler}
            autoComplete="off"
            readOnly={!reviewUpdate}
          />
        </div>
      </div>
      <div>
        <h2 className="Review_Header">내용</h2>
        <div className="Review_TextBox">
          <textarea
            name="reviewContent"
            value={reviewInfo.reviewContent}
            onChange={onReviewTextHandler}
            readOnly={!reviewUpdate}
          />
        </div>
      </div>
      {Number(memberId) === reviewInfo.memberId ? (
        <div className="Review_BtnBox">
          {reviewUpdate ? (
            <>
              <button onClick={onReviewUpdate}>확인</button>
              <button onClick={onReviewUpdateCancel}>취소</button>
            </>
          ) : (
            <>
              <button onClick={() => setReviewUpdate(true)}>수정</button>
              <button onClick={onReviewDelete}>삭제</button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ReviewInfo;
