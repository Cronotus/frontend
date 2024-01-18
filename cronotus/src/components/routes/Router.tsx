import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Browser from "./Browser";
import Profile from "./Profile";
import NoMatch from "../errors/NoMatch";
import Layout from "./Layout";
import Login from "./Login";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="browser" element={<Browser />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default Router;
