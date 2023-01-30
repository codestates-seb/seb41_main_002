import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Style/home.css";
import { getHomeData, HomeDataType } from "../API/Home/HomeAPI";

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

const TopSalesContent = styled.div<{ bgUrl: string }>`
  background-image: url(${(props) => props.bgUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: solid 0.5px lightgray;
  width: 250px;
  height: 100%;
  text-align: center;

  p {
    height: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 19px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  p:hover {
    color: var(--hoverColor2);
  }
`;

const memberId = Number(sessionStorage.getItem("memberId"));

export default function Home() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [homeData, setHomeData] = useState<HomeDataType>();
  const [xPos, setXPos] = useState(0);
  const [carouselStyleToSlide, setCarouselStyleToSlide] = useState({
    transform: `translateX(${xPos}px)`,
  });

  useEffect(() => {
    try {
      getHomeData().then((res) => {
        setHomeData(res);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    setCarouselStyleToSlide({ transform: `translateX(${xPos}px)` });
  }, [xPos]);

  const slideCarousel = (event: React.MouseEvent<HTMLButtonElement>) => {
    const carouselWidth = carouselRef.current?.clientWidth as number;
    const arrowButton: HTMLButtonElement = event.currentTarget;
    const maxXPos: number =
      -carouselWidth * ((homeData?.eventsInfo.length as number) - 1);

    if (arrowButton.name === "left" && xPos === 0) {
      setXPos(maxXPos);
    } else if (arrowButton.name === "left" && xPos !== 0) {
      setXPos(xPos + carouselWidth);
    } else if (arrowButton.name === "right" && xPos === maxXPos) {
      setXPos(0);
    } else if (arrowButton.name === "right" && xPos > maxXPos) {
      setXPos(xPos - carouselWidth);
    }
  };

  return (
    <div className="Home_Container">
      <HeroImage bgUrl={homeData?.bannerImageURL as string}>
        <div className="Hero_Text">
          <h1 className="Hero_Text_Gradient">남성 전용 화장품</h1>
          <p className="Hero_Text_Gradient">
            당신의 피부타입을 검사받고 화장품을 추천 받아보세요.
          </p>
          <button className="Hero_Button">
            <Link to={`/skin-test/${memberId}`}>
              <span>내 피부타입 검사하기</span>
            </Link>
          </button>
        </div>
      </HeroImage>
      <div className="Events_Banner">
        <button className="Carousel_Arrow" name="left" onClick={slideCarousel}>
          ◀
        </button>
        <div className="Events_Carousel">
          {homeData?.eventsInfo.map((event, idx) => {
            return (
              <CarouselSlide
                bgUrl={event.eventTitleImageURL}
                key={`slide${event.eventId}`}
                style={carouselStyleToSlide}
                ref={carouselRef}
              >
                <div className="Event_Number_Text">
                  {idx + 1} / {homeData.eventsInfo.length}
                </div>
                <div className="Event_Caption_Text">
                  <Link to={`/events/${event.eventId}`}>
                    <h4 className="Event_Title">{event.title}</h4>
                  </Link>
                  <p>{`${event.createdAt} ~ ${event.endAt}`}</p>
                </div>
              </CarouselSlide>
            );
          })}
        </div>
        <button className="Carousel_Arrow" name="right" onClick={slideCarousel}>
          ▶
        </button>
      </div>
      <div className="Top_Sales_Banner">
        {homeData?.topRankBanners.map((topRankCategory, idx) => {
          return (
            <Link
              to={`/items-top-list/${topRankCategory.categoryENName}`}
              className="Top_Sales"
              key={`topSales${idx}`}
            >
              <TopSalesContent bgUrl={topRankCategory.topListURL}>
                <p>이 달의 Top 10 {topRankCategory.categoryKRName}</p>
              </TopSalesContent>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
