import axios from "axios";

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

interface UpdateAddressDataType {
  isPrimary: boolean;
  addressTitle: string;
  zipcode: string;
  address: string;
}

interface UpdateMemberDataType {
  memberName: string;
  email: string;
  phoneNumber: string;
  tagList: string[];
}

const BASE_URL = process.env.REACT_APP_BASE_URL as string;
const accessToken = sessionStorage.getItem("accessToken");

export const getMemberData = async (memberId: number) => {
  try {
    const response = await axios.get<MemberPageDataType>(
      `${BASE_URL}/members/edit/${memberId}`,
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
      .post(`${BASE_URL}/addresses`, newAddressData, {
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

export const updateAddress = async (
  addressId: number,
  addressEditData: UpdateAddressDataType
) => {
  try {
    await axios
      .patch(`${BASE_URL}/addresses/${addressId}`, addressEditData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("내 정보 수정 완료");
      });
  } catch (error) {
    console.error(error);
  }
};

export const deleteAddress = async (addressId: number) => {
  try {
    await axios
      .delete(`${BASE_URL}/addresses/${addressId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("해당 주소지 삭제 완료");
      });
  } catch (error) {
    console.error(error);
  }
};

export const updateMemberData = async (
  memberId: number,
  memberEditData: UpdateMemberDataType
) => {
  try {
    await axios
      .patch(`${BASE_URL}/members/edit/${memberId}`, memberEditData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("내 정보 수정 완료");
      });
  } catch (error) {
    console.error(error);
  }
};

export const cancelSubscription = async (memberId: number) => {
  const reqBody = { isSubscribed: false };

  try {
    await axios.patch(`${BASE_URL}/members/${memberId}/subscribe`, reqBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
