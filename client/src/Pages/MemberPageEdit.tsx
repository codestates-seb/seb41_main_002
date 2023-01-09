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

const InfoTitle = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid;
  width: 40%;
  align-items: center;
  background-color: peru;
`;

const InfoContent = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid;
  width: 60%;
  align-items: center;
  background-color: peru;
`;

const SubscribeBenefit = styled(InfoContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 20px;
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
          <div>
            <MemberInfoText>AccountId</MemberInfoText>
          </div>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Title">
            <MemberInfoText>PW</MemberInfoText>
          </div>
          <div>
            <MemberInfoText>**********</MemberInfoText>
          </div>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Title">
            <MemberInfoText>이름</MemberInfoText>
          </div>
          <div>
            <MemberInfoText>홍길동</MemberInfoText>
          </div>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Title">
            <MemberInfoText>생년월일</MemberInfoText>
          </div>
          <div>
            <MemberInfoText>1997/05/07</MemberInfoText>
          </div>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Title">
            <MemberInfoText>이메일</MemberInfoText>
          </div>
          <div>
            <MemberInfoText>dlaruddls@nate.com</MemberInfoText>
          </div>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Title">
            <MemberInfoText>핸드폰 번호</MemberInfoText>
          </div>
          <div>
            <MemberInfoText>010-7702-9884</MemberInfoText>
          </div>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Title">
            <MemberInfoText>내 배송지</MemberInfoText>
          </div>
          <div>
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
          <div>
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
          <div>
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
            <InfoTitle>
              <MemberInfoText>내 피부타입</MemberInfoText>
            </InfoTitle>
            <InfoContent>
              <MemberInfoText>내 피부타입</MemberInfoText>
            </InfoContent>
          </div>
          <div className="Edit_Type_Container">
            <InfoTitle>
              <MemberInfoText>내 피부타입</MemberInfoText>
            </InfoTitle>
            <InfoContent>
              <MemberInfoText>내 피부타입</MemberInfoText>
            </InfoContent>
          </div>
          <div className="Edit_Type_Container">
            <InfoTitle>
              <MemberInfoText>내 피부타입</MemberInfoText>
            </InfoTitle>
            <InfoContent>
              <MemberInfoText>내 피부타입</MemberInfoText>
            </InfoContent>
          </div>
        </div>
      </ul>
      <div className="Edit_Button_Wrap">
        <button className="Edit_Button">수정하기</button>
      </div>
      <div className="Subscribe_Edit_Container">
        <div className="Subscribe_Start_Date">
          <InfoTitle>
            <MemberInfoText>구독 시작일</MemberInfoText>
          </InfoTitle>
          <InfoContent>
            <MemberInfoText>구독 시작일</MemberInfoText>
          </InfoContent>
        </div>
        <div className="Subscribe_Benefits_Container">
          <InfoTitle>
            <MemberInfoText>지금까지 받은 혜택</MemberInfoText>
          </InfoTitle>
          <SubscribeBenefit>
            <MemberInfoText>구독일로부터</MemberInfoText>
            <MemberInfoText>4개의 샘플</MemberInfoText>
            <MemberInfoText>4개의 샘플</MemberInfoText>
            <MemberInfoText>4개의 샘플</MemberInfoText>
          </SubscribeBenefit>
        </div>
      </div>
      {/* 밑 코드는 추후 공용 컴포넌트로 교체 예정 */}
      <div className="Edit_Button_Wrap">
        <button className="Edit_Button">구독 취소</button>
      </div>
    </div>
  );
}
