import React, { useEffect, useState } from "react";
import { getItemInfo } from "../API/Review";
import "./Style/review.css";
import { ItemInfoType } from "../API/Review";
import { useLocation, useNavigate, useParams } from "react-router";
import { SettingType , Rating} from "../Components/Commons/Rating";


const Review = () => {
  const [itemInfo, setItemInfo] = useState<ItemInfoType>({
    itemTitle: "",
    categoryKRName: "",
    titleImageURL: "",
    tagList: [],
    memberTagsList: [],
  });

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderItemId = searchParams.get("orderItemId");
  let { itemId } = useParams() as { itemId: string };

  useEffect(() => {
    console.log(itemId);
    // getItemInfo(itemId).then(res => {
    //   setItemInfo(res);
    // });
  }, []);

  const reviewWrite = () => {};

  const ratingSetting: SettingType = {
    ratingEdit: true,
    ratingSize: 30,
  };
  const [starRating, setStarRating] = useState(5);

  return (
    <div className="Review_Container">
      <div className="Review_TopBox">
        <ul className="Review_Item">
          <li>{itemInfo.itemTitle}</li>
          <li>{itemInfo.categoryKRName}</li>
          <li>
            <div className="Review_Rating">
              <Rating
                starRating={starRating}
                setStarRating={setStarRating}
                ratingSetting={ratingSetting}
              />
            </div>
          </li>
        </ul>
        <div className="Review_MyTags">내 태그 정보</div>
      </div>
      <div className="Review_Title">
        <input type="text" className="textBox" />
      </div>
      <div className="Review_TextBox"></div>
      <div className="Review_Submit">
        <button onClick={reviewWrite}>Submit</button>
        <button onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  );
};

export default Review;
