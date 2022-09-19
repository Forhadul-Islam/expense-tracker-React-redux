import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="App">
      <div className="header ">
        <Link to="/" className="text-3xl ">
          Expense Tracker
        </Link>
      </div>

      <div className="main">
        <div className="container">{children}</div>
      </div>

      <div className="footer">&copy;2022 Programming Hub</div>
    </div>
  );
}
