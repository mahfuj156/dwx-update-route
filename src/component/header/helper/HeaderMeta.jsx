import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import { signOut, userInfo } from "../../../utils/auth";
export default function HeaderMeta() {
  const { username } = userInfo();
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar navbar-custom-top no-print noprint">
        <div className="container-fluid">
          <div className="navbar-header col-md-6">
            <Link className="navbar-brand" to="#">
              <img src={Logo} className="img-responsive" alt="" />
            </Link>
            <h3>Hotline : +880 1759497773, +8801867074078</h3>
          </div>
          <div className="collapse navbar-collapse col-md-6">
            <ul className="nav navbar-nav navbar-right">
              <li className=" ">
                <Link to="#"> {username} </Link>
              </li>
              <li className=" ">
                <button
                  onClick={() => {
                    signOut(() => {
                      navigate("/login");
                    });
                  }}
                >
                  {" "}
                  Logout{" "}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
