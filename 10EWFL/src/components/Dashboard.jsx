import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

function Dashboard() {
  const navigator = useNavigate();

  const LogoutHandler = () => {
    localStorage.removeItem("token");
    toast.success("Logout Success", { position: "top-right", autoClose: 2000 });
    navigator("/");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-light sidebar p-4">
          <NavLink
            to="/dashboard/"
            className={({isActive}) => `nav-link me-2 fs-5 ${isActive ? "text-success fw-bold" : "text-body" }`}
          >
            Profile
          </NavLink>
          <hr />
          <NavLink
            to="/dashboard/myAppointments"
            className={({isActive}) => `nav-link me-2 fs-5 ${isActive ? "text-success fw-bold" : "text-body" }`}
          >
            Contribution
          </NavLink>
          <hr />
          <NavLink
            to="/dashboard/myAppointments"
            className={({isActive}) => `nav-link me-2 fs-5 ${isActive ? "text-success fw-bold" : "text-body" }`}
          >
            Help
          </NavLink>
          <hr />
          <NavLink
            to="/dashboard/myAppointments"
            className={({isActive}) => `nav-link me-2 fs-5 ${isActive ? "text-success fw-bold" : "text-body" }`}
          >
            Setting
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
        <div className="col-md-9 col-lg-10 bg-white d-flex align-items-center justify-content-center min-vh-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
