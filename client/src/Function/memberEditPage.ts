export const subscriptionCalculation = (subscribedDate: string) => {
  console.log(subscribedDate);
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = Number(('0' + (today.getMonth() + 1)).slice(-2));
  const subscribedYear = Number(subscribedDate?.slice(0, 4));
  const subscribedMonth = Number(subscribedDate?.slice(5, 7));
  
  let calcMonth = 0;

  if(todayYear > subscribedYear) {
    calcMonth = 12 * (todayYear - subscribedYear);
  } else if (todayMonth > subscribedMonth) {
    calcMonth += (todayMonth - subscribedMonth);
  }

  return calcMonth;
};