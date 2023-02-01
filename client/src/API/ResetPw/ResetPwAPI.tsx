import { authInstance } from "../Core";

export interface ResetPwType {
  oldPassword: string;
  newPassword: string;
}

export const resetMemberPw = async (
  memberId: number,
  ResetPwData: ResetPwType
) => {
  try {
    await authInstance
      .patch(`members/edit/${memberId}/password`, ResetPwData)
      .then((res) => {
        console.log("비밀번호 재설정 완료");
      });
  } catch (error) {
    console.error(error);
  }
};
