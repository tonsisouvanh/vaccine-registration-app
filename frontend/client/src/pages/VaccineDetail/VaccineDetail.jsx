import Announcement from "../../components/Announcement";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Container, Wrapper } from "../../global/GlobalStyle.styled";
import "./VaccineDetail.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVaccines, reset } from "../../feature/vaccine/vaccineSlice";

import Spinner from "../../components/Spinner/Spinner";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import vaccineService from "../../feature/vaccine/vaccineService";
import { numberFormat } from "../../utils/index";
const VaccineDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, vaccines } = useSelector((state) => state.vaccine);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getVaccines());

    dispatch(reset());
  }, [dispatch]);

  // if (isLoading) {
  //   return (
  //     <>
  //       <Spinner />
  //     </>
  //   );
  // }
  return (
    <>
      <Announcement />
      <Navbar />
      <Container>
        {vaccines &&
          vaccines
            .filter((filter) => filter._id === id)
            .map((vaccine) => (
              <Wrapper key={vaccine._id} gap="1rem" mg="1rem 0 1rem 0">
                <div className="vaccine-detail-leftCol">
                  <h2 className="vaccine-detail-header">{vaccine.name}</h2>
                  <div className="vaccdetail-img-container">
                    <img
                      src={vaccine.imgUrl}
                      alt=""
                      className="vaccdetail-img"
                    />
                  </div>
                  <p className="vaccdetail-description">
                    {vaccine.description}
                  </p>
                  <div className="vaccdetail-content-wrapper">
                    <p className="vaccdetail-content-header">Phòng bệnh</p>
                    <ul className="vaccdetail-list-container">
                      <li className="vaccdetail-list-item">{vaccine.type}</li>
                    </ul>
                  </div>
                  <div className="vaccdetail-content-wrapper">
                    <p className="vaccdetail-content-header">Nguồn gốc</p>
                    <ul className="vaccdetail-list-container">
                      <li className="vaccdetail-list-item">
                        {vaccine.made_in}
                      </li>
                    </ul>
                  </div>
                  <div className="vaccdetail-content-wrapper">
                    <p className="vaccdetail-content-header">Lịch uống</p>
                    <ul className="vaccdetail-list-container">
                      {vaccine.vaccine_schedule.map((item, index) => (
                        <li key={index} className="vaccdetail-list-item">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="vaccdetail-content-wrapper">
                    <p className="vaccdetail-content-header">Bảo quản</p>
                    <ul className="vaccdetail-list-container">
                      {vaccine.preservation.map((item, index) => (
                        <li key={index} className="vaccdetail-list-item">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="vaccine-detail-rightCol">
                  <div className="vaccdetail-price-wrapper">
                    <h3>{vaccine.name}</h3>
                    <p>{vaccine.made_in}</p>
                    <p className="vaccdetail-price">
                      <span>
                        <i className="fa-solid fa-tag"></i>
                      </span>
                      {numberFormat(vaccine.price)} VNĐ
                    </p>
                    <p>Phòng bệnh</p>
                    <p>{vaccine.type}</p>

                    {user ? (
                      <button className="btn vaccdetail-select-btn">
                        CHỌN
                      </button>
                    ) : (
                      <Link to="/login">
                        <button className="btn vaccdetail-select-btn">
                          CHỌN
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </Wrapper>
            ))}
      </Container>
      <Footer />
    </>
  );
};

export default VaccineDetail;
