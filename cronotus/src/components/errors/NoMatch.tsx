import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <>
      <h1>Nothing to see here. Move along.</h1>
      <Link to="/">Go to Home page</Link>
    </>
  );
};

export default NoMatch;
