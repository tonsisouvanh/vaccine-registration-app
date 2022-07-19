import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "transparent")};
  color: ${({ color }) => (color ? color : "unset")};
`;

export const Wrapper = styled.div`
  padding: ${({ pd }) => (pd ? pd : "unset")};
  width: 100%;
  margin: ${({ mg }) => (mg ? mg : "unset")};
  max-width: ${({ mWidth }) => (mWidth ? mWidth : "1024px")};
  display: flex;
  flex-direction: ${({ fDirection }) => (fDirection ? fDirection : "unset")};
  align-items: ${({ alItems }) => (alItems ? alItems : "unset")};
  justify-content: ${({ jContent }) => (jContent ? jContent : "unset")};
  gap: ${({ gap }) => (gap ? gap : "unset")};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "unset")};
  border-radius: ${({ bRadius }) => (bRadius ? bRadius : "unset")};
  box-shadow: ${({ bShadow }) => (bShadow ? bShadow : "unset")};
  color: ${({ color }) => (color ? color : "unset")};
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${({ fDirection }) => (fDirection ? fDirection : "unset")};
  align-items: ${({ aItems }) => (aItems ? aItems : "unset")};
  justify-content: ${({ jContent }) => (jContent ? jContent : "unset")};
  gap: ${({ gap }) => (gap ? gap : "0.3rem")};
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  font-size: 17px;
  padding: 0.7rem 0.5rem;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "#F1F1F1")};
  outline-color: #008dc9;
  border: none;
`;

export const Select = styled.select`
  width: 100%;
  border-radius: 5px;
  font-size: 17px;
  padding: 0.7rem 0.5rem;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "#F1F1F1")};
  outline-color: #008dc9;
  border: none;
`;

export const Option = styled.option`
  border: none;
`;
