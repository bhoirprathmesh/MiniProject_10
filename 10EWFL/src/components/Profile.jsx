import { useEffect, useState } from "react";
import UserAvatar from "../assets/UserAvatar.png";

function Profile() {
  const [profileData, setProfileData] = useState({
    email: "abc@gmail.com",
    Name: "ABCD",
    greenPoints: 0,
    role: "Normal",
  });

  async function getProfileDataReq() {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/profile/getProfileDetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setProfileData(data.ProfileDetails);
    }
  }

  useEffect(() => {
    getProfileDataReq();
  }, []);

  return (
    <div className="container min-vh-100 mt-4">
      <div className="card shadow-lg p-4 rounded-lg bg-light w-75 animated fadeIn">
        <div className="row">
          {/* Left Section */}
          <div className="col-md-4 text-center">
            <img
              src={UserAvatar}
              alt="User Avatar"
              className="img-fluid rounded-circle border border-2 border-dark mb-3"
              style={{ width: "130px", height: "130px" }}
            />
            <h3 className="text-success fw-bold">Green Points</h3>
            <h2>{profileData.greenPoints}</h2>
          </div>

          {/* Right Section */}
          <div className="col-md-8">
            <div className="mb-3">
              <h5 className="fw-bold">Name: <span className="text-muted">{profileData.Name}</span></h5>
            </div>
            <div className="mb-3">
              <h5 className="fw-bold">Email: <span className="text-muted">{profileData.email}</span></h5>
            </div>
            <div className="mb-3">
              <h5 className="fw-bold">Role: <span className="text-muted">{profileData.role}</span></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
