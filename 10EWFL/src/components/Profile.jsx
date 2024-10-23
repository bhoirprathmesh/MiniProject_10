import React, { useState, useEffect } from "react";
import UserAvatar from "../assets/UserAvatar.png";
import { useAuth } from "../store/auth";
import { Line } from "react-chartjs-2"; // For progress charts
import 'chart.js/auto';
import { Tooltip } from "bootstrap";

function Profile() {
  const { user } = useAuth();

  const [profileData, setProfileData] = useState({
    Name: user.fullname || "User Name",  // Fallback to "User Name"
    Email: user.email || "user@example.com",  // Fallback to placeholder email
    greenPoints: 50,
    Phone: user.phone || "xxxxxxxxxx",
    totalCO2Saved: 0, // Total CO2 saved by user
    totalRecycled: 0,  // Total recycled items count
    recentActivities: []  // Store recent activity
  });

  const [chartData, setChartData] = useState({
    labels: [],  // Dynamically updated based on booking data
    datasets: [{
      label: 'Items Recycled',
      data: [],  // Dynamically updated based on booking data
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2
    }]
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

  async function getBookingData() {
    try {
      const response = await fetch("http://localhost:4000/data/booking_data");
      if (response.ok) {
        const data = await response.json();
  
        const bookings = data.bookings || [];
  
        // Sort bookings by pickup date
        bookings.sort((a, b) => new Date(a.pickupDate) - new Date(b.pickupDate));
  
        // Group bookings by month
        const monthlyRecycled = {};
        bookings.forEach((booking) => {
          const month = new Date(booking.pickupDate).toLocaleString('default', { month: 'long', year: 'numeric' });
          if (monthlyRecycled[month]) {
            monthlyRecycled[month] += 1;
          } else {
            monthlyRecycled[month] = 1;
          }
        });
  
        const labels = Object.keys(monthlyRecycled); // Sorted months
        const itemsRecycled = Object.values(monthlyRecycled); // Recycled items count per month
  
        // Update chart to show months and items recycled per month
        setChartData({
          labels,
          datasets: [{
            label: 'Number of Items Recycled Per Month',
            data: itemsRecycled,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2
          }]
        });
  
        // Update profile with total recycled items
        setProfileData((prevState) => ({
          ...prevState,
          totalRecycled: bookings.length
        }));
  
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  }
  
  // Add options for the chart
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,  // Start y-axis from 0
        min: 0,             // Ensure the y-axis minimum is 0
        max: 5,             // Set the y-axis maximum to 5
        ticks: {
          stepSize: 1,      // Increment y-axis by 1
        },
      }
    },
    // responsive: true,  // Ensure the chart is responsive
    // maintainAspectRatio: false,  // Allows the chart to adjust the height as needed
  };

  useEffect(() => {
    getProfileDataReq();
    getBookingData();  // Fetch the booking data when component mounts
  }, []);

  useEffect(() => {
    if (user) {
      // Update profile data once user info is available
      setProfileData((prevState) => ({
        ...prevState,
        Name: user.fullname || prevState.Name,
        Email: user.email || prevState.Email,
        Phone: user.phone || prevState.Phone,
      }));
    }
  }, [user]);

  useEffect(() => {
    // Initialize Bootstrap tooltips when the component is mounted
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Tooltip(tooltipTriggerEl);
    });
  }, []);

  return (
    <div className="container min-vh-100 mt-4">
      <div className="card shadow-lg p-4 rounded-lg bg-light w-75 animated fadeIn position-relative">
        <div className="row">
          {/* Left Section */}
          <div className="col-md-4 text-center">
            <img
              src={UserAvatar}
              alt="User Avatar"
              className="img-fluid rounded-circle border border-2 border-dark mb-3"
              style={{ width: "130px", height: "130px" }}
            />
            <hr className="my-4" style={{ backgroundColor: "green", height: "5px", border: "none" }} />
            
            <h3 className="text-success fw-bold">
              Green Points
              <i
                className="fas fa-info-circle ms-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Mobile: 25 points, Laptop: 50 points, Accessories: 10 points, Television: 75 points, Refrigerator: 100 points, Other: 20 points"
                style={{ cursor: "pointer", color: "gray" }}
              ></i>
            </h3>
            
            <h2>{profileData.greenPoints}</h2>
          </div>

          {/* Right Section */}
          <div className="col-md-8">
            <div className="mb-3">
              <h5 className="fw-bold">Name: <span className="text-muted">{profileData.Name}</span></h5>
            </div>
            <div className="mb-3">
              <h5 className="fw-bold">Email: <span className="text-muted">{profileData.Email}</span></h5>
            </div>
            <div className="mb-3">
              <h5 className="fw-bold">Phone: <span className="text-muted">{profileData.Phone}</span></h5>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <button
          className="btn btn-success position-absolute b"
          style={{ top: "10px", right: "10px" }}
          onClick={() => alert("Edit profile feature coming soon!")}
        >
          Edit
        </button>
      </div>

      {/* Achievements Section */}
      <div className="mt-4 mb-4 card shadow-lg p-4 rounded-lg bg-light w-75 animated fadeIn">
        <h4 className="text-success fw-bold mb-3">Achievements</h4>
        <div className="row">
          <div className="col-md-6">
            <div className="card bg-light mb-3">
              <div className="card-body">
                <h5 className="card-title">Eco Warrior Badge</h5>
                <p className="card-text">Awarded for recycling 50+ items.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-light mb-3">
              <div className="card-body">
                <h5 className="card-title">Recycler of the Month</h5>
                <p className="card-text">Achieved for the highest contributions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="card shadow-lg p-4 rounded-lg bg-light w-75 animated fadeIn mb-4">
        <h4 className="text-success fw-bold mb-3">Recent Activity</h4>
        <ul className="list-group list-group-flush">
          {profileData.recentActivities.length > 0 ? (
            profileData.recentActivities.map((activity, index) => (
              <li key={index} className="list-group-item">
                <span className="fw-bold">{activity.date}</span>: Recycled {activity.item} at {activity.facility}
              </li>
            ))
          ) : (
            <li className="list-group-item">No recent activities</li>
          )}
        </ul>
      </div>

      {/* Progress Chart */}
      <div className="card shadow-lg p-4 rounded-lg bg-light w-75 animated fadeIn mb-4">
        <h4 className="text-success fw-bold">Recycling Progress</h4>
        <Line data={chartData} options={chartOptions}/>
      </div>
    </div>
  );
}

export default Profile;
