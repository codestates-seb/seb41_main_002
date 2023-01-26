import axios from 'axios'

export const kakaoRegularPayment = async () => {
  try {
    let paymentURL = "";
    let tid = "";
    const memberId = sessionStorage.getItem('memberId');
    const params = {
      cid: "TCSUBSCRIP",
      partner_order_id: "850625",
      partner_user_id: memberId,
      item_name: "정기구독 결제",
      quantity: 1,
      total_amount: 5900,
      vat_amount: 590,
      tax_free_amount: 0,
      approval_url: `http://localhost:3000/members/${memberId}/subscribe/complete`,
      fail_url: `http://localhost:3000/members/${memberId}/subscribe`,
      cancel_url: `http://localhost:3000/members/${memberId}/subscribe`,
    };

    await axios({
      url: "https://kapi.kakao.com/v1/payment/ready",
      method: "POST",
      headers: {
        Authorization: "KakaoAK 2d88767cdd0695fb947a662df1ed10d9",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params,
    }).then((res) => {
      console.log(res.data);
      tid = res.data.tid;
      paymentURL = res.data.next_redirect_pc_url;
    });

    return { paymentURL, tid };
  } catch (error) {
    console.error(error);
  }
};