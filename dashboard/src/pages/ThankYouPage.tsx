//import { useNavigate } from "react-router-dom";
import { removeAuthTokenCookie } from "../utils/cookieUtils";

export default function ThankYou() {
//  const navigate = useNavigate();

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="text-center">
        <h1 className="display-3 text-primary mb-3">Thank You!</h1>
        <p className="lead text-muted">
          We appreciate your response. Your submission has been received.
        </p>
        <button
          className="btn btn-primary mt-4"
          onClick={() => {
            removeAuthTokenCookie("token");
            window.location.reload();
          }}
        >
          Take a lollipop
        </button>
      </div>
    </div>
  );
}
