import { navItems } from "../menuData";
import Nav from "./Nav";

export default function HeaderNav() {
  return (
    <nav className="navbar navbar-custom admin no-print noprint admin_header_sec">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="main-menu">
          <Nav navItems={navItems} />
        </div>
      </div>
    </nav>
  );
}
