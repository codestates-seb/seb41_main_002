const 상품가져오기 = localStorage.getItem("itemList");
const 상품배열화: string[] = 상품가져오기 && JSON.parse(상품가져오기);
const 상품필터 = 상품배열화.map((data: any) => {
  return {
    name: data.itemTitle,
    price: data.itemTotalPrice/data.itemCount,
    count: data.itemCount,
  };
});

export const 상품계산 = (사용적립금: string | number | undefined, 구독여부: boolean) => {
  let totalPrice = 0;
  let itemsTotalPrice = 상품배열화.reduce((sum: number, value: any) => sum + value.itemTotalPrice, 0);
  let 배송비 = 구독여부 ? 2000 : 3000;
  if(typeof 사용적립금 === "undefined"){
    totalPrice = itemsTotalPrice + 배송비;
  } else {
    totalPrice = itemsTotalPrice + 배송비 - Number(사용적립금);
  }
  return {itemsTotalPrice, totalPrice, 상품필터}
};

export const 상품정리 = (memberId: number) => {};
