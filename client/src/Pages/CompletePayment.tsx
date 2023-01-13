import { useEffect } from "react";
import { Link } from "react-router-dom";
import { 결제완료 } from "../API/Payment";
import axios from "axios";
import "./Style/completePayment.css";

const CompletePayment = () => {
  const urlParams = new URL(window.location.href).searchParams;
  const pg_token = urlParams.get("pg_token");
  const tid = window.localStorage.getItem("tid");

  interface 주문서타입 {
    memberId: number;
    isPrimary: any;
    addressId: number;
    itemList: {
      itemId: number;
      itemCount: number;
      itemTotalPrice: number;
    }[];
    itemsTotalPrice: number;
    totalPrice: number;
    usedReserve: number;
  }

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
    }).then((res) => {
      const 로컬주문서:any = window.localStorage.getItem("orderSheet")
      let 주문서= JSON.parse(로컬주문서)
      결제완료(주문서).then((res) => {
        console.log("결제가 완료되었습니다.");
      });
      window.localStorage.removeItem("tid");
      window.localStorage.removeItem("orderSheet");
    }).catch(err => {
      console.error(err);
    });
  }, []);

  
  return (
    <div className="Complete_Container">
      <h1>상품 결제 완료</h1>
      <button>
        <Link to="/checkout">돌아가기</Link>
      </button>
    </div>
  );
};

export default CompletePayment;
