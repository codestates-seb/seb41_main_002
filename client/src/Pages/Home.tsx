import "./Style/home.css";
import dummyData from "./../data/HomeData.json";
import styled from "styled-components";
import CustomButton from "../Components/Commons/Buttons";
import React, { useEffect, useState } from "react";

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

const CarouselSlide = styled.div<{ bgUrl: string }>`
  position: relative;
  flex-basis: 100%;
  flex-shrink: 0;
  background-image: url(${(props) => props.bgUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 1s;
`;

export default function Home() {
  const [xPos, setXPos] = useState(0);
  const [carouselStyleToSlide, setCarouselStyleToSlide] = useState({
    transform: `translateX(${xPos}px)`,
  });
  // console.log(dummyData);

  useEffect(() => {
    setCarouselStyleToSlide({ transform: `translateX(${xPos}px)` });
  }, [xPos]);

  const slideCarousel = (event: React.MouseEvent<HTMLButtonElement>) => {
    const arrowButton: HTMLButtonElement = event.currentTarget;
    const maxXPos: number = -800 * (dummyData.eventsInfo.length - 1);

    if (arrowButton.name === "left" && xPos === 0) {
      setXPos(maxXPos);
    } else if (arrowButton.name === "left" && xPos !== 0) {
      setXPos(xPos + 800);
    } else if (arrowButton.name === "right" && xPos === maxXPos) {
      setXPos(0);
    } else if (arrowButton.name === "right" && xPos > maxXPos) {
      setXPos(xPos - 800);
    }
  };

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
        <button className="Carousel_Arrow" name="left" onClick={slideCarousel}>
          ◀
        </button>
        <div className="Events_Carousel">
          {dummyData.eventsInfo.map((a) => {
            return (
              <CarouselSlide
                bgUrl={a.eventImageURL}
                key={`slide${a.eventId}`}
                style={carouselStyleToSlide}
              >
                <div className="Event_Number_Text">
                  {a.eventId} / {dummyData.eventsInfo.length}
                </div>
                <div className="Event_Caption_Text">{a.title}</div>
              </CarouselSlide>
            );
          })}
        </div>
        <button className="Carousel_Arrow" name="right" onClick={slideCarousel}>
          ▶
        </button>
      </div>
      <TopBannerContainer height="250px">
        <BannerContent src="" width={"250px"} />
      </TopBannerContainer>
    </div>
  );
}
