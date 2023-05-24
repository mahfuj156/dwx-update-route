import styled from "styled-components";

const FooterWrapper = styled.div`
  background-color: rgb(233 233 233);
  color: rgb(51 122 183);
  font-size: 14px;
  text-align: center;
  padding: 17px;
  margin-top: 50px;
`;
export default function Footer() {
  return (
    <FooterWrapper>
      <div className="copywrite">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p>Copywrite @ 2023 Digital Web Xray</p>
            </div>
          </div>
        </div>
      </div>
    </FooterWrapper>
  );
}
