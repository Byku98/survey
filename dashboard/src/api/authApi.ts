import { LoginCredentials } from "../types/auth";

export async function loginUser(credentials: LoginCredentials) {
  const response = await fetch("http://localhost:3000/admin/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  return response.json();
}

export async function loginGoogleUser (idToken: string){
  const response = await fetch("http://localhost:3000/responder/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({idToken}),
      credentials: 'include',
    });

  return response.json();  
}