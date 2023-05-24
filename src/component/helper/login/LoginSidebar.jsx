import { LoginContact } from "./LoginSidebar/LoginContact";
import LoginForm from "./LoginSidebar/LoginForm";

export const LoginSidebar = () => {
  return (
    <>
      <div className="col-md-3 login-form-1">
        <LoginForm />
        <LoginContact />
      </div>
    </>
  );
};
