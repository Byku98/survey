import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Error() {

  const navigate = useNavigate();

  const [seconds, setSeconds] = useState(60);
  const [canRetry, setCanRetry] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanRetry(true);
    }
  }, [seconds]);

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="text-center">
        <h1 className="display-3 text-danger fw-bold mb-3">Error!</h1>
        <p className="lead text-muted">
          Difficulities in sending form. Please try again later
        </p>
        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate("/survey")}
          disabled={!canRetry}
        >
          {canRetry
            ? "Try Again"
            : `You can try again in ${seconds} second${seconds !== 1 ? "s" : ""}`}
        </button>
      </div>
    </div>
  );
}
