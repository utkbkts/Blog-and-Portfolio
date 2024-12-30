import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <img
        src="/johntravolta.gif"
        alt="image-gif"
        className="w-[700px] h-[400px]"
      />
      <p className="not-found-message">Oops! Page is Not Found</p>
      <Link to="/" className="not-found-link">
        Home Back
      </Link>
    </div>
  );
};

export default NotFound;
