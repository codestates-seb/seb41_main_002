import dummyData from "../../data/MemberPageData.json";
import OrderHistoryItem from "./OrderHistoryItem";
import ReviewsItem from "./ReviewsItem";

export const OrderHistoryTab = () => {
  return (
    <div className="History_Contents">
      {dummyData.ordersHistory.map((order, idx) => {
        return <OrderHistoryItem order={order} key={`order${idx}`} />;
      })}
    </div>
  );
};

export const MyReviewsTab = () => {
  return (
    <div className="History_Contents">
      {dummyData.reviews.map((review, idx) => {
        return <ReviewsItem review={review} key={`review${idx}`} />;
      })}
    </div>
  );
};
