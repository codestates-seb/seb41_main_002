import { ProfileDataType } from "../../API/MemberPage/MemberPageAPI";
import OrderHistoryItem from "./OrderHistoryItem";
import ReviewsItem from "./ReviewsItem";
import { Dispatch, SetStateAction } from "react";
import "./../Style/myPageTabs.css";

export const OrderHistoryTab = ({
  profileData,
}: {
  profileData: ProfileDataType;
}) => {
  return (
    <div className="History_Contents">
      {profileData?.ordersHistory.length === 0 ? (
        <div>주문 내역이 없습니다.</div>
      ) : (
        profileData &&
        profileData.ordersHistory.map((order, idx) => {
          return <OrderHistoryItem order={order} key={`order${idx}`} />;
        })
      )}
    </div>
  );
};

export const MyReviewsTab = ({
  profileData,
  setModalState,
  setReviewId,
}: {
  profileData: ProfileDataType;
  setModalState: Dispatch<SetStateAction<boolean>>;
  setReviewId: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="History_Contents">
      {profileData?.reviews.length === 0 ? (
        <div>리뷰 내역이 없습니다.</div>
      ) : (
        profileData &&
        profileData.reviews.map((review, idx) => {
          return (
            <ReviewsItem
              review={review}
              setModalState={setModalState}
              setReviewId={setReviewId}
              key={`review${idx}`}
            />
          );
        })
      )}
    </div>
  );
};
