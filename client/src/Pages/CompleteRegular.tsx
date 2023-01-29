import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authInstance } from "../API/Core";
import "./Style/completePayment.css";

const CompleteRegular = () => {
  const urlParams = new URL(window.location.href).searchParams;
  const pg_token = urlParams.get("pg_token");
  const tid = sessionStorage.getItem("tid");
  const navigate = useNavigate();
  useEffect(() => {
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
        sessionStorage.removeItem("tid");
        const subscribeParams = {
          SID: String(res.data.sid),
          isSubscribed: true,
        };
        const response = authInstance
          .patch(`/members/${memberId}/subscribe`, subscribeParams)
          .then((res) => {
            console.log("SID 저장!");
            return res;
          });
        alert("구독을 완료했습니다");
        navigate("/");
        window.location.reload();
        const nowDate = new Date();
        sessionStorage.setItem("isSubscribed", "true");
        sessionStorage.setItem("regularPayment", String(nowDate));
        return response;
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
