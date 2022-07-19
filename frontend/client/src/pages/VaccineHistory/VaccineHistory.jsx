import Announcement from "../../components/Announcement";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import {
  Container,
  Input,
  InputWrapper,
  Option,
  Select,
  Wrapper,
} from "../../global/GlobalStyle.styled";
import "./VaccineHistory.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getRegistrationHistory,
  reset,
} from "../../feature/registration/registrationSlice";

import { dateFormat } from "../../utils";
import axios from "axios";

const VaccineHistory = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [registration, setRegistration] = useState([]);

  const [userData, setUserdata] = useState({
    phone: "",
    citizenId: "",
  });

  useEffect(() => {
    if (user) {
      const fetchData = () => {
        axios
          .get("http://localhost:8000/api/vaccine-registration/history", {
            params: { phone: user.phone, citizenId: user.citizenId },
          })
          .then((res) => {
            setRegistration(res.data);
          });
      };

      fetchData();
    }
  }, []);

  const { phone, citizenId } = userData;

  const handleChange = (e) => {
    setUserdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!phone || !citizenId) {
      toast.warning("Vui lòng nhập vào số điện thoại và CCCD/CMND");
    } else {
      const fetchData = () => {
        axios
          .get("http://localhost:8000/api/vaccine-registration/history", {
            params: { phone: phone, citizenId: citizenId },
          })
          .then((res) => {
            setRegistration(res.data);
          })
          .catch((err) => {
            console.log(err.message);
            if (registration.length === 0) {
              toast.error("Thông tin không tồn tại");
            }
          });
      };
      fetchData();
    }
  };

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
          {!user && (
            <>
              <h3 className="vaccHistory-header">TRA CƯU LỊCH SỬ TIÊM CHỦNG</h3>
              <form
                onSubmit={handleSubmit}
                className="register-form-container"
                action=""
              >
                <InputWrapper gap="1rem">
                  <InputWrapper fDirection="column">
                    <label className="register-label" htmlFor="">
                      Số điện thoại
                    </label>
                    <Input onChange={handleChange} name="phone" type="text" />
                  </InputWrapper>
                </InputWrapper>
                <InputWrapper gap="1rem">
                  <InputWrapper fDirection="column">
                    <label className="register-label" htmlFor="">
                      CMND/CCCD
                    </label>
                    <Input
                      onChange={handleChange}
                      name="citizenId"
                      type="text"
                    />
                  </InputWrapper>
                </InputWrapper>
                <button
                  // disabled={isLoading}
                  type="submit"
                  className="btn"
                >
                  <i className="fa-solid fa-magnifying-glass icon"></i>
                  Tra cứu
                </button>
              </form>
            </>
          )}

          <h3 className="vaccHistory-header">DANH SÁCH LỊCH SỬ TIÊM CHỦNG</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Vắc xin</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">
                    Địa điểm tiêm
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">
                    Ngày tiêm
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">
                    Trạng thái
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {registration &&
                  registration.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <ul className="history-vaccine-list">
                          {row.vaccinesId &&
                            row.vaccinesId.map((vacc) => (
                              <li key={vacc._id} className="history-list-item">
                                {vacc.name}
                              </li>
                            ))}
                        </ul>
                      </TableCell>
                      <TableCell align="right">
                        {row.vaccination_center.center_name} -
                        {row.vaccination_center.address}
                      </TableCell>
                      <TableCell sx={{ minWidth: 100 }} align="right">
                        {dateFormat(row.vaccination_date)}
                      </TableCell>
                      <TableCell
                        sx={{
                          minWidth: 100,
                          color: row.status ? "green" : "red",
                        }}
                        align="right"
                      >
                        {row.status ? "Đã tiêm" : "Chưa tiêm"}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default VaccineHistory;
