import AuthRouter from "./routes/AuthRouter";
import { useEffect, useState } from "react";
import Router from "./routes/Router";
import { useNavigate } from "react-router-dom";

const AuthenticationHandler = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const accessToken = localStorage.getItem("accessToken");
      setIsLoggedIn(!!accessToken);
    };

    checkLoggedInStatus();

    const storageChangeListener = () => {
      checkLoggedInStatus();
    };

    window.addEventListener("storage", storageChangeListener);

    return () => {
      window.removeEventListener("storage", storageChangeListener);
    };
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  console.log(isLoggedIn);
  return !isLoggedIn ? (
    <AuthRouter onLogin={handleLogin} />
  ) : (
    <Router onLogout={handleLogout} />
  );
};

export default AuthenticationHandler;
