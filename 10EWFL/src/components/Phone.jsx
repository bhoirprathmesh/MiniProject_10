import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Smartphone = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("");
  const [recycleItemPrice, setRecycleItemPrice] = useState(null);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [brands, setBrands] = useState([]);
  const [address, setAddress] = useState("");
  const [models, setModels] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [facilityData, setFacilityData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [launchDate, setLaunchDate] = useState(""); // Store launch date

  useEffect(() => {
    fetch("https://elocate-server.onrender.com/api/v1/facility")
      .then(response => response.json())
      .then(data => setFacilityData(data))
      .catch(error => console.error("Error fetching facilities:", error));
  }, []);

  // This function will fetch the predicted price from the ML model API
  const fetchPredictedPrice = async (brand, model, launchDate) => {
    try {
      const response = await fetch(`https://ml-model-api.com/predict-price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ brand, model, launchDate }),
      });

      const data = await response.json();
      return data.predictedPrice; // Assuming the API returns the price in this field
    } catch (error) {
      console.error('Error fetching predicted price:', error);
      toast.error('Failed to fetch predicted price.', { autoClose: 3000 });
    }
  };

  const handleBrandChange = event => {
    const brand = event.target.value;
    setSelectedBrand(brand);
    setSelectedModel("");
    setSelectedFacility("");

    if (brand) {
      const selectedBrand = brands.find(b => b.brand === brand);
      if (selectedBrand) {
        setModels(selectedBrand.models);
      }
    }
  };

  useEffect(() => {
    const fetchBrandsAndModels = () => {
      const brandsData = [
        {
          brand: "Samsung",
          models: [ "Galaxy S21", "Galaxy S20", "Galaxy Note 20", "Galaxy A52", "Galaxy M32" ],
        },
        {
          brand: "Apple",
          models: [ "iPhone 13", "iPhone 12", "iPhone SE", "iPhone 11", "iPhone XR" ],
        },
        {
          brand: "Xiaomi",
          models: ["Redmi Note 10", "Mi 11X", "Poco X3", "Redmi 9", "Mi 10T" ],
        },
        {
          brand: "OnePlus",
          models: [ "OnePlus 9 Pro", "OnePlus 9", "OnePlus 8T", "OnePlus Nord", "OnePlus 8" ],
        },
        {
          brand: "Realme",
          models: [ "Realme 8 Pro", "Realme Narzo 30 Pro", "Realme 7", "Realme C11", "Realme X7 Max" ],
        },
        {
          brand: "Vivo",
          models: [ "Vivo V21", "Vivo Y73", "Vivo X60 Pro", "Vivo S1 Pro", "Vivo Y20G" ],
        },
        {
          brand: "OPPO",
          models: [ "OPPO F19 Pro", "OPPO Reno 5 Pro", "OPPO A74", "OPPO A53", "OPPO Find X3 Pro" ],
        },
        {
          brand: "Nokia",
          models: [ "Nokia 5.4", "Nokia 3.4", "Nokia 8.3", "Nokia 2.4", "Nokia 7.2" ],
        },
        {
          brand: "Motorola",
          models: [ "Moto G60", "Moto G40 Fusion", "Moto G30", "Moto G9 Power", "Moto E7 Power" ],
        },
      ];

      setBrands(brandsData);
      setModels([]);
    };
    fetchBrandsAndModels();
  }, []);

  const handleModelChange = async (model) => {
    setSelectedModel(model);

    // Assuming each model has a launch date associated (hardcoded here for example)
    const modelLaunchDates = {
      "Galaxy S21": "2021-01-29",
      "Galaxy S20": "2020-03-06",
      "Galaxy Note 20": "2020-08-21",
      "Galaxy A52": "2021-03-17",
      "Galaxy M32": "2021-07-21",
      "iPhone 13": "2021-09-24",
      "iPhone 12": "2020-10-23",
      "iPhone SE": "2020-04-24",
      "iPhone 11": "2019-09-20",
      "iPhone XR": "2018-10-26",
      "Redmi Note 10": "2021-03-16",
      "Mi 11X": "2021-04-23",
      "Poco X3": "2020-09-22",
      "Redmi 9": "2020-07-31",
      "Mi 10T": "2020-10-30",
      "OnePlus 9 Pro": "2021-03-23",
      "OnePlus 9": "2021-03-23",
      "OnePlus 8T": "2020-10-23",
      "OnePlus Nord": "2020-07-21",
      "OnePlus 8": "2020-04-29",
      "Realme 8 Pro": "2021-03-24",
      "Realme Narzo 30 Pro": "2021-02-24",
      "Realme 7": "2020-09-03",
      "Realme C11": "2020-07-30",
      "Realme X7 Max": "2021-05-31",
      "Vivo V21": "2021-04-27",
      "Vivo Y73": "2021-06-10",
      "Vivo X60 Pro": "2021-03-22",
      "Vivo S1 Pro": "2019-11-11",
      "Vivo Y20G": "2021-01-08",
      "OPPO F19 Pro": "2021-03-08",
      "OPPO Reno 5 Pro": "2020-12-18",
      "OPPO A74": "2021-04-05",
      "OPPO A53": "2020-08-04",
      "OPPO Find X3 Pro": "2021-03-11",
      "Nokia 5.4": "2021-01-11",
      "Nokia 3.4": "2020-10-15",
      "Nokia 8.3": "2020-12-15",
      "Nokia 2.4": "2020-09-22",
      "Nokia 7.2": "2019-09-06",
      "Moto G60": "2021-04-20",
      "Moto G40 Fusion": "2021-04-20",
      "Moto G30": "2021-02-24",
      "Moto G9 Power": "2020-11-26",
      "Moto E7 Power": "2021-02-19",
    };
    

    const launchDate = modelLaunchDates[model];
    setLaunchDate(launchDate);

    if (selectedBrand && model && launchDate) {
      const predictedPrice = await fetchPredictedPrice(selectedBrand, model, launchDate);
      setRecycleItemPrice(predictedPrice);
    }
  };

  const handleSubmit = async () => {
    const recycleItem = selectedBrand + " " + selectedModel;

    if (true /* replace with isAuthenticated() check */ && facilityData.length > 0) {
      if (
        recycleItem &&
        selectedFacility &&
        recycleItemPrice &&
        pickupDate &&
        pickupTime &&
        address
      ) {
        const newBooking = {
          recycleItem,
          recycleItemPrice,
          pickupDate,
          pickupTime,
          facility: selectedFacility,
          address: address,
        };

        setBookingData([...bookingData, newBooking]);
        setIsLoading(true);

        try {
          const response = await fetch(
            "https://elocate-server.onrender.com/api/v1/booking",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newBooking),
            }
          );

          if (response.ok) {
            toast.success("Submitted successfully!", {
              autoClose: 3000,
            });
            setSelectedBrand("");
            setSelectedModel("");
            setSelectedFacility("");
            setRecycleItemPrice(0);
            setPickupDate("");
            setPickupTime("");
            setAddress("");
            setIsLoading(false);
          } else {
            toast.error("Error submitting data.", {
              autoClose: 3000,
            });
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error("Error submitting data.", {
            autoClose: 3000,
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        toast.error("Please fill in all the required fields.", {
          autoClose: 3000,
        });
      }
    } else {
      toast.error("Please Login to book a facility", {
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container my-5">
      <ToastContainer />
      <h1 className="text-center mb-4 fw-bold">Smartphone Recycling</h1>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Brand Selection */}
        <div className="col-md-6 mb-3">
          <label htmlFor="brand" className="form-label">Select Brand:</label>
          <select
            id="brand"
            value={selectedBrand}
            onChange={handleBrandChange}
            className="form-select"
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand.brand} value={brand.brand}>{brand.brand}</option>
            ))}
          </select>
        </div>

        {/* Model Selection */}
        <div className="col-md-6 mb-3">
          <label htmlFor="model" className="form-label">Select Model:</label>
          <select
            id="model"
            value={selectedModel}
            onChange={(e) => handleModelChange(e.target.value)}
            className="form-select"
          >
            <option value="">Select Model</option>
            {models.map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        {/* Recycle Item Price */}
        <div className="col-md-6 mb-3">
          <label htmlFor="recycleItemPrice" className="form-label">Recycle Item Price:</label>
          <input
            type="number"
            id="recycleItemPrice"
            value={recycleItemPrice || ""}
            onChange={(e) => setRecycleItemPrice(Number(e.target.value))}
            className="form-control"
            disabled // Disable input as it's calculated by ML model
          />
        </div>

        {/* Pickup Date */}
        <div className="col-md-6 mb-3">
          <label htmlFor="pickupDate" className="form-label">Pickup Date:</label>
          <input
            type="date"
            id="pickupDate"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="form-control"
          />
        </div>

        {/* Pickup Time */}
        <div className="col-md-6 mb-3">
          <label htmlFor="pickupTime" className="form-label">Pickup Time:</label>
          <input
            type="time"
            id="pickupTime"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="form-control"
          />
        </div>

        {/* Facility Selection */}
        <div className="col-md-6 mb-3">
          <label htmlFor="facility" className="form-label">Select Facility:</label>
          <select
            id="facility"
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="form-select"
          >
            <option value="">Select Facility</option>
            {facilityData.map((facility) => (
              <option key={facility.id} value={facility.name}>{facility.name}</option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div className="col-md-12 mb-3">
          <label htmlFor="address" className="form-label">Address:</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
            rows="3"
          />
        </div>

        {/* Submit Button */}
        <div className="col-12">
          <button type="submit" className="btn btn-success w-100">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Smartphone;
