// 더미 데이터 연동 후 지울 예정---------------------------
interface LocalType {
  itemId: number;
  itemTitle: string;
  itemImageURL: string;
  itemTotalPrice: number;
  count: number;
}

const arr: LocalType[] = [
  {
    itemId: 1,
    itemTitle: "상품이름1",
    itemImageURL: "https://picsum.photos/75?random=1",
    itemTotalPrice: 30000,
    count: 3,
  },
  {
    itemId: 2,
    itemTitle: "상품이름2",
    itemImageURL: "https://picsum.photos/75?random=2",
    itemTotalPrice: 20000,
    count: 2,
  },
  {
    itemId: 3,
    itemTitle: "상품이름3",
    itemImageURL: "https://picsum.photos/75?random=3",
    itemTotalPrice: 60000,
    count: 6,
  },
];

const arrString = JSON.stringify(arr);
window.localStorage.setItem("itemList", arrString);

//----------------------------------------------------------



const getItemList = localStorage.getItem("itemList");
const itemListArray:LocalType[] = getItemList && JSON.parse(getItemList);


export const itemsCalculation = (useReserve: string | number | undefined, subscribeCheck: boolean | undefined) => {
  let totalPrice = 0;
  let itemsTotalPrice = itemListArray.reduce((sum: number, value: LocalType) => sum + value.itemTotalPrice, 0);
  let deliveryFee = subscribeCheck ? 2000 : 3000;
  let excludingPoints = itemsTotalPrice + deliveryFee
  if(typeof useReserve === "undefined"){
    totalPrice = itemsTotalPrice + deliveryFee;
  } else {
    totalPrice = itemsTotalPrice + deliveryFee - Number(useReserve);
  }
  return {itemsTotalPrice, totalPrice, excludingPoints, itemListArray}
};

export const itemsOrganize = () => {
  let itemList = itemListArray.map((item:LocalType) => {
    return{
      itemId: item.itemId,
      count: item.count,
      itemTotalPrice: item.itemTotalPrice,
    }
  })

  return itemList
};
