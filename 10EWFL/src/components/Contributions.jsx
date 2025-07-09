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

        // Fetch total CO2 saved using the totalWasteRecycled
        const co2Response = await fetch('http://127.0.0.1:5000/calculate_co2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ total_waste_recycled: totalWasteRecycled }),
        });

        const co2Data = await co2Response.json();

        // Update profile with total recycled items and other data
        setRecycleData({
          totalItemsRecycled: bookings.length,
          totalCO2Saved: co2Data.total_co2_saved,
          totalWasteRecycled: co2Data.total_waste_recycled,
        });

      }
    } catch (error) {
      console.error('Error fetching booking data:', error);
    }
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

        {/* Total Waste Recycled */}
        <div className="impact-box bg-lightgreen p-3 rounded shadow-sm">
          <h5 className="fw-bold">Total Waste Recycled</h5>
          <p className="text-muted">You've recycled:</p>
          <h2 className="text-success">{recycleData.totalWasteRecycled} kg of waste</h2>
          <div className="progress">
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${(recycleData.totalWasteRecycled / 100) * 100}%` }} // Assuming a max of 100 kg waste
              aria-valuenow={recycleData.totalWasteRecycled}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {recycleData.totalWasteRecycled} kg
            </div>
          </div>
        </div>
      </div>

      {/* Recycled items over time graph */}
      <div className="card shadow-lg p-4 bg-light animated fadeIn">
        <h4 className="fw-bold">Recycling History</h4>
        <p className="text-muted">Monthly data of items you have recycled:</p>
        <div>
          {/* Graph component here (e.g., using Chart.js or other library) */}
        </div>
      </div>
    </div>
  );
}

export default Contributions;
