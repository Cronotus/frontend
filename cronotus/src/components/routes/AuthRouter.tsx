import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AuthRouter;
