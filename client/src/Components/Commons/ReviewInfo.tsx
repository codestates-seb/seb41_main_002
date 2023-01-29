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
  const memberId = sessionStorage.getItem("memberId");
  const [starRating, setStarRating] = useState(5);
  const [reviewInfo, setReviewInfo] = useState<ReviewUserInfoType>({
    titleImageURL: "",
    itemTitle: "",
    memberId: 0,
    reviewTitle: "",
    reviewContent: "",
    reiviewRating: starRating,
  });
  const [reviewUpdate, setReviewUpdate] = useState(false);

  // const [reviewText, setReviewText] = useState({
  //   reviewTitle: "",
  //   reviewContent: "",
  // });
  const ratingSetting: SettingType = {
    ratingEdit: reviewUpdate,
    ratingSize: 30,
  };

  const onReviewTextHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setReviewInfo({ ...reviewInfo, [name]: value });
  };
  const onReviewUpdateCancel = () => {
    setReviewUpdate(false);
    getReviewInfo(reviewId).then((res) => {
      setStarRating(res.reiviewRating);
      setReviewInfo(res);
    });
  };

  const onReviewUpdate = () => {
    const review = {
      memberId: reviewInfo.memberId,
      reviewTitle: reviewInfo.reviewTitle,
      reviewContent: reviewInfo.reviewContent,
      reviewRating: reviewInfo.reiviewRating
    };
    if (window.confirm("수정하시겠습니까?")) {
      setReviewUpdate(false);
      ReviewInfoUpdate(reviewId, review);
      alert("수정되었습니다.");
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

  useEffect(() => {
    getReviewInfo(reviewId).then((res) => {
      setStarRating(res.reiviewRating);
      setReviewInfo(res);
    });
  }, []);

  return (
    <div className="ReviewInfo_Container">
      <div className="Review_Item_Info">
        <img src={reviewInfo.titleImageURL} />
        <ul>
          <li>
            <div className="Review_Item_Tag">제품명</div>
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
        <h2>제목</h2>
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
        <h2>내용</h2>
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
