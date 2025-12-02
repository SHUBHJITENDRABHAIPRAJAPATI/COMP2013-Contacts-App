import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <br />
      <Link to="/register">Go to register page with a link</Link>
      <br />
      <Link to="/login">Login page</Link>
    </div>
  );
}