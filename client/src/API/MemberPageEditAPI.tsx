import axios from "axios";

// 로그인 연동이 안 되어 있기 때문에 현재 수동으로 입력
// 이후 로그인 연동 이후 해당 데이터 삭제
const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiJzaGltNTUwNSIsInJvbGVzIjpbIlVTRVIiXSwibWVtYmVySWQiOjIsInN1YiI6InNoaW01NTA1IiwiaWF0IjoxNjc0MDMwNTAzLCJleHAiOjE2NzQwMzE3MDN9.UY1oZp5RNiaYs6yxMOCvEuVGJ6CkRK4qaQlHJwf7XAg";

interface AddressType {
  addressId: number;
  isPrimary: boolean;
  addressTitle: string;
  zipcode: string;
  address: string;
}

interface GetMemberPageDataType {
  accountId: string;
  memberName: string;
  birthdate: string;
  email: string;
  phoneNumber: string;
  addressList: AddressType[];
  tagList: string[];
  isSubscribed: boolean;
  subscribedDate: string;
  nowDate: string;
  sampleCount: number;
  totalDeliveryDiscount: number;
  reserveProfit: number;
}

export const getMemberAddressData = async (memberId: number) => {
  try {
    // const response = await axios
    //   .get<GetMemberPageDataType>(
    //     `http://13.209.97.3:8080/api/v1/members/edit/${memberId}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     return res;
    //   });
    // return response;
    var config = {
      method: "get",
      url: "http://13.209.97.3:8080/api/v1/members/edit/1",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiJzaGltNTUwNSIsInJvbGVzIjpbIlVTRVIiXSwibWVtYmVySWQiOjEsInN1YiI6InNoaW01NTA1IiwiaWF0IjoxNjc0MDMwOTIxLCJleHAiOjE2NzQwMzIxMjF9.v_tWFAEAJmTNnlo7xkh4cIl0_x-Ab3ZQsJRbOF12VS8",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
};
