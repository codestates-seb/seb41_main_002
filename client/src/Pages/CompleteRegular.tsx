import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Style/completePayment.css";

const CompleteRegular = () => {
  const urlParams = new URL(window.location.href).searchParams;
  const pg_token = urlParams.get("pg_token");
  const tid = window.localStorage.getItem("tid");

  useEffect(() => {
    console.log(urlParams);
    console.log(pg_token);
    console.log(tid);
    const memberId = sessionStorage.getItem("memberId");
    const params = {
      cid: "TCSUBSCRIP",
      tid: tid,
      partner_order_id: "850625",
      partner_user_id: memberId,
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
        console.log(res.data);
        const params = {
          cid: "TCSUBSCRIP",
          sid: res.data.sid,
          partner_order_id: "850625",
          partner_user_id: memberId,
          item_name: "정기구독 결제",
          quantity: 1,
          total_amount: 5900,
          vat_amount: 590,
          tax_free_amount: 0,
        };
        axios({
          url: "https://kapi.kakao.com/v1/payment/subscription",
          method: "POST",
          headers: {
            Authorization: "KakaoAK 2d88767cdd0695fb947a662df1ed10d9",
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          params,
        }).then(res => {
          console.log('정기 결제됨');
          console.log(res.data);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="Complete_Container">
      <h1 className="Complete_Message">상품 결제 완료</h1>
      <button>
        <Link to="/">돌아가기</Link>
      </button>
    </div>
  );
};

export default CompleteRegular;
