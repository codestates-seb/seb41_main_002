import { authInstance } from "../Core";

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

export const getMemberData = async (memberId: number) => {
  try {
    const response = await authInstance.get<MemberPageDataType>(
      `/members/edit/${memberId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addNewAddress = async (newAddressData: newAddressType) => {
  try {
    await authInstance
      .post(`/addresses`, newAddressData)
      .then(() => console.log("새 주소지 추가 완료"));
  } catch (error) {
    console.error(error);
  }
};

export const updateAddress = async (
  addressId: number,
  addressEditData: UpdateAddressDataType
) => {
  try {
    await authInstance
      .patch(`/addresses/${addressId}`, addressEditData)
      .then(() => console.log("내 정보 수정 완료"));
  } catch (error) {
    console.error(error);
  }
};

export const deleteAddress = async (addressId: number) => {
  try {
    await authInstance
      .delete(`/addresses/${addressId}`)
      .then(() => console.log("해당 주소지 삭제 완료"));
  } catch (error) {
    console.error(error);
  }
};

export const updateMemberData = async (
  memberId: number,
  memberEditData: UpdateMemberDataType
) => {
  try {
    await authInstance
      .patch(`/members/edit/${memberId}`, memberEditData)
      .then(() => console.log("내 정보 수정 완료"));
  } catch (error) {
    console.error(error);
  }
};

export const cancelSubscription = async (memberId: number) => {
  const reqBody = { isSubscribed: false };
  try {
    await authInstance.patch(`/members/${memberId}/subscribe`, reqBody);
  } catch (error) {
    console.error(error);
  }
};
