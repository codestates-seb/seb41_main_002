const getItemList = localStorage.getItem("itemList");
const itemListArray: string[] = getItemList && JSON.parse(getItemList);
const itemsFilter = itemListArray.map((data: any) => {
  return {
    name: data.itemTitle,
    price: data.itemTotalPrice/data.itemCount,
    count: data.itemCount,
  };
});

export const itemsCalculation = (useReserve: string | number | undefined, subscribeCheck: boolean) => {
  let totalPrice = 0;
  let itemsTotalPrice = itemListArray.reduce((sum: number, value: any) => sum + value.itemTotalPrice, 0);
  let deliveryFee = subscribeCheck ? 2000 : 3000;
  let excludingPoints = itemsTotalPrice + deliveryFee
  if(typeof useReserve === "undefined"){
    totalPrice = itemsTotalPrice + deliveryFee;
  } else {
    totalPrice = itemsTotalPrice + deliveryFee - Number(useReserve);
  }
  return {itemsTotalPrice, totalPrice, excludingPoints, itemsFilter}
};

export const itemsOrganize = () => {
  let itemList = itemListArray.map((item:any) => {
    return{
      itemId: item.itemId,
      itemCount: item.itemCount,
      itemTotalPrice: item.itemTotalPrice,
    }
  })

  return itemList
};
