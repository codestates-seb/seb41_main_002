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
interface newAddressType {
  memberId: number;
  isPrimary: boolean;
  addressTitle: string;
  zipcode: string;
  address: string;
}

interface UpdateDataType {
  memberName: string;
  email: string;
  phoneNumber: string;
  tagList: string[];
}

export const getMemberData = async (memberId: number) => {
  try {
    const response = await axios.get<MemberPageDataType>(
      `http://13.125.242.34:8080/api/v1/members/edit/${memberId}`,
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

export const addNewAddress = async (newAddressData: newAddressType) => {
  try {
    await axios
      .post(`http://13.125.242.34:8080/api/v1/addresses`, newAddressData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("새 주소지 추가 완료");
      });
  } catch (error) {
    console.error(error);
  }
};

export const updateMemberData = async (
  memberId: number,
  memberEditData: UpdateDataType
) => {
  try {
    await axios
      .patch(
        `http://13.125.242.34:8080/api/v1/members/edit/${memberId}`,
        memberEditData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log("내 정보 수정 완료");
      });
  } catch (error) {
    console.error(error);
  }
};
