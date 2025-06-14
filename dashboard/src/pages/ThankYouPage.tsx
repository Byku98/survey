import { useNavigate } from "react-router-dom";

export default function ThankYou() {

  const navigate = useNavigate();

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="text-center">
        <h1 className="display-3 text-primary mb-3">Thank You!</h1>
        <p className="lead text-muted">
          We appreciate your response. Your submission has been received.
        </p>
        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate("/survey")}
        >
          Take a lollipop
        </button>
      </div>
    </div>
  );
}