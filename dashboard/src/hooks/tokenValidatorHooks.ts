import { validateToken } from "../api/tokenValidatorApi";
import { getCookieValue } from "../utils/cookieUtils";
//import { removeAuthTokenCookie } from "../utils/cookieUtils";

export async function validateTokenHook() {
  const token = getCookieValue("token");

  setTimeout(() => {
    console.log("Token from cookie:", token);
  }, 2000); // 2000 milliseconds = 2 second

  if (token) {
    try {
      console.log("Starting matching token...");
      const response = await validateToken(token); // Call server-side logout
      console.log("Token matched: ", response);
      return true;
    } catch (error) {
      console.log("No matching token. Removal local token: ", error);
      // removeAuthTokenCookie("token"); // Always remove client-side cookie
      return false;
      // Even if server logout fails, proceed with client-side cleanup
    } finally {
      // removeAuthTokenCookie("token"); // Always remove client-side cookie
      return false;
    }
  } else {
    console.error("No cookie in browser: ");
    return false;
  }
}
