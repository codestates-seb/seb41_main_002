import { authInstance } from "../Core";

export const allDeleteProduct = (memberId: string | null) => {
  try {
    authInstance.delete(`/members/${memberId}/carts`).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        alert("제품이 삭제 되었습니다 🐰");
        window.location.reload();
      }
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteProduct = (memberId: string | null, cartItemId: number) => {
  try {
    authInstance
      .delete(`/members/${memberId}/carts/${cartItemId}`)
      .then((res) => {
        if (res.status === 200) {
          alert("제품이 삭제 되었습니다 🐰");
          window.location.reload();
        }
      });
  } catch (err) {
    console.error(err);
  }
};