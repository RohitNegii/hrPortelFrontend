import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="error-code">404</h1>
      <p className="error-title">Page Not Found</p>
      <p className="error-description">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/candidates" className="home-button">
        Go to Homepage
      </Link>
    </div>
  );
};

export default PageNotFound;
