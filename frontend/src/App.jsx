import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import HomePage from "./Components/HomePage";
//import RegisterPage from "./Components/RegisterPage";
//import PageNotFound from "./Components/PageNotFound";
import HomePage from "./Components/HomePage";
import RegisterPage from "./Components/RegisterPage";
import PageNotFound from "./Components/PageNotFound";
import "./App.css";
//import LoginPage from "./Components/LoginPage";
//import PrivatePage from "./Components/PrivatePage";
//import PrivateRoute from "./Components/PrivateRoute";
//import NotAuthorized from "./Components/NotAuthorized";
import LoginPage from "./Components/LoginPage";
import PrivatePage from "./Components/PrivatePage";
import PrivateRoute from "./Components/PrivateRoute";
import NotAuthorized from "./Components/NotAuthorizedpage";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/private" element={<PrivatePage />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;