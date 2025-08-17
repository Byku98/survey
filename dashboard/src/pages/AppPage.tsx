import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
//import Cookies from "js-cookie";
import SurveyPage from "./SurveyPage";
import AuthPage from "./AuthPage";
 import ThankYouPage from "./ThankYouPage";
 import ErrorPage from "./ErrorPage";
import { validateTokenHook } from "../hooks/tokenValidatorHooks";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // const tokenFromCookie = Cookies.get("token"); // Use Cookies.get() if using js-cookie

    setTimeout(() => {
      console.log("Validating token...");
    }, 2000); // 2000 milliseconds = 2 second

    const checkToken = async () => {
      const isValid = await validateTokenHook(); // awaits the async function
      setLoggedIn(isValid);
    };

    checkToken();

    // if (tokenFromCookie) {
    //   setToken(tokenFromCookie); // Set token in state if it exists in cookie
    // }
  }, []);

  return (
    <Routes>
      {/* Default route goes to /survey */}
      <Route
        path="/"
        element={<Navigate to="/auth" replace />}
      />
      {/* Auth page for login */}
      <Route
        path="/auth"
        element={
          loggedIn ? (
            <Navigate to="/survey" replace />
          ) : (
            <AuthPage setToken={setToken} />
          )
        }
      />
      // {/* Protected route */}
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
