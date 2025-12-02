import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormComponent from "./FormComponent";
import Cookies from "js-cookie";

export default function LoginPage() {
  //States
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [postResponse, setPostResponse] = useState("");

  //Navigate
  const navigate = useNavigate();

  //Handlers
  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        ...formData,
      });
      setPostResponse(response.data.message);
      if (response.status === 201) {
        navigate("/private");
        Cookies.set("jwt-authorization", response.data.token);
      }
    } catch (error) {
      console.log(error);
      setPostResponse(error.response.data.message || "Login Failed!");
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleLogin();
    setFormData({ username: "", password: "" });
  };

  return (
    <div>
      <FormComponent
        formData={formData}
        postResponse={postResponse}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        nextPage="register"
        currentPage="login"
      />
    </div>
  );
}