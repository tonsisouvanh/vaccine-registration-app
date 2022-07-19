import { Container, Wrapper } from "../../global/GlobalStyle.styled";
import styled from "styled-components";
import Slider from "../../components/Slider";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Announcement from "../../components/Announcement";
import VaccineCatalog from "../../components/VaccineCatalog/VaccineCatalog";
// const HomeContainer = styled.div`
//   background-color: transparent;
//   width: 100%;
//   max-width: 1024px;
// `;

const Home = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <Container>
        <Wrapper fDirection="column">
          <Slider />
          <VaccineCatalog text={"DANH MỤC VACCINE"} />
          <VaccineCatalog text={"VACCINE TƯ VẤN"} />
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
