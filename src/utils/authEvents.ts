export const authEvents = {
  login: () => window.dispatchEvent(new CustomEvent("auth-login")),
  logout: () => window.dispatchEvent(new CustomEvent("auth-logout")),
};
