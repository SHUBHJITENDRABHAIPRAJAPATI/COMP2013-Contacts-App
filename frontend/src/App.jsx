import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import HomePage from "./Components/HomePage";
//import RegisterPage from "./Components/RegisterPage";
//import PageNotFound from "./Components/PageNotFound";
import HomePage from "./Components/HomePage";
import RegisterPage from "./Components/RegisterPage";
import PageNotFound from "./Components/PageNotFound";
import ContactsApp from "./Components/ContactsApp"; 
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
           //route to connect db and then login to website
            <Route path="/private" element={<PrivatePage />} />//private page
          </Route>
          //route to contacts app
          <Route path="/contacts" element={<ContactsApp />} />

          <Route path="/" element={<HomePage />} />//home page for contact card

          <Route path="/register" element={<RegisterPage />} />//register page
          <Route path="/login" element={<LoginPage />} />//login page
          <Route path="/not-authorized" element={<NotAuthorized />} />//not authorized page
          <Route path="*" element={<PageNotFound />} />//page not found
          


        </Routes>
      </Router>


    </>
  );
}

export default App;