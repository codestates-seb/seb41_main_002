import { completePayment } from "../API/Payment";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Style/completePayment.css";

const CompletePayment = () => {
  interface OrderSheetType {
    memberId: number;
    isPrimary: boolean | undefined;
    addressId: number | undefined;
    itemList: {
      itemId: number;
      itemCount: number;
      itemTotalPrice: number;
    }[];
    itemsTotalPrice: number;
    totalPrice: number;
    usedReserve: number;
  }

  const urlParams = new URL(window.location.href).searchParams;
  const pg_token = urlParams.get("pg_token");
  const tid = window.localStorage.getItem("tid");

  useEffect(() => {
    const params = {
      cid: "TC0ONETIME",
      tid: tid,
      partner_order_id: "850625",
      partner_user_id: "850625",
      pg_token: pg_token,
    };
    axios({
      url: "https://kapi.kakao.com/v1/payment/approve",
      method: "POST",
      headers: {
        Authorization: "KakaoAK 2d88767cdd0695fb947a662df1ed10d9",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params,
    })
      .then((res) => {
        const localOrder = localStorage.getItem("orderSheet");
        let orderSheet: OrderSheetType = localOrder && JSON.parse(localOrder);
        completePayment(orderSheet).then((res) => {
          console.log("결제가 완료되었습니다.");
        });
        window.localStorage.removeItem("tid");
        window.localStorage.removeItem("orderSheet");
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="Complete_Container">
      <h1 className="Complete_Message">상품 결제 완료</h1>
      <button>
        <Link to="/checkout">돌아가기</Link>
      </button>
    </div>
  );
};

export default CompletePayment;
