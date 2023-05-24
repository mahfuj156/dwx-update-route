import jwtDecode from "jwt-decode";

export const authenticate = (token, cb) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", JSON.stringify(token));
    cb();
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;

  if (localStorage.getItem("token")) {
    const { exp } = jwtDecode(JSON.parse(localStorage.getItem("token")));

    if (new Date().getTime() < exp * 1000) {
      return true;
    } else {
      localStorage.removeItem("jwtToken");
      return false;
    }
  } else { 
    return false;
  }
};

export const userInfo = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const decode = jwtDecode(token);

  return { ...decode, token: token };
};

export const signOut = (cb) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    cb();
  }
};
