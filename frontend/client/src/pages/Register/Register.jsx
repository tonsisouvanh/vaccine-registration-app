import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Announcement from "../../components/Announcement";
import Navbar from "../../components/Navbar";
import { selectCity, selectDistrict } from "../../feature/address/addressSlice";
import {
  Container,
  Input,
  InputWrapper,
  Option,
  Select,
  Wrapper,
} from "../../global/GlobalStyle.styled";
import "./Register.css";

import { toast } from "react-toastify";
import { reset, register } from "../../feature/user/userSlice";
import Spinner from "../../components/Spinner/Spinner";

const Register = () => {
  const cities = useSelector(selectCity);
  const districts = useSelector(selectDistrict);
  const [userData, setUserdata] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    sex: "",
    citizenId: "",
    number: "",
    street: "",
    sub_district: "",
    district: "",
    city: "",
  });

  const { fullname, email, password, phone, citizenId } = userData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Đăng ký thành công!");
    }
    if (user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setUserdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullname || !email || !password || !phone || !citizenId) {
      toast.warning("Vùi lòng điền thông tin cần thiết");
    } else {
      const userInput = { ...userData };
      dispatch(register(userInput));
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
          mWidth="800px"
          color="#041656"
        >
          <h3 className="register-header">ĐĂNG KÝ THÀNH VIÊN</h3>
          <form
            onSubmit={handleSubmit}
            className="register-form-container"
            action=""
          >
            <h2>Thông tin người dùng</h2>
            <InputWrapper gap="1rem">
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Họ và tên
                </label>
                <Input name="fullname" onChange={handleChange} type="text" />
              </InputWrapper>
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Giới tính
                </label>
                <Select name="sex" onChange={handleChange}>
                  <Option value=""></Option>
                  <Option value="female">Nam</Option>
                  <Option value="male">Nữ</Option>
                </Select>
              </InputWrapper>
            </InputWrapper>
            <InputWrapper gap="1rem">
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Điện thoại
                </label>
                <Input name="phone" onChange={handleChange} type="text" />
              </InputWrapper>
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Ngày sinh
                </label>
                <Input name="dob" onChange={handleChange} type="date" />
              </InputWrapper>
            </InputWrapper>
            <InputWrapper gap="1rem">
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  CMND/CCCD
                </label>
                <Input name="citizenId" onChange={handleChange} type="text" />
              </InputWrapper>
            </InputWrapper>
            <InputWrapper gap="1rem">
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Địa chỉ email
                </label>
                <Input name="email" onChange={handleChange} type="email" />
              </InputWrapper>
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Mật khẩu
                </label>
                <Input
                  name="password"
                  onChange={handleChange}
                  type="password"
                />
              </InputWrapper>
            </InputWrapper>
            <InputWrapper gap="1rem">
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Số nhà
                </label>
                <Input name="number" onChange={handleChange} type="text" />
              </InputWrapper>
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Tên đường
                </label>
                <Input name="street" onChange={handleChange} type="text" />
              </InputWrapper>
            </InputWrapper>
            <InputWrapper gap="1rem">
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Thành phố/Tỉnh
                </label>
                <Select onChange={handleChange} name="city">
                  <Option value=""></Option>
                  {cities.map((city, index) => (
                    <Option key={index} value={city}>
                      {city}
                    </Option>
                  ))}
                </Select>
              </InputWrapper>
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Quận/Huyện
                </label>
                <Select onChange={handleChange} name="district">
                  <Option value=""></Option>
                  {districts.map((district, index) => (
                    <Option key={index} value={district}>
                      {district}
                    </Option>
                  ))}
                </Select>
              </InputWrapper>
              {/* <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Phường/Xã
                </label>
                <Select onChange={handleChange} id="district">
                  {sub_districts.map((subDistrict,index) => (
                    <Option key={index} value={subDistrict}>{subDistrict}</Option>
                  ))}
                </Select>
              </InputWrapper> */}
            </InputWrapper>

            <h2>Địa điểm nhận thẻ</h2>
            <InputWrapper fDirection="column">
              <label className="register-label" htmlFor="">
                Trung tâm vaccine
              </label>
              <Select>
                {cities.map((city, index) => (
                  <Option key={index} value={city}>
                    {city}
                  </Option>
                ))}
              </Select>
            </InputWrapper>
            <InputWrapper fDirection="column">
              <Input
                type="text"
                placeholder="Địa chỉ trung tâm"
                readOnly={true}
              />
            </InputWrapper>

            <div className="register-btn-grp">
              <button type="submit" className="btn register-btn">
                Đăng ký
              </button>
              <Link className="link" to="/">
                <button className="btn btn-back-home">Trang chủ</button>
              </Link>
            </div>
          </form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
