import React from "react";
import { getUser, logout } from "../../utils/auth";
import "./Dashboard.css";

export default function Dashboard() {
  const user = getUser();
  const focusMode = localStorage.getItem("focusMode") || "solo";
  const cadence = localStorage.getItem("cadence") || "weekly";

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.fullName || "User"}!</h1>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <h2>🎉 Your workspace is ready!</h2>
        <div className="dashboard-info">
          <p><strong>Focus Mode:</strong> {focusMode}</p>
          <p><strong>Cadence:</strong> {cadence}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
        <p className="dashboard-note">
          Dashboard UI is being built... Stay tuned! 🚀
        </p>
      </div>
    </div>
  );
}
