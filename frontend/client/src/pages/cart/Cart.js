import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Announcement from "../../components/Announcement";
import { Container, Wrapper } from "../../global/GlobalStyle.styled";
import { getCart, resetCart } from "../../feature/cart/cartSlice";
import Spinner from "../../components/Spinner/Spinner";
import { numberFormat } from "../../utils";

const Title = styled.h1`
  text-align: center;
  font-family: myriad_bold;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-size: 15px;
  cursor: pointer;
  border: 2px solid #0198d8e7;
  background-color: ${(props) =>
    props.type === "filled" ? "#0198d8e7" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
  gap: 1rem;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 20px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 25px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  background-color: #041656;
  color: white;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  text-align: center;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span`
  font-size: 17px;
`;

const Cart = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userData = {
    userId: user?._id,
    token: user?.token,
  };
  const { products, isSuccess, isLoading } = useSelector((state) => state.cart);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart(userData));

    dispatch(resetCart());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      <Announcement />
      <Navbar />
      <Container>
        <Wrapper
          pd="1rem"
          bgColor="white"
          mg="1.5rem 0"
          bRadius="10px"
          fDirection="column"
        >
          <Title>Giở hàng của bạn</Title>
          <Top>
            <TopButton>Tiếp tục đặt vaccine</TopButton>
            <TopTexts>
              <TopText>
                Giỏ hàng({products?.length ? products?.length : 0})
              </TopText>
            </TopTexts>
            <Link to={products?.length ? "/checkout" : "/vaccines-list"}>
              <TopButton type="filled">CHECKOUT NOW</TopButton>
            </Link>
          </Top>
          <Bottom>
            <Info>
              {products &&
                products.map((item, index) => (
                  <div key={index}>
                    <Product>
                      <ProductDetail>
                        <Image src={item.imgUrl} />
                        <Details>
                          <ProductName>
                            <b>Vaccine:</b> {item.name}
                          </ProductName>
                          <ProductId>
                            <b>ID:</b> {item._id}
                          </ProductId>
                          <ProductSize>
                            <b>Type:</b> Ung thu
                          </ProductSize>
                        </Details>
                      </ProductDetail>
                      <PriceDetail>
                        <ProductAmountContainer>
                          <Add />
                          <ProductAmount>{item.quantity}</ProductAmount>
                          <Remove />
                        </ProductAmountContainer>
                        <ProductPrice>
                          {numberFormat(item.price)} VND
                        </ProductPrice>
                      </PriceDetail>
                    </Product>
                    <Hr />
                  </div>
                ))}
            </Info>
            <Summary>
              <SummaryTitle>ĐƠN HÀNG</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Tổng tiền sản phẩm</SummaryItemText>
                <SummaryItemPrice>
                  {numberFormat(cart.total)} VND
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Chi phí phát sinh</SummaryItemText>
                <SummaryItemPrice>0 VND</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Tổng tiền</SummaryItemText>
                <SummaryItemPrice>
                  {numberFormat(cart.total)} VND
                </SummaryItemPrice>
              </SummaryItem>
            </Summary>
          </Bottom>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Cart;
