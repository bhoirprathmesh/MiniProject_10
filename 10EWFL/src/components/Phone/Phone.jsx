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

  useEffect(() => {
    fetch("https://elocate-server.onrender.com/api/v1/facility")
      .then(response => response.json())
      .then(data => setFacilityData(data))
      .catch(error => console.error("Error fetching facilities:", error));
  }, []);

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

  const email = "example@example.com"; // Replace with getEmail() function or variable
  const userId = "12345"; // Replace with getUserID() function or variable
  const phone = "1234567890"; // Replace with getPhoneNumber() function or variable
  const fullname = "John Doe"; // Replace with getfullname() function or variable

  const handleSubmit = async () => {
    const recycleItem = selectedBrand + " " + selectedModel;

    if (true /* replace with isAuthenticated() check */ && facilityData.length > 0) {
      if (
        recycleItem &&
        selectedFacility &&
        recycleItemPrice &&
        pickupDate &&
        pickupTime &&
        fullname &&
        phone &&
        address &&
        fullname &&
        email &&
        userId
      ) {
        const newBooking = {
          userId: userId,
          userEmail: email,
          recycleItem,
          recycleItemPrice,
          pickupDate,
          pickupTime,
          facility: selectedFacility,
          fullName: fullname,
          address: address,
          phone: phone,
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

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader" />
        <div className="loading-text">Submitting...</div>
      </div>
    );
  }
  const currentDate = new Date().toISOString().split("T")[0];

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
        <div className="col-md-6 mb-3">
          <label htmlFor="brand" className="form-label">
            Select Brand:
          </label>
          <select
            id="brand"
            value={selectedBrand}
            onChange={handleBrandChange}
            className="form-select"
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand.brand} value={brand.brand}>
                {brand.brand}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="model" className="form-label">
            Select Model:
          </label>
          <select
            id="model"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="form-select"
          >
            <option value="">Select Model</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="recycleItemPrice" className="form-label">
            Recycle Item Price:
          </label>
          <input
            type="number"
            id="recycleItemPrice"
            value={recycleItemPrice || ""}
            onChange={(e) => setRecycleItemPrice(Number(e.target.value))}
            className="form-control"
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="pickupDate" className="form-label">
            Pickup Date:
          </label>
          <input
            type="date"
            id="pickupDate"
            value={pickupDate}
            min={currentDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="pickupTime" className="form-label">
            Pickup Time:
          </label>
          <input
            type="time"
            id="pickupTime"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="address" className="form-label">
            Location:
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="phone" className="form-label">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            value={phone || ""}
            readOnly
            className="form-control"
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="facility" className="form-label">
            Select Facility:
          </label>
          <select
            id="facility"
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="form-select"
          >
            <option value="">Select Facility</option>
            {facilityData.map((facility) => (
              <option key={facility.name} value={facility.name}>
                {facility.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Smartphone;
