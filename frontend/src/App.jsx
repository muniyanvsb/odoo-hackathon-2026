

import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [user, setUser] = useState(null);

  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [workingHours, setWorkingHours] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (email === "admin@dayflow.com" && password === "admin123") {
      setUser({
        name: "Admin User",
        role: "Administrator",
      });
    } else if (
      email === "manager@dayflow.com" &&
      password === "manager123"
    ) {
      setUser({
        name: "Manager User",
        role: "Manager",
      });
    } else if (
      email === "employee@dayflow.com" &&
      password === "employee123"
    ) {
      setUser({
        name: "Employee User",
        role: "Employee",
      });
    } else {
      setError("Invalid email or password");
    }
  };

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now);
    setCheckOutTime(null);
    setWorkingHours(null);
  };

  const handleCheckOut = () => {
    if (!checkInTime) return;

    const now = new Date();
    setCheckOutTime(now);

    const difference = now - checkInTime;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (difference / (1000 * 60)) % 60
    );

    setWorkingHours(`${hours}h ${minutes}m`);
  };

  const formatTime = (time) => {
    if (!time) return "--:--";

    return time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLogout = () => {
    setUser(null);
    setEmail("");
    setPassword("");

    setCheckInTime(null);
    setCheckOutTime(null);
    setWorkingHours(null);
  };

  // =========================
  // DASHBOARD
  // =========================

  if (user) {
    return (
      <div className="dashboard">

        {/* SIDEBAR */}

        <aside className="sidebar">

          <div className="sidebar-logo">
            <div className="small-logo">D</div>
            <h2>Dayflow</h2>
          </div>

          <nav>

            <button className="nav-item active">
              Dashboard
            </button>

            <button className="nav-item">
              Attendance
            </button>

            <button className="nav-item">
              Leave
            </button>

            <button className="nav-item">
              Profile
            </button>

          </nav>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </aside>

        {/* MAIN CONTENT */}

        <main className="dashboard-content">

          {/* HEADER */}

          <header className="dashboard-header">

            <div>

              <h1>Dashboard</h1>

              <p>
                Welcome back, {user.name} 👋
              </p>

            </div>

            <div className="user-info">

              <div className="avatar">
                {user.name.charAt(0)}
              </div>

              <div>

                <strong>{user.name}</strong>

                <span>{user.role}</span>

              </div>

            </div>

          </header>

          {/* STAT CARDS */}

          <section className="stats">

            <div className="stat-card">

              <span>Attendance</span>

              <h2>
                {checkInTime ? "Present" : "Not Checked In"}
              </h2>

              <p>Today</p>

            </div>

            <div className="stat-card">

              <span>Check In</span>

              <h2>
                {formatTime(checkInTime)}
              </h2>

              <p>Today's time</p>

            </div>

            <div className="stat-card">

              <span>Check Out</span>

              <h2>
                {formatTime(checkOutTime)}
              </h2>

              <p>Today's time</p>

            </div>

            <div className="stat-card">

              <span>Working Hours</span>

              <h2>
                {workingHours || "0h 0m"}
              </h2>

              <p>Today</p>

            </div>

          </section>

          {/* ATTENDANCE */}

          <section className="dashboard-grid">

            <div className="dashboard-card">

              <h2>Today's Attendance</h2>

              <div className="attendance-status">

                <span>Status</span>

                <strong>
                  {checkInTime
                    ? "🟢 Present"
                    : "⚪ Not Checked In"}
                </strong>

              </div>

              <div className="attendance-row">

                <span>Check In</span>

                <strong>
                  {formatTime(checkInTime)}
                </strong>

              </div>

              <div className="attendance-row">

                <span>Check Out</span>

                <strong>
                  {formatTime(checkOutTime)}
                </strong>

              </div>

              <div className="attendance-row">

                <span>Working Hours</span>

                <strong>
                  {workingHours || "0h 0m"}
                </strong>

              </div>

              {!checkInTime && (

                <button
                  className="primary-action"
                  onClick={handleCheckIn}
                >
                  Check In
                </button>

              )}

              {checkInTime && !checkOutTime && (

                <button
                  className="checkout-action"
                  onClick={handleCheckOut}
                >
                  Check Out
                </button>

              )}

              {checkOutTime && (

                <p className="completed-message">
                  Attendance completed for today ✓
                </p>

              )}

            </div>

            {/* QUICK ACTIONS */}

            <div className="dashboard-card">

              <h2>Quick Actions</h2>

              <button className="action-button">
                Apply Leave
              </button>

              <button className="action-button">
                View Attendance
              </button>

              <button className="action-button">
                View Profile
              </button>

            </div>

          </section>

        </main>

      </div>
    );
  }

  // =========================
  // LOGIN
  // =========================

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="logo">
          D
        </div>

        <h1>Dayflow</h1>

        <p className="subtitle">
          Human Resource Management System
        </p>

        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          {error && (
            <p
              style={{
                color: "red",
                marginBottom: "15px",
              }}
            >
              {error}
            </p>
          )}

          <div className="login-options">

            <label className="remember">

              <input type="checkbox" />

              Remember me

            </label>

            <button
              type="button"
              className="forgot"
            >
              Forgot Password?
            </button>

          </div>

          <button
            type="submit"
            className="login-button"
          >
            Sign In
          </button>

        </form>

        <p className="footer-text">
          © 2026 Dayflow HRMS
        </p>

      </div>

    </div>
  );
}

export default App;