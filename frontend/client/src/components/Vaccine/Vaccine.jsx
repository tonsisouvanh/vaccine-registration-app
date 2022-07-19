import { Container } from "../../global/GlobalStyle.styled";
import styled from "styled-components";
import "./Vaccine.css";
import { Link } from "react-router-dom";
import { numberFormat } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { addCart, resetCart } from "../../feature/cart/cartSlice";

const Vaccine = ({ vaccine }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const handleAddCart = () => {
    const cartData = {
      userId: user._id,
      vaccineId: vaccine._id,
      price: vaccine.price,
      name: vaccine.name,
      imgUrl: vaccine.imgUrl,
      quantity: 1,
    };
    dispatch(addCart(cartData));
  };
  return (
    <>
      <div className="vaccine-card">
        <Link className="link" to={`/vaccine-detail/${vaccine._id}`}>
          <div className="vaccine-img-container">
            {/* <img src={vaccine.imgUrl} alt="" className="vaccine-img" /> */}
            <div className="vaccine-title-container">
              <h3 className="vaccine-title">{vaccine.name}</h3>
              <p>{vaccine.mad_in}</p>
              <p>{vaccine.type}</p>
              <p className="vaccine-price">
                <span>
                  <i className="fa-solid fa-tag"></i>
                </span>
                {numberFormat(vaccine.price)} VNĐ
              </p>
            </div>
          </div>
        </Link>

        <p>Phòng bệnh</p>
        <p className="vaccine-desc">{vaccine.description}</p>

        {user ? (
          <button onClick={handleAddCart} className="btn vaccine-select-btn">
            CHỌN
          </button>
        ) : (
          <Link to="/login">
            <button className="btn vaccine-select-btn">CHỌN</button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Vaccine;
