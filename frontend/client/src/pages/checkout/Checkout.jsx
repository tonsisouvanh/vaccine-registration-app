import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Announcement from "../../components/Announcement";
import Footer from "../../components/Footer";
import {
  Container,
  Input,
  InputWrapper,
  Option,
  Select,
  Wrapper,
} from "../../global/GlobalStyle.styled";
import { useSelector, useDispatch } from "react-redux";
import { getCart, resetCart } from "../../feature/cart/cartSlice";
import "./Checkout.css";
import { numberFormat } from "../../utils";
import { toast } from "react-toastify";
import axios from "axios";

const Checkout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userData = {
    userId: user?._id,
    token: user?.token,
  };

  const { products } = useSelector((state) => state.cart);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [peyment, setPayment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (peyment === "") {
      toast.warning("Vui lòng chọn phương thức thanh toán");
    } else {
      const orderInput = {
        userId: user._id,
        total: cart.total,
        paymentType: peyment,
        vaccines: products,
      };

      if (orderInput) {
        const createOrder = () => {
          axios
            .post("http://localhost:8000/api/orders/create-order", orderInput)
            .then((res) => {
              if (res) {
                navigate("/");
              }
            })
            .catch((err) => {
              toast.error(err.message);
            });
        };

        createOrder();
      }
    }
  };

  useEffect(() => {
    dispatch(getCart(userData));

    dispatch(resetCart());
  }, [dispatch]);

  return (
    <>
      <Announcement />
      <Container>
        <Wrapper
          bShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
          mg="2rem"
          gap="1.5rem"
          fDirection="column"
          pd="2rem"
          bgColor="white"
          bRadius="10px"
          mWidth="800px"
          color="#041656"
        >
          <h3 className="register-header">TIẾN HÀNH THANH TOÁN</h3>
          <form
            onSubmit={handleSubmit}
            className="register-form-container"
            action=""
          >
            <h2>Thông tin đơn hàng</h2>
            <h3>Khách hàng: {user.fullname}</h3>
            <Wrapper fDirection="column">
              {products &&
                products.map((product, index) => (
                  <Wrapper key={index}>
                    <img
                      className="checkout-vaccine-img"
                      src={product.imgUrl}
                      alt=""
                    />
                    <Wrapper
                      mg="0 0 0 1rem"
                      fDirection="column"
                      jContent="center"
                      gap="10px"
                    >
                      <p>Vắc xin: {product.name}</p>
                      <p>Gía: {numberFormat(product.price)} VND</p>
                      <p>Số lượng: {product.quantity}</p>
                    </Wrapper>
                  </Wrapper>
                ))}
            </Wrapper>
            <h3>Tổng: {numberFormat(cart.total)} VND</h3>

            <InputWrapper fDirection="column">
              <label className="register-label" htmlFor="">
                Chọn phương thức thanh toán
              </label>
              <Select
                name="payment"
                onChange={(e) => setPayment(e.target.value)}
              >
                <Option value=""></Option>
                <Option value="cash">Tiền mặt</Option>
                <Option value="credit">Thẻ</Option>
              </Select>
            </InputWrapper>
            <div className="register-btn-grp">
              <button type="submit" className="btn register-btn">
                Đặt vắc xin
              </button>
              <Link className="link" to="/cart">
                <button className="btn btn-back-home">Trở về giở hàng</button>
              </Link>
            </div>
          </form>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Checkout;
