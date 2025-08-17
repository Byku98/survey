export async function validateToken(idToken: string) {
  const response = await fetch('${API_URL}/validateToken', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({idToken}),
  });

  return response.json();
}
