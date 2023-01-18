import axios from "axios";

// 로그인 연동이 안 되어 있기 때문에 현재 수동으로 입력
// 이후 로그인 연동 이후 해당 데이터 삭제
const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiJzaGltNTUwNSIsInJvbGVzIjpbIlVTRVIiXSwibWVtYmVySWQiOjEsInN1YiI6InNoaW01NTA1IiwiaWF0IjoxNjc0MDU1Mjk3LCJleHAiOjE2NzQwNTY0OTd9.zvN0y40ddFP5FuxDBBgUTAJgdUC0pLmuSnSay_AAuUM";

export interface AddressType {
  addressId: number;
  isPrimary: boolean;
  addressTitle: string;
  zipcode: string;
  address: string;
}

export interface MemberPageDataType {
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
    const response = await axios.get<MemberPageDataType>(
      `http://13.209.97.3:8080/api/v1/members/edit/${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
