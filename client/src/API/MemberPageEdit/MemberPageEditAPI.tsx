import axios from "axios";

// 로그인 기능 일부 미구현으로 이후 기능 완료 시 해당 데이터 삭제
const accessToken = sessionStorage.getItem("accessToken");

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
