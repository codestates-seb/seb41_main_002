import styled from "styled-components";
import "./Style/memberPageEdit.css";

const MemberInfoContent = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: peru;
  border: 1px solid red;
`;

const MemberInfoText = styled.span`
  display: flex;
`;

export default function MemberPageEdit() {
  return (
    // 추후 데이터 수정 예정
    <div className="Edit_Page_Container">
      <ul className="Member_Infomation_Contents">
        <MemberInfoContent>
          <h2>회원정보 수정</h2>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Title">
            <MemberInfoText>ID</MemberInfoText>
          </div>
          <div className="Info_Content">
            <MemberInfoText>AccountId</MemberInfoText>
          </div>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Title">
            <MemberInfoText>PW</MemberInfoText>
          </div>
          <div className="Info_Content">
            <MemberInfoText>**********</MemberInfoText>
          </div>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Title">
            <MemberInfoText>이름</MemberInfoText>
          </div>
          <div className="Info_Content">
            <MemberInfoText>홍길동</MemberInfoText>
          </div>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Title">
            <MemberInfoText>생년월일</MemberInfoText>
          </div>
          <div className="Info_Content">
            <MemberInfoText>1997/05/07</MemberInfoText>
          </div>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Title">
            <MemberInfoText>이메일</MemberInfoText>
          </div>
          <div className="Info_Content">
            <MemberInfoText>dlaruddls@nate.com</MemberInfoText>
          </div>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Title">
            <MemberInfoText>핸드폰 번호</MemberInfoText>
          </div>
          <div className="Info_Content">
            <MemberInfoText>010-7702-9884</MemberInfoText>
          </div>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Title">
            <MemberInfoText>내 배송지</MemberInfoText>
          </div>
          <div className="Info_Content">
            <MemberInfoText>
              대표주소: 서울특별시 강서구 화곡동 56-536 501호
            </MemberInfoText>
          </div>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Title">
            <MemberInfoText>
              <button>대표주소 설정</button>
            </MemberInfoText>
          </div>
          <div className="Info_Content">
            <MemberInfoText>
              주소Title1: 서울특별시 강서구 화곡동 56-536 501호
            </MemberInfoText>
          </div>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Title">
            <MemberInfoText>
              <button>대표주소 설정</button>
            </MemberInfoText>
          </div>
          <div className="Info_Content">
            <MemberInfoText>
              주소Title1: 서울특별시 강서구 화곡동 56-536 501호
            </MemberInfoText>
          </div>
        </MemberInfoContent>
        <MemberInfoContent>
          <button className="Address_Add_Button">주소 추가하기</button>
        </MemberInfoContent>
        <div>
          <div className="Edit_Type_Container">
            <div className="Type_Title">
              <MemberInfoText>내 피부타입</MemberInfoText>
            </div>
            <div className="Type_Content">
              <MemberInfoText>내 피부타입</MemberInfoText>
            </div>
          </div>
          <div className="Edit_Type_Container">
            <div className="Type_Title">
              <MemberInfoText>내 피부타입</MemberInfoText>
            </div>
            <div className="Type_Content">
              <MemberInfoText>내 피부타입</MemberInfoText>
            </div>
          </div>
          <div className="Edit_Type_Container">
            <div className="Type_Title">
              <MemberInfoText>내 피부타입</MemberInfoText>
            </div>
            <div className="Type_Content">
              <MemberInfoText>내 피부타입</MemberInfoText>
            </div>
          </div>
        </div>
      </ul>
      <div className="Edit_Button_Wrap">
        <button className="Edit_Button">수정하기</button>
      </div>
      <div className="Subscribe_Edit_Container">
        <div className="Subscribe_Start_Date">
        <div className="Subscribe_Start_Title">
          <MemberInfoText>구독 시작일</MemberInfoText>
        </div>
        <div className="Subscribe_Start_Content">
          <MemberInfoText>구독 시작일</MemberInfoText>
        </div>
        </div>
        <div className="Subscribe_Benefits_Container">
          <div className="Subscribe_Benefits_Title"></div>
          <div className="Subscribe_Benefits_Contents"></div>
        </div>
      </div>
    </div>
  );
}
