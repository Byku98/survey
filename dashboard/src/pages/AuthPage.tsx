import { GoogleLogin } from "@react-oauth/google";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../hooks/authHooks";
import { AuthProps } from "../types/auth";

export default function AuthPage({ setToken }: AuthProps) {
  const { handleLogin, handleGoogleLogin } = useAuth(setToken);

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Please Log In</h2>
        <AuthForm onLogin={handleLogin} />
        <div className="d-flex justify-content-between mt-4">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log("Google Login Failed")}
            useOneTap
          />
        </div>
      </div>
    </div>
  );
}