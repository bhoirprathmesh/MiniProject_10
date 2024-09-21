import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Television = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("");
  const [recycleItemPrice, setRecycleItemPrice] = useState();
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [brands, setBrands] = useState([]);
  const [address, setAddress] = useState("");
  const [models, setModels] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [facilityData, setFacilityData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Simulating authentication functions
  const getEmail = () => "user@example.com";
  const getPhoneNumber = () => "1234567890";
  const getUserID = () => "123";
  const getfullname = () => "John Doe";
  const isAuthenticated = () => true;

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
    const fetchBrandsAndModels = () => {
      const televisionData = [
        {
          brand: "Samsung",
          models: [
            "Samsung QN90A Neo QLED 4K TV",
            "Samsung TU8000 Crystal UHD 4K TV",
            "Samsung Frame QLED 4K TV",
          ],
        },
        {
          brand: "LG",
          models: ["LG C1 OLED 4K TV", "LG NanoCell 85 Series 4K TV"],
        },
        {
            brand: "Sony",
            models: ["Sony A80J OLED 4K TV", "Sony X90J Bravia XR 4K TV", "Sony X800H 4K UHD TV", "Sony A9G Master Series OLED 4K TV", "Sony X950H 4K UHD TV"],
          },
          {
            brand: "TCL",
            models: ["TCL 6-Series 4K QLED TV", "TCL 5-Series 4K QLED TV", "TCL 4-Series 4K UHD TV", "TCL 8-Series QLED 4K TV", "TCL 3-Series HD LED Roku Smart TV"],
          },
          {
            brand: "Vizio",
            models: ["Vizio P-Series Quantum X 4K TV", "Vizio M-Series Quantum 4K TV", "Vizio OLED 4K TV", "Vizio V-Series 4K UHD TV", "Vizio D-Series HD LED TV"],
          },
          {
            brand: "Sony",
            models: ["Sony A80J OLED 4K TV", "Sony X90J Bravia XR 4K TV", "Sony X800H 4K UHD TV", "Sony A9G Master Series OLED 4K TV", "Sony X950H 4K UHD TV"],
          },
          {
            brand: "Hisense",
            models: ["Hisense U8G Quantum Series 4K ULED TV", "Hisense H9G Quantum Series 4K ULED TV", "Hisense H8G Quantum Series 4K ULED TV", "Hisense H65G Series 4K UHD TV", "Hisense H4G Series HD LED Roku TV"],
          },
          {
            brand: "Panasonic",
            models: ["Panasonic JX800 4K UHD TV", "Panasonic HX800 4K UHD TV", "Panasonic HZ2000 OLED 4K TV", "Panasonic GX800 4K UHD TV", "Panasonic FX800 4K UHD TV"],
          },
      ];

      setBrands(televisionData);
      setModels(models);
    };
    fetchBrandsAndModels();
  }, [models]);

  const email = getEmail();
  const userId = getUserID();
  const phone = getPhoneNumber();
  const fullname = getfullname();

  const handleSubmit = async () => {
    const recycleItem = selectedBrand + selectedModel;

    if (isAuthenticated() && facilityData.length > 0) {
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
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="loading-text">Submitting...</div>
      </div>
    );
  }

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="container mt-5">
      <ToastContainer />

      <h1 className="text-center mb-4 fw-bold">Television Recycling</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="row g-3"
      >
        <div className="col-md-6">
          <label htmlFor="brand" className="form-label">
            Select Brand
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

        <div className="col-md-6">
          <label htmlFor="model" className="form-label">
            Select Model
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

        <div className="col-md-6">
          <label htmlFor="recycleItemPrice" className="form-label">
            Recycle Item Price
          </label>
          <input
            type="number"
            id="recycleItemPrice"
            value={recycleItemPrice}
            onChange={(e) => setRecycleItemPrice(Number(e.target.value))}
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="pickupDate" className="form-label">
            Pickup Date
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

        <div className="col-md-6">
          <label htmlFor="pickupTime" className="form-label">
            Pickup Time
          </label>
          <input
            type="time"
            id="pickupTime"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="address" className="form-label">
            Location
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={phone ?? ""}
            readOnly
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="facility" className="form-label">
            Select Facility
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

        <div className="col-12 mb-5">
          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Television;
