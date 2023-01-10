import { Link } from "react-router-dom";
import "./../Style/orderedListItem.css";

interface ItemInterface {
  name: string;
  price: number;
  count: number;
}

// 이후 협의를 통해 props가 더 추가될 예정입니다.
const OrderedListItem = ({
  item,
  idx,
}: {
  item: ItemInterface;
  idx: number;
}) => {
  return (
    <div className="Ordered_List_Item_Wrapper">
      <img
        src={`https://picsum.photos/75?random=${idx + 1}`}
        alt="sample image"
      />
      <Link to="/itemDetail/:itemId">
        <span className="Ordered_List_Item_Title">{item.name} </span>
      </Link>

      <span>수량: {item.count}개 </span>
      <span>가격: {item.count * item.price}원 </span>
    </div>
  );
};

export default OrderedListItem;
