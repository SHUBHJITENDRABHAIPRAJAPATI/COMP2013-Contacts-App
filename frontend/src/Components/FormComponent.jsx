import { useNavigate } from "react-router-dom";
export default function FormComponent({
  formData,
  handleOnSubmit,
  handleOnChange,
  currentPage,
  nextPage,
  postResponse,
}) {
  const navigate = useNavigate();
  return (
    <div>
      <h1>{currentPage}</h1>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleOnChange}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleOnChange}
        />
        <br />
        <button>Submit</button>
      </form>
      <p>{postResponse}</p>
      <button onClick={() => navigate(`/${nextPage}`)}>
        {nextPage === "login" ? "Go to Login Page" : "Go to Register Page"}
      </button>
    </div>
  );
}