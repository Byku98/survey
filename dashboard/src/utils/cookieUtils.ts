import Cookies from "js-cookie";

export function setAuthTokenCookie(token: string) {
  const expires = new Date();
  expires.setDate(expires.getDate() + 1); // 1 day from now
  document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/; secure; SameSite=Strict`;
}

export function removeAuthTokenCookie(cookieName: string) {
  Cookies.remove(cookieName);
}

export function getCookieValue(cookieName: string): string | undefined {
  return Cookies.get(cookieName);
}