// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  const user = localStorage.getItem("user");
  return !!(token && user);
};

// Store auth data after signup/login
export const setAuthData = (token, user) => {
  localStorage.setItem("authToken", token);
  localStorage.setItem("user", JSON.stringify(user));
};

// Get user data
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Logout
export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  localStorage.removeItem("focusMode");
  localStorage.removeItem("cadence");
  localStorage.removeItem("onboardingComplete");
  window.location.href = "/";
};

// Get auth headers for API calls
export const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
