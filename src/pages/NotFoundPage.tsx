import React from "react";
import { Link } from "react-router-dom";
import "./Notfoundfile.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-container">
      <div className="error-code">404</div>
      <div className="message">
        Oops! The page you're looking for can't be found.
      </div>
      <div className="suggestion">
        Maybe you'd like to go back to the{" "}
        <Link to="/" className="home-link">
          homepage
        </Link>
        ?
      </div>

      <div className="animation-container">
        <div className="box"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
