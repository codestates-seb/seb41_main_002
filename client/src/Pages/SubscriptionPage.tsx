import { kakaoRegularPaymentReady } from "../API/SubscriptionAPI";
import "./Style/subscriptionPage.css";

export default function SubscriptionPage() {
  const onMonthlyPayment = async () => {
    console.log("결제");
    await kakaoRegularPaymentReady().then(
      (res: { paymentURL: string; tid: string } | undefined) => {
        if (typeof res !== "undefined") {
          window.sessionStorage.setItem("tid", res.tid);
          window.location.replace(res.paymentURL);
        }
      }
    );
  };
  return (
    <div className="Subscription_Container">
      <img
        src={require("../img/mainBanner.png")}
        className="Subscription_Banner"
      />
      <div className="Subscription_Benefit_Info">
        <ul className="Benefit_Info_Contents">
          <h1>지금 구독을 하게되면..</h1>
          <li className="Sample_Benefit_Info">
            <span>
              1. 매월 고객님의 피부타입에 맞춘 5개의 토너 및 로션 샘플과 2개의
              세안샘플, 그리고 3종류의 앰플 샘플을 무작위로 받아 볼 수 있습니다.
            </span>
          </li>
          <li className="Sample_Benefit_Info">
            <span>
              2. 구매건 마다의 배송료를 1,000원 할인 혜택이 적용됩니다.
            </span>
          </li>
          <li className="Sample_Benefit_Info">
            <span>
              3. 구독 신청 후 구매시 기존적립(1%) 에서 구독적립(3%)로
              변경됩니다.
            </span>
          </li>
        </ul>
      </div>
      <div className="Subscription_Text">매월 5,900원에 지금 구독하세요!</div>
      <div className="Subscrip_Payment_Section">
        <h2>카카오페이 결제</h2>
        <div className="Final_Summary">
          <div className="Payment_Container">
            <img src="https://img.seoul.co.kr/img/upload/2022/01/04/SSI_20220104190629_O2.jpg" />
            <ul className="Payment_History">
              <li>카드 결제 금액</li>
              <li>금액: 5,900원</li>
              <li>
                <button className="Pay_Button" onClick={onMonthlyPayment}>
                  결제하기
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
