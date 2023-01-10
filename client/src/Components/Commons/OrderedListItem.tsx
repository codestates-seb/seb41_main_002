import "./../Style/orderedListItem.css";

interface ItemInterface {
  name: string;
  price: number;
  count: number;
}

const OrderedListItem = ({
  item,
  idx,
}: {
  item: ItemInterface;
  idx: number;
}) => {
  return (
    <div
      className="to_Be_Replaced Checkout_Order_Item"
      key={`OrderListItem${idx}`}
    >
      <img
        src={`https://picsum.photos/75?random=${idx + 1}`}
        alt="sample image"
      />
      <span>{item.name} </span>
      <span>수량: {item.count}개 </span>
      <span>가격: {item.count * item.price}원 </span>
    </div>
  );
};

export default OrderedListItem;
