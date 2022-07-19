import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Announcement from "../../components/Announcement";
import Navbar from "../../components/Navbar";

import { getVaccines } from "../../feature/vaccine/vaccineSlice";
import { getCenters } from "../../feature/center/centerSlice";
import { MultiSelect } from "react-multi-select-component";
import {
  registerVaccine,
  reset,
} from "../../feature/registration/registrationSlice";

import {
  Container,
  Input,
  InputWrapper,
  Option,
  Select,
  Wrapper,
} from "../../global/GlobalStyle.styled";
import { numberFormat } from "../../utils";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";
import { format } from "date-fns";
import Footer from "../../components/Footer";

const VaccineRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [centerAddress, setCenterAddress] = useState("");
  const [centerName, setCenterName] = useState("");

  const { vaccines } = useSelector((state) => state.vaccine);
  const { centers } = useSelector((state) => state.center);
  const userLoggedIn = JSON.parse(localStorage.getItem("user"));

  const [registrationData, setRegistrationData] = useState({
    phone: "",
    fullname: "",
    email: "",
    dob: "",
    sex: "Nam",
    citizenId: "",

    number: "",
    street: "",
    sub_district: "",
    district: "",
    city: "",
    vaccination_date: "",
  });

  // Destruct registration data object
  const { fullname, email, phone, citizenId, vaccination_date } =
    registrationData;

  // Get registration redux
  const { registration, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.registration
  );

  // fetching vaccines data and centes data
  useEffect(() => {
    dispatch(getVaccines());
    dispatch(getCenters());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Đăng ký tiêm thành công!");
    }

    dispatch(reset());
  }, [registration, isError, isSuccess, message, navigate, dispatch]);

  const handleRegistrationChange = (e) => {
    setRegistrationData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // filter vaccines data and assign to new varaible
  const vaccineOptions = vaccines.map((v) => ({
    label: v.name + " - " + numberFormat(v.price) + " VND",
    value: v._id,
  }));

  // handle value change for vaccie center name & address
  const handleCenterChange = (e) => {
    centers
      .filter((c) => c.name === e.target.value)
      .map((c) => setCenterAddress(c.address));

    setCenterName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userLoggedIn) {
      let vaccinesidInput = [];
      selectedVaccines.map((v) => vaccinesidInput.push(v.value));

      const registrationInput = {
        phone: userLoggedIn.phone,
        fullname: userLoggedIn.fullname,
        email: userLoggedIn.email,
        dob: userLoggedIn.dob,
        sex: userLoggedIn.sex,
        citizenId: userLoggedIn.citizenId,
        number: userLoggedIn.number,
        street: userLoggedIn.street,
        sub_district: userLoggedIn.sub_district,
        district: userLoggedIn.district,
        city: userLoggedIn.city,
        vaccinesId: [...vaccinesidInput],
        center_name: centerName,
        address: centerAddress,
        vaccination_date: vaccination_date,
      };

      console.log(registrationInput);

      dispatch(registerVaccine(registrationInput));
    } else {
      if (
        !fullname ||
        !email ||
        !phone ||
        !citizenId ||
        !centerName ||
        selectedVaccines.length === 0 ||
        !centerAddress
      ) {
        toast.warning("Vùi lòng điền thông tin cần thiết");
      } else {
        if (
          registrationData.vaccination_date <= format(new Date(), "yyyy-MM-dd")
        ) {
          toast.warning("Ngày tiêm không hợp lệ");
        } else {
          // extract vaccine id from selectedVaccines
          let vaccinesidInput = [];
          selectedVaccines.map((v) => vaccinesidInput.push(v.value));

          const registrationInput = {
            ...registrationData,
            vaccinesId: [...vaccinesidInput],
            center_name: centerName,
            address: centerAddress,
          };
          dispatch(registerVaccine(registrationInput));
        }
      }
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
          <h3 className="register-header">ĐĂNG KÝ TIÊM VACCINE</h3>
          <form
            onSubmit={handleSubmit}
            className="register-form-container"
            action=""
          >
            {!userLoggedIn && (
              <>
                <h2>THÔNG TIN NGƯỜI TIÊM</h2>
                <InputWrapper gap="1rem">
                  <InputWrapper fDirection="column">
                    <label className="register-label" htmlFor="">
                      Họ và tên
                    </label>
                    <Input
                      onChange={handleRegistrationChange}
                      name="fullname"
                      type="text"
                    />
                  </InputWrapper>
                  <InputWrapper fDirection="column">
                    <label className="register-label" htmlFor="">
                      Giới tính
                    </label>
                    <Select onChange={handleRegistrationChange} name="sex">
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
                    <Input
                      onChange={handleRegistrationChange}
                      name="phone"
                      type="text"
                    />
                  </InputWrapper>
                  <InputWrapper fDirection="column">
                    <label className="register-label" htmlFor="">
                      Ngày sinh
                    </label>
                    <Input
                      onChange={handleRegistrationChange}
                      name="dob"
                      type="date"
                    />
                  </InputWrapper>
                </InputWrapper>
                <InputWrapper gap="1rem">
                  <InputWrapper fDirection="column">
                    <label className="register-label" htmlFor="">
                      CMND/CCCD
                    </label>
                    <Input
                      onChange={handleRegistrationChange}
                      name="citizenId"
                      type="text"
                    />
                  </InputWrapper>
                  <InputWrapper fDirection="column">
                    <label className="register-label" htmlFor="">
                      Địa chỉ email
                    </label>
                    <Input
                      onChange={handleRegistrationChange}
                      name="email"
                      type="email"
                    />
                  </InputWrapper>
                </InputWrapper>
                <InputWrapper gap="1rem">
                  <InputWrapper fDirection="column">
                    <label className="register-label" htmlFor="">
                      Số nhà
                    </label>
                    <Input
                      onChange={handleRegistrationChange}
                      name="number"
                      type="text"
                    />
                  </InputWrapper>
                  <InputWrapper fDirection="column">
                    <label className="register-label" htmlFor="">
                      Tên đường
                    </label>
                    <Input
                      onChange={handleRegistrationChange}
                      name="street"
                      type="text"
                    />
                  </InputWrapper>
                </InputWrapper>
                <InputWrapper gap="1rem">
                  <InputWrapper fDirection="column">
                    <label className="register-label" htmlFor="">
                      Thành phố/Tỉnh
                    </label>
                    <Input
                      onChange={handleRegistrationChange}
                      name="city"
                      type="text"
                    />
                  </InputWrapper>
                  <InputWrapper fDirection="column">
                    <label className="register-label" htmlFor="">
                      Quận/Huyện
                    </label>
                    <Input
                      onChange={handleRegistrationChange}
                      name="district"
                      type="text"
                    />
                  </InputWrapper>
                  <InputWrapper fDirection="column">
                    <label className="register-label" htmlFor="">
                      Phường/Xã
                    </label>
                    <Input
                      onChange={handleRegistrationChange}
                      name="sub_district"
                      type="text"
                    />
                  </InputWrapper>
                </InputWrapper>
              </>
            )}

            <h2>THÔNG TIN DỊCH VỤ</h2>
            <InputWrapper fDirection="column">
              <label className="register-label" htmlFor="">
                Vaccines
              </label>
              <MultiSelect
                options={vaccineOptions}
                value={selectedVaccines}
                onChange={setSelectedVaccines}
                labelledBy="Select"
              />
            </InputWrapper>
            <InputWrapper fDirection="column">
              <label className="register-label" htmlFor="">
                Trung tâm vaccine
              </label>
              <Select onChange={handleCenterChange}>
                {centers &&
                  centers.map((center) => (
                    <Option key={center._id} value={center.name}>
                      {center.name}
                    </Option>
                  ))}
              </Select>
            </InputWrapper>
            <InputWrapper fDirection="column">
              <Input
                readOnly={true}
                type="text"
                value={centerAddress}
                placeholder="Địa chỉ trung tâm"
              />
            </InputWrapper>
            <InputWrapper fDirection="column">
              <label>Ngày tiêm</label>
              <Input
                onChange={handleRegistrationChange}
                name="vaccination_date"
                type="date"
                placeholder="example"
              />
            </InputWrapper>

            <div className="register-btn-grp">
              {/* <Link className="link" to="/"> */}
              <button
                disabled={isLoading}
                type="submit"
                className="btn btn-back-home"
              >
                Đăng ký tiêm
              </button>
              {/* </Link> */}
            </div>
          </form>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default VaccineRegistration;
