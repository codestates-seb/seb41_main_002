import { Link } from "react-router-dom";
import "./Style/completePayment.css";

const CompletePayment = () => {
  return (
    <div className="Complete_Container">
      <h1>상품 결제 완료</h1>
      <button><Link to="/checkout">돌아가기</Link></button>
    </div>
  )
}

export default CompletePayment