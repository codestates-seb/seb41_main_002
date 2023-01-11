import "./Style/subscriptionPage.css";

export default function SubscriptionPage() {
  return (
    <div className="Subscription_Container">
      <img src="" className="Suvscription_Banner" />
      <div className="Subscrip_Benefit_Info">
        <ul className="Benefit_Info_Contents">
          <h1>지금 구독을 하게되면..</h1>
          <li className="Sample_Bannefit_Info">
            <span>
              1. 매월 고객님의 피부타입에 맞춘 5개의 토너 및 로션 샘플과 2개의
              세안샘플, 그리고 3종류의 앰플 샘플을 무작위로 받아 볼 수 있습니다.
            </span>
          </li>
          <li className="Sample_Bannefit_Info">
            <span>
              2. 구매건 마다의 배송료를 1,000원 할인 혜택이 적용됩니다.
            </span>
          </li>
          <li className="Sample_Bannefit_Info">
            <span>
              3. 구독 신청 후 구매시 기존적립(1%) 에서 구독적립(3%)로 변경됩니다.
            </span>
          </li>
        </ul>
      </div>
      <div className="Subscrip_Payment_Section">
        {/* 추후 결제 관련 컴포넌트 생성시 들어갈 자리 */}
      </div>
    </div>
  );
}
