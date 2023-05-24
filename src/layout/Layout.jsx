import "../../src/assets/styles/global.css";
import Footer from "../component/footer/Footer";
import MainHeader from "../component/header/MainHeader";
import Container from "./Container";

export default function Layout({ panel, children }) {
  return (
    <div>
      <div className="print-none">
        <MainHeader />
      </div>
      <div>
        <Container panel={panel}>{children}</Container>
      </div>
      <div className="print-none">
        <Footer />
      </div>
    </div>
  );
}
