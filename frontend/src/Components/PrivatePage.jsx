import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function PrivatePage() {
  const [currentUser, setCurrentUser] = useState(() => {
    const jwtToken = Cookies.get("jwt-authorization");
    if (!jwtToken) return ""; // No token found
    // Decode token to get username info
    try {
      const decodedToken = jwtDecode(jwtToken);
      return decodedToken.username || "";
    } catch {
      return "";
    }
  });

  const navigate = useNavigate();
  //Verify JWT on component mount and redirect if invalid
  useEffect(() => {
    const jwtToken = Cookies.get("jwt-authorization"); // Get JWT from cookies

    if (!jwtToken) {
      navigate("/login");
      return;
    }

    try {
      jwtDecode(jwtToken); // Try decoding the token
      // If decoding is successful, token is valid
    } catch (error) {
      console.error("Invalid JWT", error); // Log error for debugging
      // Redirect to login if token is invalid
      navigate("/login");
    }
  }, [navigate]); // Empty dependency array ensures this runs only once on mount

  const handleLogout = () => {
    Cookies.remove("jwt-authorization");
    setCurrentUser("");
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome {currentUser}</h1>
      <h1>Private Page</h1>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
}