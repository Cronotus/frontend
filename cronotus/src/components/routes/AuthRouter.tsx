import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const AuthRouter = (props: { onLogin: () => void }) => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Login onLogin={props.onLogin} />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AuthRouter;
