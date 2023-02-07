import { Link } from "react-router-dom";
import "./../Style/orderedListItem.css";

interface ItemInterface {
  itemId: number;
  itemImageURL: string;
  itemTitle: string;
  itemTotalPrice: number;
  itemCount: number;
}

const OrderedListItem = ({ item }: { item: ItemInterface }) => {
  return (
    <div className="Ordered_List_Item_Wrapper">
      <div>
        <img src={item.itemImageURL} alt="sample image" />
        <Link to={`/itemDetail/${item.itemId}`}>
          <span className="Ordered_List_Item_Title">{item.itemTitle} </span>
        </Link>
      </div>
      <div className="Ordered_List_Item_Right">
        <span>수량: {item.itemCount}개 </span>
        <span>가격: {item.itemTotalPrice}원 </span>
      </div>
    </div>
  );
};

export default OrderedListItem;
