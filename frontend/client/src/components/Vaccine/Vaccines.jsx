import Vaccine from "./Vaccine";
import "./Vaccines.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVaccines, reset } from "../../feature/vaccine/vaccineSlice";

import Spinner from "../../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";

const Vaccines = ({ sortOption, keyword }) => {
  const dispatch = useDispatch();
  const { isLoading, vaccines } = useSelector((state) => state.vaccine);
  const [filteredVaccines, setFilteredVaccines] = useState();

  useEffect(() => {
    dispatch(getVaccines());
    dispatch(reset());
  }, [isLoading, dispatch]);

  useEffect(() => {
    setFilteredVaccines(
      vaccines.filter((vaccine) => {
        if (keyword === "") {
          return vaccine;
        } else {
          return vaccine.name.toLowerCase().includes(keyword.toLowerCase());
        }
      })
    );
  }, [keyword, vaccines]);

  useEffect(() => {
    let data = [...vaccines];

    switch (sortOption) {
      case "asc":
        setFilteredVaccines(data?.sort((a, b) => (a.price > b.price ? 1 : -1)));
        break;
      case "desc":
        setFilteredVaccines(data?.sort((a, b) => (a.price > b.price ? -1 : 1)));
        break;
      case "az":
        setFilteredVaccines(data?.sort((a, b) => (a.name > b.name ? 1 : 1)));
        break;
      case "za":
        setFilteredVaccines(data?.sort((a, b) => (a.name > b.name ? -1 : 1)));
        break;
      case "newest":
        setFilteredVaccines(data?.sort((a, b) => a.createdAt - b.createdAt));
        break;
      default:
        setFilteredVaccines([...vaccines]);
        break;
    }
  }, [sortOption, vaccines]);

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <>
      {keyword !== "" || sortOption !== "" ? (
        <div className="vaccines-container">
          {filteredVaccines &&
            filteredVaccines.map((vaccine) => (
              <Vaccine key={vaccine._id} vaccine={vaccine}></Vaccine>
            ))}
        </div>
      ) : (
        <div className="vaccines-container">
          {vaccines &&
            vaccines.map((vaccine) => (
              <Vaccine key={vaccine._id} vaccine={vaccine}></Vaccine>
            ))}
        </div>
      )}
    </>
  );
};

export default Vaccines;
