import { Link } from "react-router-dom";
import "./../Style/orderedListItem.css";

interface ItemInterface {
  itemId: number;
  itemImageURL: string;
  itemTitle: string;
  itemTotalPrice: number;
  itemCount: number;
}

// 이후 협의를 통해 props가 더 추가될 예정입니다.
const OrderedListItem = ({ item }: { item: ItemInterface }) => {
  return (
    <div className="Ordered_List_Item_Wrapper">
      <img src={item.itemImageURL} alt="sample image" />
      <Link to={`/itemDetail/${item.itemId}`}>
        <span className="Ordered_List_Item_Title">{item.itemTitle} </span>
      </Link>
      <span>수량: {item.itemCount}개 </span>
      <span>가격: {item.itemTotalPrice}원 </span>
    </div>
  );
};

export default OrderedListItem;
