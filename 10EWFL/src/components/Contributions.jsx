import React, { useState, useEffect } from 'react';

function Contributions() {
  const [recycleData, setRecycleData] = useState({
    totalItemsRecycled: 0,
    totalCO2Saved: 0, // in kg
    totalWasteRecycled: 0, // in kg
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const fetchRecycleData = async () => {
    try {
      const response = await fetch('http://localhost:4000/data/booking_data'); // Fetching from new API
      if (response.ok) {
        const data = await response.json();

        const bookings = data.bookings || [];

        // Sort bookings by pickup date
        bookings.sort((a, b) => new Date(a.pickupDate) - new Date(b.pickupDate));

        // Group bookings by month
        const monthlyRecycled = {};
        let totalWasteRecycled = 0;
        bookings.forEach((booking) => {
          const month = new Date(booking.pickupDate).toLocaleString('default', { month: 'long', year: 'numeric' });
          if (monthlyRecycled[month]) {
            monthlyRecycled[month] += 1;
          } else {
            monthlyRecycled[month] = 1;
          }

          // Assuming booking has a weight field for the amount of waste recycled in kg
          totalWasteRecycled += booking.wasteRecycled || 0; 
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
            borderWidth: 2,
          }],
        });

        // Calculate total CO2 saved using the waste recycled data
        const totalCO2Saved = calculateCO2Saved(totalWasteRecycled);

        // Update profile with total recycled items and other data
        setRecycleData({
          totalItemsRecycled: bookings.length,
          totalCO2Saved,
          totalWasteRecycled,
        });

      }
    } catch (error) {
      console.error('Error fetching booking data:', error);
    }
  };

  const calculateCO2Saved = (wasteRecycled) => {
    // Simple formula: 1 kg of e-waste recycled saves approx. 1.42 kg of CO2
    return (wasteRecycled * 1.42).toFixed(2);
  };

  useEffect(() => {
    fetchRecycleData(); // Call the function when component mounts
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-success fw-bold mb-4">Your Contributions</h2>
      
      <div className="card shadow-lg p-4 mb-4 bg-light animated fadeIn">
        <h4 className="fw-bold">Real-Time Impact Analysis</h4>
        <p className="text-muted">Based on your recycling contributions, here's your environmental impact:</p>

        {/* Total Items Recycled */}
        <div className="impact-box bg-lightgreen p-3 rounded shadow-sm mb-3">
          <h5 className="fw-bold">Total Items Recycled</h5>
          <p className="text-muted">You've recycled:</p>
          <h2 className="text-success">{recycleData.totalItemsRecycled} items</h2>
          <div className="progress">
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${(recycleData.totalItemsRecycled / 100) * 100}%` }} // Assuming a max of 100 items
              aria-valuenow={recycleData.totalItemsRecycled}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {recycleData.totalItemsRecycled} items
            </div>
          </div>
        </div>

        {/* Carbon Footprint Analysis */}
        <div className="impact-box bg-lightgreen p-3 rounded shadow-sm mb-3">
          <h5 className="fw-bold">Total CO₂ Saved</h5>
          <p className="text-muted">Your recycled items have saved:</p>
          <h2 className="text-success">{recycleData.totalCO2Saved} kg of CO₂</h2>
          <div className="progress">
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${(recycleData.totalCO2Saved / 100) * 100}%` }} // Assuming a max of 100 kg CO2
              aria-valuenow={recycleData.totalCO2Saved}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {recycleData.totalCO2Saved} kg
            </div>
          </div>
        </div>

        {/* Waste Recycled */}
        <div className="impact-box bg-lightgreen p-3 rounded shadow-sm">
          <h5 className="fw-bold">Total E-Waste Recycled</h5>
          <p className="text-muted">You've recycled:</p>
          <h2 className="text-success">{recycleData.totalWasteRecycled} kg</h2>
          <div className="progress">
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${(recycleData.totalWasteRecycled / 50) * 100}%` }} // Assuming a max of 50 kg
              aria-valuenow={recycleData.totalWasteRecycled}
              aria-valuemin="0"
              aria-valuemax="50"
            >
              {recycleData.totalWasteRecycled} kg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contributions;
