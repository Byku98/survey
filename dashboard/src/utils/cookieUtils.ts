export function setAuthTokenCookie(token: string) {   
    const expires = new Date();
    expires.setDate(expires.getDate() + 1); // 1 day from now
    document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/; secure; SameSite=Strict`;
}