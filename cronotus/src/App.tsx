import AuthRouter from "./components/routes/AuthRouter";
import Router from "./components/routes/Router";

function App() {
  return true ? <AuthRouter /> : <Router />;
}

export default App;
