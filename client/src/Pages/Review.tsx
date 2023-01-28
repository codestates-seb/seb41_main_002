import React, { useEffect, useState } from "react";
import { getItemInfo, reviewPost, reviewTextType } from "../API/Review";
import "./Style/review.css";
import { ItemInfoType, reviewType } from "../API/Review";
import { useLocation, useNavigate, useParams } from "react-router";
import { SettingType, Rating } from "../Components/Commons/Rating";
import { SkinTag } from "../Components/Commons/TypeBadge";

const Review = () => {
  const [itemInfo, setItemInfo] = useState<ItemInfoType>({
    itemTitle: "",
    categoryKRName: "",
    titleImageURL: "",
    tagList: [],
    memberTagsList: [],
  });

  const [reviewText, setReviewText] = useState<reviewTextType>({
    reviewTitle: "",
    reviewContent: "",
  });

  const ratingSetting: SettingType = {
    ratingEdit: true,
    ratingSize: 30,
  };
  const [starRating, setStarRating] = useState(5);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderItemId = Number(searchParams.get("orderItemId"));
  let { itemId } = useParams() as { itemId: string };
  const memberId: number = Number(sessionStorage.getItem("memberId"));

  useEffect(() => {
    getItemInfo(itemId).then((res) => {
      setItemInfo(res);
    });
  }, []);

  const reviewWrite = () => {
    const review: reviewType = {
      orderItemId: orderItemId,
      itemId: Number(itemId),
      memberId: memberId,
      reviewRating: starRating,
      reviewTitle: reviewText.reviewTitle,
      reviewContent: reviewText.reviewContent,
    };
    reviewPost(review).then((res) => {
      // navigate(`/itemDetail/${itemId}`)
      console.log(res);
    }).catch(err => {
      console.log('작성 X');
    });
  };

  const onReviewTextHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setReviewText({ ...reviewText, [name]: value });
  };

  return (
    <div className="Review_Container">
      <div className="Review_TopBox">
        <img className="Review_TitleImg" src={itemInfo.titleImageURL}></img>
        <ul className="Review_Item">
          <li>
            <div className="Review_Menu_Tag">제품명</div>
            <div className="Review_Menu">{itemInfo.itemTitle}</div>
          </li>
          <li>
            <div className="Review_Menu_Tag">카테고리</div>
            <div className="Review_Menu">{itemInfo.categoryKRName}</div>
          </li>
          <li>
            <div className="Review_Menu_Tag">제품 타입</div>
            <div className="Review_Menu">
              {itemInfo.tagList.map((tags, index) => {
                return <div key={index}>{SkinTag(tags)}</div>;
              })}
            </div>
          </li>
          <li>
            <div className="Review_Menu_Tag">별점</div>
            <div className="Review_Rating">
              <Rating
                starRating={starRating}
                setStarRating={setStarRating}
                ratingSetting={ratingSetting}
              />
            </div>
          </li>
          <li className="Review_MyTags">
            <div className="Review_Menu_Tag">내 타입</div>
            <div className="Review_Menu">
              {itemInfo.memberTagsList.map((tags, index) => {
                return <div key={index}>{SkinTag(tags)}</div>;
              })}
            </div>
          </li>
        </ul>
      </div>
      <div className="Review_Contents">
        <h2>제목</h2>
        <div className="Review_Title">
          <input
            type="text"
            className="textBox"
            name="reviewTitle"
            value={reviewText.reviewTitle}
            onChange={onReviewTextHandler}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="Review_Contents">
        <h2>내용</h2>
        <div className="Review_TextBox">
          <textarea
            name="reviewContent"
            value={reviewText.reviewContent}
            onChange={onReviewTextHandler}
          />
        </div>
      </div>
      <div className="Review_Submit">
        <button onClick={reviewWrite}>Submit</button>
        <button onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  );
};

export default Review;
