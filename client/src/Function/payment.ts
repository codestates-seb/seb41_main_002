export interface LocalType {
  itemId: number;
  itemTitle: string;
  itemImageURL: string;
  itemTotalPrice: number;
  itemCount: number;
}

const getItemList = sessionStorage.getItem("itemList");
const itemListArray:LocalType[] = getItemList && JSON.parse(getItemList);

export const itemsCalculation = (useReserve?: string | number , subscribeCheck?: boolean) => {
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
      itemCount: item.itemCount,
      itemTotalPrice: item.itemTotalPrice,
    }
  })

  return itemList
};
