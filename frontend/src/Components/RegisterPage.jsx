import FormComponent from "./FormComponent";
import axios from "axios";
import { useState } from "react";

export default function RegisterPage() {
  //States
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [postResponse, setPostResponse] = useState("");

  //Handlers
  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3000/register", {
        ...formData,
      });
      setPostResponse(response.data.message);
    } catch (error) {
      setPostResponse(error.response.data.message || "Cannot add username");
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleRegister();
    setFormData({ username: "", password: "" });
  };

  return (
    <div>
      <FormComponent
        formData={formData}
        postResponse={postResponse}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        currentPage="Register"
        nextPage="login"
      />
    </div>
  );
}