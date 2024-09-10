import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { facility } from "@/app/data/facility";
// import {
//   getEmail,
//   getPhoneNumber,
//   getUserID,
//   getfullname,
//   isAuthenticated,
// } from "@/app/sign-in/auth";

const Refrigerator = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("");
  const [recycleItemPrice, setRecycleItemPrice] = useState("");
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
      const refrigeratorData = [
        {
          brand: "Samsung",
          models: ["Samsung RT28M3022S8 Double Door Refrigerator", "Samsung RT42M553ES8 Top Freezer Refrigerator"],
        },
        {
          brand: "LG",
          models: ["LG GL-I292RPZL Double Door Refrigerator", "LG GL-T292RPZY Double Door Frost-Free Refrigerator"],
        },
        {
            brand: "Whirlpool",
            models: ["Whirlpool IF INV CNV 278 ELT Double Door Refrigerator", "Whirlpool NEO IF 278 ELT Double Door Refrigerator", "Whirlpool FP 263D Protton Roy Triple Door Refrigerator", "Whirlpool WDE 205 CLS 3S Single Door Refrigerator", "Whirlpool WDE 205 ROY 3S Single Door Refrigerator"],
          },
          {
            brand: "Haier",
            models: ["Haier HRF 618SS Side-by-Side Refrigerator", "Haier HRB-2764PBG-E Double Door Refrigerator", "Haier HED-20FDS Single Door Refrigerator", "Haier HRD-2204BS-R 5 Star Single Door Refrigerator", "Haier HRF-619KS Side-by-Side Refrigerator"],
          },
          {
            brand: "Godrej",
            models: ["Godrej RT EON 311 PD 3.4 Double Door Refrigerator", "Godrej RD EDGEPRO 225 C 33 TAFQ Single Door Refrigerator", "Godrej RF GF 2362PTH 236 L Double Door Refrigerator", "Godrej RT EON 241 P 3.4 Double Door Refrigerator", "Godrej RD EDGESX 185 CT 2.2 Single Door Refrigerator"],
          },
          {
            brand: "Panasonic",
            models: ["Panasonic NR-BG311VSS3 Double Door Refrigerator", "Panasonic NR-BR347VSX1 Double Door Refrigerator", "Panasonic NR-A195STWRT Single Door Refrigerator", "Panasonic NR-BS60MSX1 Side-by-Side Refrigerator", "Panasonic NR-A195RSTL Single Door Refrigerator"],
          },
          {
            brand: "Bosch",
            models: ["Bosch KDN43VS30I Double Door Refrigerator", "Bosch KDN56XI30I Side-by-Side Refrigerator", "Bosch KDN30VS30I Double Door Refrigerator", "Bosch KAN56V40AU Side-by-Side Refrigerator", "Bosch KDN46XI30I Double Door Refrigerator"],
          },
          {
            brand: "SAMSUNG",
            models: ["SAMSUNG RS73R5561M9 689 L Frost Free Side-by-Side Refrigerator", "SAMSUNG RT28T3483S8 253 L 3 Star Double Door Refrigerator", "SAMSUNG RR21T2G2X9U 198 L 5 Star Single Door Refrigerator", "SAMSUNG RT30T3743S9 275 L 3 Star Double Door Refrigerator", "SAMSUNG RR22T272YS8 212 L 3 Star Single Door Refrigerator"],
          },
      ];

      setBrands(refrigeratorData);
      setModels([]);
    };
    fetchBrandsAndModels();
  }, []);

// //   const email = getEmail();
//   const userId = getUserID();
//   const phone = getPhoneNumber();
//   const fullname = getfullname();

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
          const response = await fetch("https://elocate-server.onrender.com/api/v1/booking", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newBooking),
          });

          if (response.ok) {
            toast.success("Submitted successfully!", {
              autoClose: 3000,
            });
            setSelectedBrand("");
            setSelectedModel("");
            setSelectedFacility("");
            setRecycleItemPrice("");
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
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="ml-2">Submitting...</div>
      </div>
    );
  }

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="container py-4">
      <ToastContainer />
      <h1 className="text-center mb-4 fw-bold">Refrigerator Recycling</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Select Category */}
          <div className="col-md-6 mb-3">
            <label htmlFor="brand">Select Category:</label>
            <select
              id="brand"
              value={selectedBrand}
              onChange={handleBrandChange}
              className="form-control"
            >
              <option value="">Select Category</option>
              {brands.map((brand) => (
                <option key={brand.brand} value={brand.brand}>
                  {brand.brand}
                </option>
              ))}
            </select>
          </div>

          {/* Select Items */}
          <div className="col-md-6 mb-3">
            <label htmlFor="model">Select Items:</label>
            <select
              id="model"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="form-control"
              disabled={!selectedBrand}
            >
              <option value="">Select Items</option>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          {/* Recycle Item Price */}
          <div className="col-md-6 mb-3">
            <label htmlFor="recycleItemPrice">Recycle Item Price:</label>
            <input
              type="number"
              id="recycleItemPrice"
              value={recycleItemPrice}
              onChange={(e) => setRecycleItemPrice(e.target.value)}
              className="form-control"
            />
          </div>

          {/* Pickup Date */}
          <div className="col-md-6 mb-3">
            <label htmlFor="pickupDate">Pickup Date:</label>
            <input
              type="date"
              id="pickupDate"
              value={pickupDate}
              min={currentDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="form-control"
            />
          </div>

          {/* Pickup Time */}
          <div className="col-md-6 mb-3">
            <label htmlFor="pickupTime">Pickup Time:</label>
            <input
              type="time"
              id="pickupTime"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="form-control"
            />
          </div>

          {/* Location */}
          <div className="col-md-6 mb-3">
            <label htmlFor="address">Location:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
            />
          </div>

          {/* Select Facility */}
          <div className="col-md-6 mb-3">
            <label htmlFor="facility">Select Facility:</label>
            <select
              id="facility"
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              className="form-control"
            >
              <option value="">Select Facility</option>
              {facilityData.map((facility) => (
                <option key={facility._id} value={facility.name}>
                  {facility.name}
                </option>
              ))}
            </select>
          </div>

          {/* Phone Number */}
          <div className="col-md-6 mb-3">
            <label htmlFor="phone">Phone:</label>
            <input type="tel" id="phone" className="form-control" placeholder="Enter Phone Number" />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success w-100">
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Refrigerator;
