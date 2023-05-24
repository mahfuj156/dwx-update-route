import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../assets/images/logo.png";
import { login } from "../../../../helper/api";
import { authenticate } from "../../../../utils/auth";
import TextBox from "../../../share/input/TextBox";
function LoginForm() {
  const [user, setUser] = useState({
    username: "",
    password: "", 
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser({ ...user });

    login(
      JSON.stringify({ username: user.username, password: user.password })
    ).then((res) => {
      navigate("/");
      authenticate(res.data.access_token);
    });
  };

  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="login-logo">
        <a href="http://digitalwebxray.com/login">
          <img src={Logo} className="img-responsive" alt="" />
        </a>

        <form onSubmit={handleSubmit}>
          <h3>Sign in</h3>
          <div className="input_items">
            <TextBox
              type="text"
              placeholder="Enter your username"
              labelText="Username"
              name="username"
              value={user.username}
              onChange={handleOnChange}
            />
            <TextBox
              type="password"
              placeholder="Enter your password"
              labelText="Password"
              name="password"
              value={user.password}
              onChange={handleOnChange}
            />
            <div>
              <button className="btn btn-primary">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginForm;
