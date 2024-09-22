import React from "react";
import { Link } from "react-router-dom";
import DynamicHelmet from "../components/Common/DynamicHelmet";

function NotFound() {
  return (
    <>
      <DynamicHelmet
        title="404 Not Found - CampusCart E-Commerce"
        description="The page you are looking for does not exist. Return to the home page or explore other sections."
        keywords="404, not found, page error, CampusCart"
      />
      <div id="not-found-page">
        <div className="notfound-container">
          <h1 className="display-1">404</h1>
          <span className="notfound-separator-line"></span>{" "}
          {/* Fixed typo from "sepretor" to "separator" */}
          <p className="lead">Page Not Found</p>
        </div>
        <Link to="/" className="btn btn-primary">
          Go back to Home
        </Link>
      </div>
    </>
  );
}

export default NotFound;
