import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Browser from "./routes/Browser";
import Profile from "./routes/Profile";
import NoMatch from "./errors/NoMatch";
import Layout from "./Layout";

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
