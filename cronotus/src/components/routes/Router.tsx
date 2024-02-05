import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Browser from "./Browser";
import Profile from "./Profile";
import NoMatch from "../errors/NoMatch";
import Layout from "./Layout";
import { SportsEvent } from "./Event";

const Router = (props: { onLogout: () => void }) => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="browser" element={<Browser />} />
        <Route path="event/:id" element={<SportsEvent />} />
        <Route path="profile" element={<Profile onLogout={props.onLogout} />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default Router;
