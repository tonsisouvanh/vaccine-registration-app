import { Wrapper } from "../../global/GlobalStyle.styled";
import styled from "styled-components";

import "./VaccinesSortBar.css";
import { useState } from "react";
const VaccinesSortBar = ({ sortOption, setSortOption, setKeyword }) => {
  return (
    <>
      <Wrapper gap="1rem" fDirection="column">
        <div className="vaccines-header-wrapper">
          <h2 className="vaccines-header">THÔNG TIN SẢN PHẨM VACCINES</h2>
        </div>
        <div className="vaccines-sort-bar">
          <div className="left-sort-bar">
            <div className="sort-bar-wrapper">
              <label className="sort-bar-label">Lọc vắc xin theo</label>
              <select
                onChange={(e) => setSortOption(e.target.value)}
                className="sort-select"
                name="vaccinecate"
                id="vaccinecate"
              >
                <option value="all">Tất cả</option>
                <option value="newest">Mới</option>
                <option value="asc">Giá tăng dần</option>
                <option value="desc">Giá Giảm dần</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
                <option value="mostsell">Mua nhiều nhất</option>
              </select>
            </div>
          </div>
          <div className="sort-bar-wrapper">
            <input
              className="search-input"
              placeholder="Nhập vào tên vaccine"
              type="text"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <span className="search-icon-wrapper">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default VaccinesSortBar;
