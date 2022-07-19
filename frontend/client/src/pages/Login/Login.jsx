import Announcement from "../../components/Announcement";
import Navbar from "../../components/Navbar";
import {
  Container,
  Input,
  InputWrapper,
  Wrapper,
} from "../../global/GlobalStyle.styled";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";
import { reset, login } from "../../feature/user/userSlice";

const Login = () => {
  const [userData, setUserdata] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setUserdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Please enter email and password");
    } else {
      const userInput = { email, password };
      dispatch(login(userInput));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Announcement />
      <Navbar />
      <Container>
        <Wrapper
          bShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
          mg="2rem"
          gap="1.5rem"
          fDirection="column"
          pd="2rem"
          bgColor="white"
          bRadius="10px"
          mWidth="600px"
          color="#041656"
        >
          <h3 className="login-header">ĐĂNG NHẬP</h3>
          <form
            onSubmit={handleSubmit}
            className="login-form-container"
            action=""
          >
            <InputWrapper fDirection="column">
              <label className="login-label" htmlFor="">
                Địa chỉ email
              </label>
              <Input onChange={handleChange} name="email" type="email" />
            </InputWrapper>
            <InputWrapper fDirection="column">
              <div className="login-label-wrapper">
                <label className="login-label" htmlFor="">
                  Mật khẩu
                </label>
                <Link className="" to="#">
                  <label className="login-label" htmlFor="">
                    Quên mật khẩu
                  </label>
                </Link>
              </div>
              <Input onChange={handleChange} name="password" type="password" />
            </InputWrapper>
            <div className="login-btn-grp">
              <button type="submit" className="btn login-btn">
                Đăng nhập
              </button>
              <Link className="link" to="/">
                <button className="btn btn-back-home">Trang chủ</button>
              </Link>
            </div>
            <div className="login-to-register">
              <p>
                Chưa có tài khoản?
                <span>
                  <Link className="" to="/register">
                    Đăng ký
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
