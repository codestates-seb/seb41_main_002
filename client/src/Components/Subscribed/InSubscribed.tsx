import "../Style/inSubscribed.css";
import { Link } from "react-router-dom";

const InSubscribed = () => {
  const memberId = sessionStorage.getItem("memberId");
  return (
    <div className="Subscribed_Container">
      <h2>구독하기</h2>
      <div>
        <h3>지금 구독을 하게되면...</h3>
        <ul>
          <li>
            1. 매월 고객님의 피부타입에 맞춘 5개의 토너 및 로션 샘플과 2개의
            세안샘플, 그리고 3종류의 앰플 샘플을 무작위로 받아 볼 수 있습니다.
          </li>
          <li>2. 구매건 마다의 배송료를 1,000원 할인 혜택이 적용됩니다.</li>
          <li>
            3. 구독 신청 후 구매시 기존적립(1%) 에서 구독적립(3%)로 변경됩니다.
          </li>
          <li>매월 5,900원에 지금 구독하세요!</li>
        </ul>
      </div>
      <Link to={`/members/${memberId}/subscribe`}>
        <button>구독하러 가기</button>
      </Link>
    </div>
  );
};

export default InSubscribed;
