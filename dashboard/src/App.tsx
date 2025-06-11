import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import SurveyPage from "./features/survey/Survey";
import AuthPage from "./features/auth/Auth";
import ThankYouPage from "./features/survey/ThankYou";
import ErrorPage from "./features/survey/Error";

function App() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromCookie = Cookies.get("token"); // Use Cookies.get() if using js-cookie

    // add function which will validate token validity from backend db

    if (tokenFromCookie) {
      setToken(tokenFromCookie); // Set token in state if it exists in cookie
    }
  }, []);

  console.log("Token:", token);

  return (
    <Routes>
      {/* Default route goes to /survey */}
      <Route
        path="/"
        element={<Navigate to={token ? "/survey" : "/auth"} replace />}
      />

      {/* Auth page for login */}
      <Route
        path="/auth"
        element={
          token ? (
            <Navigate to="/survey" replace />
          ) : (
            <AuthPage setToken={setToken} />
          )
        }
      />

      {/* Protected route */}
      <Route
        path="/survey"
        element={token ? <SurveyPage /> : <Navigate to="/auth" replace />}
      />

      <Route
        path="/thankyou"
        element={token ? <ThankYouPage /> : <Navigate to="/auth" replace />}
      />

      <Route
        path="/error"
        element={token ? <ErrorPage /> : <Navigate to="/auth" replace />}
      />

      {/* Fallback for any other routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
