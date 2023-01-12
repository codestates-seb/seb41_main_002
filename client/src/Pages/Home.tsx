import "./Style/home.css";
import dummyData from "./../data/HomeData.json";
import styled from "styled-components";
import CustomButton from "../Components/Commons/Buttons";

const HeroImage = styled.div<{ bgUrl: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.bgUrl});
  height: 600px;
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 50px;
`;

const BannerContainer = styled.div<{ height: string }>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: ${(props) => props.height};
  background-color: white;
  margin-bottom: 20px;
`;

const TopBannerContainer = styled(BannerContainer)`
  box-sizing: border-box;
  padding: 20px 40px;
`;

const BannerContent = styled.img<{ width: string }>`
  width: ${(props) => props.width};
  height: 100%;
`;

export default function Home() {
  // console.log(dummyData);
  return (
    <div className="Home_Container">
      <HeroImage bgUrl={dummyData.bannerImageUrl}>
        <div className="Hero_Text">
          <h1 className="Hero_Text_Gradient">남성 전용 화장품</h1>
          <p className="Hero_Text_Gradient">
            당신의 피부타입을 알아보고 화장품을 추천 받아보세요.
          </p>
          <button className="Hero_Button">
            <span>알아보기</span>
          </button>
        </div>
      </HeroImage>
      <div className="Events_Banner">
        <button className="left"> ◀ </button>
        <div className="Events_Carousel">
          {dummyData.eventsInfo.map((a) => {
            return (
              <div className="Event_Slide fade">
                <div className="Carousel_Page">
                  {a.eventId} / {dummyData.eventsInfo.length}
                </div>
                <div className="Event_Caption_Text">{a.title}</div>
              </div>
            );
          })}
        </div>
        <button className="right"> ▶ </button>
      </div>
      <TopBannerContainer height="250px">
        <BannerContent src="" width={"250px"} />
      </TopBannerContainer>
    </div>
  );
}
