import { useEffect, useState } from "react";
import UserAvatar from "../assets/UserAvatar.png";

function Profile() {

  const [profileData, setProfileData] = useState({
    email: "abc@gmail.com",
    Name: "ABCD",
    greenPoints: 0,
    role: "Normal",
    totalCO2Saved: 0, // Total CO2 saved by user
    totalRecycled: 2,  // Total recycled items count
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
        <hr />

        {/* Impact Analysis Section */}
        <div className="row mt-5">
          <div className="col-12">
            <h4 className="text-success fw-bold">Analysis</h4>
            <p className="text-muted">Here's how your recycling efforts have contributed to the environment:</p>

            <div className="impact-box bg-lightgreen p-3 rounded shadow-sm mb-3">
              <h5 className="fw-bold">Total CO₂ Saved</h5>
              <p className="text-muted">By recycling {profileData.totalRecycled} items, you've saved:</p>
              <h2 className="text-success">{profileData.totalCO2Saved} kg of CO₂</h2>
              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${(profileData.totalCO2Saved / 100) * 100}%` }}
                  aria-valuenow={profileData.totalCO2Saved}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {profileData.totalCO2Saved}% of your goal
                </div>
              </div>
            </div>

            <div className="impact-box bg-lightgreen p-3 rounded shadow-sm">
              <h5 className="fw-bold">Total Items Recycled</h5>
              <p className="text-muted">You've recycled a total of:</p>
              <h2 className="text-success">{profileData.totalRecycled} items</h2>
              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${(profileData.totalRecycled / 50) * 100}%` }}
                  aria-valuenow={profileData.totalRecycled}
                  aria-valuemin="0"
                  aria-valuemax="50"
                >
                  {profileData.totalRecycled}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
