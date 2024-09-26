import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

function Dashboard() {
  const navigator = useNavigate();

  const LogoutHandler = () => {
    localStorage.removeItem("token");
    toast.success("Logout Success", { position: "top-right", autoClose: 2000 });
    navigator("/");
  };

  const [tips, setTips] = useState([
    "Reduce e-waste by donating or recycling old electronics.",
    "Avoid improper disposal of batteries to prevent soil contamination.",
    "Support companies that prioritize eco-friendly practices.",
    "Participate in e-waste collection drives in your community."
  ]);
  const [currentTip, setCurrentTip] = useState(0);

  // Cycling through eco-friendly tips
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prevTip) => (prevTip + 1) % tips.length);
    }, 4000);
    return () => clearInterval(tipInterval);
  }, [tips.length]);

  return (
    <div className="container-fluid dashboard-container">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-light sidebar p-4 animated-sidebar">
          <NavLink
            to="/dashboard/"
            className={({ isActive }) => `nav-link me-2 fs-5 ${isActive ? "text-success fw-bold" : "text-body"}`}
          >
            Profile
          </NavLink>
          <hr />
          <NavLink
            to="/dashboard/myAppointments"
            className={({ isActive }) => `nav-link me-2 fs-5 ${isActive ? "text-success fw-bold" : "text-body"}`}
          >
            My Appointments
          </NavLink>
          <hr />
          <NavLink
            to="/dashboard/contributions"
            className={({ isActive }) => `nav-link me-2 fs-5 ${isActive ? "text-success fw-bold" : "text-body"}`}
          >
            Contributions
          </NavLink>
          <hr />
          <NavLink
            to="/dashboard/help"
            className={({ isActive }) => `nav-link me-2 fs-5 ${isActive ? "text-success fw-bold" : "text-body"}`}
          >
            Help
          </NavLink>
          <hr />
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) => `nav-link me-2 fs-5 ${isActive ? "text-success fw-bold" : "text-body"}`}
          >
            Settings
          </NavLink>
          <hr />
          <button
            className="btn btn-success mt-3 w-100 "
            onClick={LogoutHandler}
          >
            Log out
          </button>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 bg-white d-flex flex-column align-items-center justify-content-center min-vh-100">
          <Outlet />

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
