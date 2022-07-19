import React, { useState } from "react";
import styled from "styled-components";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
// import { sliderItems } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  /* height: 40vh; */
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin-top: 1rem;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: transparent;
`;

const ImgContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex: 1;
`;

const Image = styled.img`
  object-fit: contain;
  height: 100%;
`;

// const InfoContainer = styled.div`
//   flex: 1;
//   padding: 70px;
// `;

// const Title = styled.h1`
//   font-size: 70px;
// `;

// const Desc = styled.p`
//   margin: 50px 0px;
//   font-size: 20px;
//   font-weight: 500;
//   letter-spacing: 3px;
// `;

// const Button = styled.button`
//   padding: 10px;
//   font-size: 20px;
//   background-color: transparent;
//   cursor: pointer;
// `;

const images = [
  {
    url: "https://cdn.upmc.com/-/media/upmc/campaigns/covid-vaccine/covid_vaccine_banner_desktop.jpg?la=en&rev=1024a6a7321f40dbbdb960a4ade1f782&h=300&w=1140&la=en&hash=75DC91BDE5C06A4B3BC345C6888469F9",
  },
  { url: "https://www.nnva.gov/ImageRepository/Document?documentID=28579" },
  {
    url: "https://www.austinisd.org/sites/default/files/pg-bnrs/2021-09/covid%20vaccine%20banner%20280_0.png",
  },
  {
    url: "https://sd29.senate.ca.gov/sites/sd29.senate.ca.gov/files/images/COVIDVaccineInformationBanner.jpg",
  },
];

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < images.length - 1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <>
      <Container>
        <Arrow direction="left" onClick={() => handleClick("left")}>
          <ArrowLeftOutlined />
        </Arrow>
        <Wrapper slideIndex={slideIndex} fDirection="column">
          {images.map((item, index) => (
            <Slide key={index}>
              <ImgContainer>
                <Image src={item.url} />
              </ImgContainer>
              {/* <InfoContainer>
                <Title>{item.title}</Title>
                <Desc>{item.desc}</Desc>
                <Button>SHOW NOW</Button>
              </InfoContainer> */}
            </Slide>
          ))}
        </Wrapper>
        <Arrow direction="right" onClick={() => handleClick("right")}>
          <ArrowRightOutlined />
        </Arrow>
      </Container>
    </>
  );
};

export default Slider;
