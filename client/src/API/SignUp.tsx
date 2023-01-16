import axios from "axios";

interface MemberType {
  accountID: string;
  password: string;
  memberName: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
}

//중복체크
export const doubleCheck = async (accountID: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/idcheck/${accountID}`
    );
    //중복 [리턴 true], 중복 아니면 flase
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//회원가입
export const signUp = async (memberData: MemberType) => {
  try {
    let dateChange = memberData.birthDate.replace(/\-/gi, "/");
    console.log(dateChange); 
    const setMemberData = {
      ...memberData,
      birthDate: dateChange
    }
    await axios
      .post("http://localhost:8080/api/v1/signup", setMemberData)
      .then((res) => {
        console.log("회원가입 완료");
      });
  } catch (error) {
    console.error(error);
  }
};