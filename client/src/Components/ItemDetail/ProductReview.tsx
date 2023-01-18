import "./Style/productReview.css";
import { ReviewType } from "../../API/ItemDetail/getItemDetail";
import { Rating } from "../Commons/Rating";
import Modal from "../Commons/Modal";
import { useState } from "react";

interface Props {
  reviewsInfo?: ReviewType[];
}

export default function ProductReview(props: Props) {
  //부모 필수 설정
  const [isModalActivate, setIsModalActivate] = useState(false);
  //모달 컴포넌트 사용
  //클릭시 modalState를 true로 변경하는건 각자 만들어야합니다.
  console.log(props.reviewsInfo);
  return (
    <div className="Item_Reviews">
      {isModalActivate ? (
        <Modal
          modalState={isModalActivate}
          setModalState={setIsModalActivate}
          element={<></>}
        />
      ) : null}
      <div className="Review_Section_Title">
        <h1>제품 사용후기</h1>
      </div>
      <ul className="Review_Container">
        {props.reviewsInfo &&
          props.reviewsInfo.map((review) => {
            return (
              <li key={review.reviewId}>
                <div className="Review_User_Info">
                  <div className="Review_Title_Content">
                    <span
                      className="Title_Content"
                      onClick={() => setIsModalActivate(!isModalActivate)}
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
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
