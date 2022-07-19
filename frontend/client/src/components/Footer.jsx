import styled from "styled-components";
import { Container } from "../global/GlobalStyle.styled";
import { Facebook, Instagram, Twitter, Email } from "@mui/icons-material";
const FooterContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  color: white;
  font-size: 15px;
  padding: 1rem 0;
  .footer-logo {
    width: 3rem;
    height: auto;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1.5fr;
  grid-gap: 1.5rem;
`;
const ContentCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  .split-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    list-style: none;
    .split-listWrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`;
const ContentHeader = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 1.2rem;
`;
const ContentList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  justify-content: cneter;
  text-align: left;
  list-style: none;
  p {
    line-height: 1.7rem;
  }
`;
const ListItem = styled.li`
  font-size: 14px;
`;

const FooterEmail = styled.div``;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
const Input = styled.input`
  height: 31px;
  border-radius: 3px;
  border: none;
  color: #4d4d4d;
  outline-color: #008dc9;
  padding: 0 0.3rem;
`;
const InputTextarea = styled.input`
  height: 101px;
  border-radius: 3px;
  border: none;
  color: #4d4d4d;
  outline-color: #008dc9;
  padding: 0 0.3rem;
`;
const Button = styled.button`
  height: 31px;
  border-radius: 3px;
  border: none;
  background-color: #f8b637;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const FooterSocial = styled.div`
  width: 100%;
  background-color: #20313b;
  color: white;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
const SocialWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;
const Copyright = styled.p`
font-size: 14px;`;

const Footer = () => {
  return (
    <>
      <Container bgColor="#008DC9">
        <FooterContainer>
          <img
            className="footer-logo"
            src="https://www.durham.ca/en/health-and-wellness/resources/Images/About-COVID-19-Vaccine-Icon.png"
            alt=""
          />
          <FooterContent>
            <ContentCol>
              <ContentHeader>Hệ thống Miền Bắc</ContentHeader>
              <ul className="split-list">
                <div className="split-listWrapper">
                  <ListItem>Bắc Giang</ListItem>
                  <ListItem>Hà Nội</ListItem>
                  <ListItem>Ninh Bình</ListItem>
                  <ListItem>Quảng Ninh</ListItem>
                  <ListItem>Vĩnh Phúc</ListItem>
                  <ListItem>Hải Phòng</ListItem>
                  <ListItem>Thái Bình</ListItem>
                </div>
                <div className="split-listWrapper">
                  <ListItem>Bắc Giang</ListItem>
                  <ListItem>Hà Nội</ListItem>
                  <ListItem>Ninh Bình</ListItem>
                  <ListItem>Quảng Ninh</ListItem>
                  <ListItem>Vĩnh Phúc</ListItem>
                  <ListItem>Hải Phòng</ListItem>
                  <ListItem>Thái Bình</ListItem>
                </div>
              </ul>
            </ContentCol>
            <ContentCol>
              <ContentHeader>Hệ thống Miền Nam</ContentHeader>
              <ul className="split-list">
                <div className="split-listWrapper">
                  <ListItem>Bắc Giang</ListItem>
                  <ListItem>Hà Nội</ListItem>
                  <ListItem>Ninh Bình</ListItem>
                  <ListItem>Quảng Ninh</ListItem>
                  <ListItem>Vĩnh Phúc</ListItem>
                  <ListItem>Hải Phòng</ListItem>
                  <ListItem>Thái Bình</ListItem>
                </div>
                <div className="split-listWrapper">
                  <ListItem>Bắc Giang</ListItem>
                  <ListItem>Hà Nội</ListItem>
                  <ListItem>Ninh Bình</ListItem>
                  <ListItem>Quảng Ninh</ListItem>
                  <ListItem>Vĩnh Phúc</ListItem>
                  <ListItem>Hải Phòng</ListItem>
                  <ListItem>Thái Bình</ListItem>
                </div>
              </ul>
            </ContentCol>

            <ContentCol>
              <ContentHeader>Hệ thống Miền Bắc</ContentHeader>
              <ContentList>
                <p>
                  Đặt mua hoặc đăng ký tiêm vaccine một cách dễ dàng, an toàn và
                  đảm bảo chất lượng
                </p>
              </ContentList>
            </ContentCol>

            <ContentCol>
              <ContentHeader>Hệ thống Miền Bắc</ContentHeader>
              <ContentList>
                <ListItem>Công ty: tiêm chủng vaccine</ListItem>
                <ListItem>
                  Địa chỉ: HCMUS, Linh Trung,Thủ Đức, TP. Thủ Đức
                </ListItem>
                <ListItem>Mã số doanh nghiệp: xxxxxxxxxxx</ListItem>
                <ListItem>Số điện thoại: +84 0234211</ListItem>
              </ContentList>
            </ContentCol>
            <FooterEmail>
              <Form>
                <Input type="text" placeholder="example@hotmail.com" />
                <InputTextarea type="textarea" placeholder="Nội dung" />
                <Button type="submit">GỬI</Button>
              </Form>
            </FooterEmail>
          </FooterContent>
        </FooterContainer>
      </Container>
      <FooterSocial>
        <SocialWrapper>
          <Facebook />
          <Instagram />
          <Twitter />
          <Email />
        </SocialWrapper>
        <Copyright>Copyright MDMCQ-18 Group-02 &copy; 2022 </Copyright>
      </FooterSocial>
      {/* <Container bgColor="#20313B" color="white">
          <div>Second Footer</div>
        </Container> */}
    </>
  );
};

export default Footer;
