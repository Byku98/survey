import { useNavigate } from "react-router-dom";
import { loginUser, loginGoogleUser } from "../api/authApi";
import { setAuthTokenCookie } from "../utils/cookieUtils";
import { CredentialResponse } from "@react-oauth/google";

export function useAuth(setToken: (token: string) => void) {
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    const { token } = await loginUser({ username, password });
    setAuthTokenCookie(token);
    setToken(token);
    navigate("/survey");
  };

  const handleGoogleLogin = async (response: CredentialResponse) => {
    const idToken = response.credential;
    if (!idToken) throw new Error("Missing Google ID token");

    try {
      const { token } = await loginGoogleUser(idToken);
      setAuthTokenCookie(token);
      setToken(token);
      navigate("/survey");

    } catch (err) {
      console.error("Google login failed:", err);
      // Optionally show error to user
    }
  };

  return { handleLogin, handleGoogleLogin };
}
