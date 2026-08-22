import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

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

  const handleLogout = () => {
    setUser(null);
    setEmail("");
    setPassword("");
  };

  // Dashboard
  if (user) {
    return (
      <div className="dashboard">

        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="small-logo">D</div>
            <h2>Dayflow</h2>
          </div>

          <nav>
            <button className="nav-item active">Dashboard</button>
            <button className="nav-item">Attendance</button>
            <button className="nav-item">Leave</button>
            <button className="nav-item">Profile</button>
          </nav>

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </aside>

        <main className="dashboard-content">

          <header className="dashboard-header">
            <div>
              <h1>Dashboard</h1>
              <p>Welcome back, {user.name} 👋</p>
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

          <section className="stats">

            <div className="stat-card">
              <span>Attendance</span>
              <h2>Present</h2>
              <p>Today</p>
            </div>

            <div className="stat-card">
              <span>Working Hours</span>
              <h2>7h 32m</h2>
              <p>Today</p>
            </div>

            <div className="stat-card">
              <span>Leave Balance</span>
              <h2>12 Days</h2>
              <p>Remaining</p>
            </div>

            <div className="stat-card">
              <span>Tasks</span>
              <h2>8</h2>
              <p>Pending</p>
            </div>

          </section>

          <section className="dashboard-grid">

            <div className="dashboard-card">
              <h2>Today's Attendance</h2>

              <div className="attendance-row">
                <span>Check In</span>
                <strong>09:05 AM</strong>
              </div>

              <div className="attendance-row">
                <span>Check Out</span>
                <strong>--:--</strong>
              </div>

              <button className="primary-action">
                Check Out
              </button>
            </div>

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

  // Login
  return (
    <div className="login-page">
      <div className="login-card">

        <div className="logo">D</div>

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
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p style={{ color: "red", marginBottom: "15px" }}>
              {error}
            </p>
          )}

          <div className="login-options">

            <label className="remember">
              <input type="checkbox" />
              Remember me
            </label>

            <button type="button" className="forgot">
              Forgot Password?
            </button>

          </div>

          <button type="submit" className="login-button">
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