import { ReviewType } from "../../API/ItemDetail/getItemDetail";
import { Rating } from "../Commons/Rating";
import Modal from "../Commons/Modal";
import { useState } from "react";
import "./Style/productReview.css";
import ReviewInfo from "../Commons/ReviewInfo";

interface Props {
  reviewsInfo?: ReviewType[];
}

export default function ProductReview(props: Props) {
  const [isModalActivate, setIsModalActivate] = useState(false);
  const [reviewNum, setReviewNum] = useState(0);

  const session = sessionStorage.getItem("memberId");

  const modalClick = (index: number) => {
    setIsModalActivate(!isModalActivate)
    setReviewNum(index)
  }
  
  return (
    <div className="Item_Reviews">
      {props.reviewsInfo && isModalActivate ? (
        <Modal
          modalState={isModalActivate}
          setModalState={setIsModalActivate}
          element={<ReviewInfo reviewId={props.reviewsInfo&& props.reviewsInfo[reviewNum].reviewId} />}
        />
      ) : null}
      <div className="Review_Section_Title">
        <h1>제품 사용후기</h1>
      </div>
      <ul className="Review_Container">
        {props.reviewsInfo &&
          props.reviewsInfo.map((review, index) => {
            return (
              <li key={review.reviewId}>
                <div className="Review_User_Info">
                  <div className="Review_Title_Content">
                    <span
                      className="Title_Content"
                      onClick={() => modalClick(index)}
                    >
                      {review.reviewTitle}
                    </span>
                    <Rating
                      starRating={review.reviewRating}
                      ratingSetting={{ ratingEdit: false, ratingSize: 20 }}
                    />
                  </div>
                  <div className="Review_User_Info">
                    <span>{review.accountId}</span>
                    <span>{review.createdAt}</span>
                    {/* any타입 추후 리팩토링 예정 */}
                    {session && (session as any) === review.memberId ? (
                      <a href={`/reviews/${review.reviewId}`}>
                        <span>✍🏻</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
