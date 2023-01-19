import dummyData from "./../data/HomeData.json";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Style/home.css";

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
  border: solid 0.5px burlywood;
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
    color: paleturquoise;
  }
`;

export default function Home() {
  const [xPos, setXPos] = useState(0);
  const [carouselStyleToSlide, setCarouselStyleToSlide] = useState({
    transform: `translateX(${xPos}px)`,
  });

  useEffect(() => {
    setCarouselStyleToSlide({ transform: `translateX(${xPos}px)` });
  }, [xPos]);

  const slideCarousel = (event: React.MouseEvent<HTMLButtonElement>) => {
    const arrowButton: HTMLButtonElement = event.currentTarget;
    const maxXPos: number = -1000 * (dummyData.eventsInfo.length - 1);

    if (arrowButton.name === "left" && xPos === 0) {
      setXPos(maxXPos);
    } else if (arrowButton.name === "left" && xPos !== 0) {
      setXPos(xPos + 1000);
    } else if (arrowButton.name === "right" && xPos === maxXPos) {
      setXPos(0);
    } else if (arrowButton.name === "right" && xPos > maxXPos) {
      setXPos(xPos - 1000);
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
                <div className="Event_Caption_Text">
                  <Link to="/events/:eventId">
                    <h4 className="Event_Title">{a.title}</h4>
                  </Link>
                  <p>{`${a.createdAt} ~ ${a.endAt}`}</p>
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
        {dummyData.topRankBanners.map((a, idx) => {
          return (
            <Link
              to="/items-top-list"
              className="Top_Sales"
              key={`topSales${idx}`}
            >
              <TopSalesContent bgUrl={a.topListURL}>
                <p>이 달의 Top 10 {a.categoryKRName}</p>
              </TopSalesContent>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
