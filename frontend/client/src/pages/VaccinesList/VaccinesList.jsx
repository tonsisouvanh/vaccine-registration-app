import Announcement from "../../components/Announcement";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Vaccines from "../../components/Vaccine/Vaccines";
import VaccinesSortBar from "../../components/Vaccine/VaccinesSortBar";
import { Container, Wrapper } from "../../global/GlobalStyle.styled";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVaccines, reset } from "../../feature/vaccine/vaccineSlice";

import Spinner from "../../components/Spinner/Spinner";

const VaccinesList = () => {
  const [sortOption, setSortOption] = useState("");
  const [keyword, setKeyword] = useState("");
  return (
    <>
      <Announcement />
      <Navbar />
      <Container bgColor="#eef0f5">
        <Wrapper mg="0 0 1rem" gap="1rem" fDirection="column">
          <VaccinesSortBar
            sortOption={sortOption}
            setSortOption={setSortOption}
            setKeyword={setKeyword}
          />
          <Vaccines keyword={keyword} sortOption={sortOption} />
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default VaccinesList;
