import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 16vh;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Announcement = () => {
  return (
    <>
      <Container>
        <img
          src="https://vnvc.vn/wp-content/uploads/2021/06/virus-corona-covid-19-pc.jpg"
          alt=""
        />
      </Container>
    </>
  );
};

export default Announcement;
