import { authInstance } from "../Core";

export const addSkinTest = (memberId: string | null, tagList: string[]) => {
  try {
    const request = JSON.stringify({ tagList: tagList });
    const result = authInstance
      .post(`/members/${memberId}/tags`, request, {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("검사가 완료 되었습니다 🐰");
        } else {
          alert("검사를 모두 진행 해주세요!");
        }
      });
    return result;
  } catch (err) {
    console.error(err);
  }
};
