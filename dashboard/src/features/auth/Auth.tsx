import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { OAuth2Client } from "google-auth-library";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

type AuthProps = {
  setToken: (token: string) => void;
};

async function loginUser(credentials: { username: string; password: string }) {
  const response = await fetch("http://localhost:3000/admin/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  return response.json();
}

export default function Auth({ setToken }: AuthProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { token } = await loginUser({ username, password });

    const expires = new Date();
    expires.setDate(expires.getDate() + 1); // 1 day from now
    document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/; secure; SameSite=Strict`;

    setToken(token); // Save the token in the parent component
    navigate("/admin"); // Redirect to /admin page after login
  };

  const loginGoogleUser = async (response: CredentialResponse) => {
    const idToken = response.credential;

    if (!idToken) {
      throw new Error("Missing Google ID token");
    }

    const responderToken = await fetch("http://localhost:3000/responder/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(idToken),
      credentials: 'include',
    })

    
    //const decoded = jwtDecode(idToken);
    //console.log("Decoded user:", decoded);

    // !!!!!!!!! response as JWT cookie from Java. set as HTTPResponse so manually set cookie

    //const expires = new Date();
    //expires.setDate(expires.getMinutes() + 10); // 5 minutes from now
    //document.cookie = `token=${newToken}; expires=${expires.toUTCString()}; path=/; secure; SameSite=Strict`;

    navigate("/survey"); // Redirect to /survey after login
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Please Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </div>
        </form>
        <div className="d-flex justify-content-between mt-4">
          <GoogleLogin
            onSuccess={loginGoogleUser}
            onError={() => {
              console.log("Login Failed");
            }}
            useOneTap
          />
        </div>
      </div>
    </div>
  );
}
