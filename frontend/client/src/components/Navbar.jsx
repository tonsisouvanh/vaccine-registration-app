import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Home,
  ShoppingCart,
  LockOpen,
  PersonOutline,
  ExitToAppOutlined,
} from "@mui/icons-material";

import MoreIcon from "@mui/icons-material/More";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../feature/user/userSlice";
import { getCart, resetCart } from "../feature/cart/cartSlice";
// import { Container } from "../global/Container.styled";
const Container = styled.div`
  background-color: #008dc9;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 99;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const MenuBar = styled.div`
  /* height: 7.5vh; */
  width: 100%;
  max-width: 1024px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const Logo = styled.div`
  img {
    width: 3rem;
    height: auto;
  }
`;
const MenuItems = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 2rem;
  font-size: 15px;
  position: relative;
`;
const MenuItem = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  .icon {
    margin-right: 0.5rem;
  }
  .fa-solid {
    font-size: 1.1rem;
  }
`;
const AccountMenu = styled.div``;

const Button = styled.button`
  border: 2px solid black;
  border-radius: 10px;
  width: 6rem;
  height: 2.5rem;
  background-color: ${(props) =>
    props.buttonType === "signin" ? "transparent" : "#222222"};
  color: ${(props) => (props.buttonType === "signin" ? "#222222" : "#ffffff")};
  transition: all ease-in-out 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.buttonType === "signin" ? "#222222" : "transparent"};
    color: ${(props) =>
      props.buttonType === "signin" ? "#ffffff" : "#222222"};
  }
`;
const Badget = styled.p`
  position: absolute;
  top: -7px;
  right: 0;
  background-color: #f8b637;
  padding: 2px 5px;
  border-radius: 10px;
`;

const Navbar = () => {
  const { products } = useSelector((state) => state.cart);

  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      <Container>
        <MenuBar>
          <MenuItems>
            <Logo>
              <img
                src="https://www.durham.ca/en/health-and-wellness/resources/Images/About-COVID-19-Vaccine-Icon.png"
                alt=""
              />
            </Logo>
            <Link to="/" className="link">
              <MenuItem>
                <Home className="icon" />
                Trang chủ
              </MenuItem>
            </Link>
            <Link to="/vaccines-list" className="link">
              <MenuItem>
                <ShoppingCart className="icon" />
                Đặt mua vaccine
              </MenuItem>
            </Link>
            <Link to="/vaccine-registration" className="link">
              <MenuItem>
                <i className="fa-solid fa-syringe icon"></i>
                Đăng ký tiêm
              </MenuItem>
            </Link>
            <Link to="/vaccine-history" className="link">
              <MenuItem>
                <i className="fa-solid fa-clock-rotate-left icon"></i>
                Lịch sử tiêm
              </MenuItem>
            </Link>
          </MenuItems>
          <MenuItems>
            {!user && (
              <>
                <Link to="/login" className="link">
                  <MenuItem>
                    <LockOpen className="icon" />
                    Đăng nhập
                  </MenuItem>
                </Link>
                <Link to="/register" className="link">
                  <MenuItem>
                    <PersonOutline className="icon" />
                    Đăng ký
                  </MenuItem>
                </Link>
              </>
            )}
            {user && (
              <>
                <Link to="/cart" className="link">
                  <MenuItem>
                    <ShoppingCart className="icon"></ShoppingCart>
                    <Badget>{products?.length ? products?.length : 0}</Badget>
                  </MenuItem>
                </Link>

                <Link to="/" className="link">
                  <MenuItem>
                    <PersonOutline className="icon" />
                    {user.fullname}
                  </MenuItem>
                </Link>

                <MenuItem onClick={handleLogout}>
                  <ExitToAppOutlined className="icon" />
                  Đăng xuất
                </MenuItem>
              </>
            )}
          </MenuItems>
        </MenuBar>
      </Container>
    </>
  );
};

export default Navbar;
