import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../../global/GlobalStyle.styled";
import "./VaccineCatalog.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getVaccines } from "../../feature/vaccine/vaccineSlice";

const VaccineCatalog = ({ text }) => {
  const { isLoading, vaccines } = useSelector((state) => state.vaccine);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVaccines());
  }, [dispatch]);

  return (
    <>
      <Container>
        <div className="vaccine-catalog-container">
          <div className="vaccatal-header-wrapper">
            <h2 className="vaccatal-header">{text}</h2>
            <Link className="link view-all-link" to="/vaccines-list">
              <p>View all</p>
            </Link>
          </div>

          <div className="vaccatal-cards">
            {vaccines &&
              vaccines.slice(0, 8).map((vaccine) => (
                <div key={vaccine._id} className="vaccatal-card">
                  <Link className="link" to={`/vaccine-detail/${vaccine._id}`}>
                    <div className="vaccatal-img-wrapper">
                      <img
                        src={vaccine.imgUrl}
                        alt=""
                        className="vaccatal-img"
                      />
                    </div>
                    <div className="vaccatal-title">
                      <p className="vaccatal-title-text">{vaccine.name}</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default VaccineCatalog;
