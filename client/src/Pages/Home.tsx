import "./Style/home.css";
import dummyData from "./../data/HomeData.json";
import styled from "styled-components";

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
  console.log(dummyData);
  return (
    <div className="Home_Container">
      <BannerContainer height="500px">
        <img src={dummyData.bannerImageUrl} alt="home main banner image" />
      </BannerContainer>
      <BannerContainer height="500px">
        <BannerContent src="" width={"500px"} />
      </BannerContainer>
      <TopBannerContainer height="250px">
        <BannerContent src="" width={"250px"} />
      </TopBannerContainer>
    </div>
  );
}
