import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function PrivateRoute() {
  const jwtToken = Cookies.get("jwt-authorization");
  return jwtToken ? <Outlet /> : <Navigate to="/not-authorized" />;
}