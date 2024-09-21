import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Laptop = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("");
  const [recycleItemPrice, setRecycleItemPrice] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [brands, setBrands] = useState([]);
  const [address, setAddress] = useState("");
  const [models, setModels] = useState([]);
  const [facilityData, setFacilityData] = useState([]);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("https://elocate-server.onrender.com/api/v1/facility")
      .then((response) => response.json())
      .then((data) => {
        setFacilityData(data);
      })
      .catch((error) => {
        console.error("Error fetching facilities:", error);
      });
  }, []);

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    setSelectedBrand(brand);
    setSelectedModel("");
    setSelectedFacility("");

    if (brand) {
      const selectedBrand = brands.find((b) => b.brand === brand);
      if (selectedBrand) {
        setModels(selectedBrand.models);
      }
    }
  };

  useEffect(() => {
    const laptopBrandsData = [
      {
        brand: "Dell",
        models: ["Dell XPS 13", "Dell Inspiron 14", "Dell G3", "Dell Latitude", "Dell Alienware M15"],
      },
      {
        brand: "HP",
        models: ["HP Spectre x360", "HP Pavilion", "HP Omen", "HP Elite Dragonfly", "HP Envy"],
      },
      {
        brand: "Lenovo",
        models: ["Lenovo ThinkPad X1 Carbon", "Lenovo Legion Y540", "Lenovo IdeaPad", "Lenovo Yoga", "Lenovo ThinkBook"],
      },
      {
        brand: "Asus",
        models: ["Asus ROG Zephyrus G14", "Asus VivoBook", "Asus TUF Gaming", "Asus ZenBook", "Asus ROG Strix"],
      },
      {
        brand: "Acer",
        models: ["Acer Predator Helios 300", "Acer Aspire", "Acer Swift", "Acer Nitro", "Acer Chromebook"],
      },
      {
        brand: "Apple",
        models: ["MacBook Air", "MacBook Pro"],
      },
      {
        brand: "MSI",
        models: ["MSI GS65 Stealth", "MSI Prestige", "MSI Modern", "MSI Alpha"],
      },
      {
        brand: "Sony",
        models: ["Sony VAIO S", "Sony VAIO E"],
      },
      {
        brand: "LG",
        models: ["LG Gram"],
      },
    ];
    setBrands(laptopBrandsData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const recycleItem = selectedBrand + " " + selectedModel;

    if (
      recycleItem &&
      selectedFacility &&
      recycleItemPrice &&
      pickupDate &&
      pickupTime &&
      address &&
      phone
    ) {
      const newBooking = {
        userId: "dummyUserId",
        userEmail: "dummyEmail@example.com",
        recycleItem,
        recycleItemPrice,
        pickupDate,
        pickupTime,
        facility: selectedFacility,
        fullName: "dummyFullName",
        address,
        phone,
      };

      setIsLoading(true);
      fetch("https://elocate-server.onrender.com/api/v1/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBooking),
      })
        .then((response) => {
          if (response.ok) {
            toast.success("Submitted successfully!", { autoClose: 3000 });
            setSelectedBrand("");
            setSelectedModel("");
            setSelectedFacility("");
            setRecycleItemPrice("");
            setPickupDate("");
            setPickupTime("");
            setAddress("");
            setPhone("");
          } else {
            toast.error("Error submitting data.", { autoClose: 3000 });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error submitting data.", { autoClose: 3000 });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      toast.error("Please fill in all the required fields.", { autoClose: 3000 });
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Submitting...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <ToastContainer />
      <h1 className="text-center fw-bold mb-4">Laptop Recycling</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
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
                <option key={brand.brand} value={brand.brand}>
                  {brand.brand}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="model" className="form-label">Select Model:</label>
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
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="recycleItemPrice" className="form-label">Recycle Item Price:</label>
            <input
              type="number"
              id="recycleItemPrice"
              value={recycleItemPrice}
              onChange={(e) => setRecycleItemPrice(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="pickupDate" className="form-label">Pickup Date:</label>
            <input
              type="date"
              id="pickupDate"
              value={pickupDate}
              min={currentDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        <div className="row">
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

          <div className="col-md-6 mb-3">
            <label htmlFor="address" className="form-label">Location:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="phone" className="form-label">Phone:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
            />
          </div>

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
                <option key={facility.name} value={facility.name}>
                  {facility.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success w-100">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Laptop;
