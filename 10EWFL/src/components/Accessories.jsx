import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Accessories = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("");
  const [recycleItemPrice, setRecycleItemPrice] = useState(0);
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
      const selectedBrand = brands.find((b) => b.category === brand);
      if (selectedBrand) {
        setModels(selectedBrand.items);
      }
    }
  };

  useEffect(() => {
    const fetchBrandsAndModels = () => {
      const accessoriesData = [
        {
          category: "Headphones",
          items: ["Sony WH-1000XM4", "Bose QuietComfort 35 II", "AirPods Pro", "Sennheiser HD 660 S", "JBL Free X"],
        },
        {
          category: "Chargers",
          items: ["Anker PowerPort", "Belkin Boost Charge", "Apple 20W USB-C Power Adapter", "Samsung Super Fast Charger", "RAVPower 60W 6-Port USB Charger"],
        },
        {
          category: "Laptop Bags",
          items: ["SwissGear Travel Gear 1900 Scansmart TSA Laptop Backpack", "AmazonBasics Laptop Backpack", "Targus Drifter II Backpack", "KROSER Laptop Backpack", "Matein Travel Laptop Backpack"],
        },
        {
          category: "External Hard Drives",
          items: ["WD Black 5TB P10 Game Drive", "Seagate Backup Plus Slim 2TB", "Samsung T5 Portable SSD", "LaCie Rugged Mini 4TB", "Toshiba Canvio Basics 1TB"],
        },
        {
          category: "Smartwatches",
          items: ["Apple Watch Series 7", "Samsung Galaxy Watch 4", "Fitbit Charge 5", "Garmin Venu 2", "Amazfit GTR 3"],
        },
        {
          category: "Mouse and Keyboards",
          items: ["Logitech MX Master 3", "Razer DeathAdder Elite", "Apple Magic Keyboard", "Corsair K95 RGB Platinum XT", "HP Wireless Elite Keyboard"],
        },
        {
          category: "Power Banks",
          items: ["Anker PowerCore 26800mAh", "RAVPower Portable Charger 20000mAh", "Xiaomi Mi Power Bank 3", "AUKEY Portable Charger 10000mAh", "Samsung Wireless Charger Portable Battery 10,000mAh"],
        },
      ];

      setBrands(accessoriesData);
      setModels(models);
    };
    fetchBrandsAndModels();
  }, [models]);

  const email = "testuser@gmail.com"; // Temporary, replace with actual email logic
  const userId = "123456"; // Temporary, replace with actual user ID logic
  const phone = "9876543210"; // Temporary, replace with actual phone logic
  const fullname = "John Doe"; // Temporary, replace with actual full name logic

  const handleSubmit = async () => {
    const recycleItem = selectedBrand + selectedModel;

    if (recycleItem && selectedFacility && recycleItemPrice && pickupDate && pickupTime && fullname && phone && address && email && userId) {
      const newBooking = {
        userId,
        userEmail: email,
        recycleItem,
        recycleItemPrice,
        pickupDate,
        pickupTime,
        facility: selectedFacility,
        fullName: fullname,
        address,
        phone,
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
          resetForm();
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
  };

  const resetForm = () => {
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedFacility("");
    setRecycleItemPrice(0);
    setPickupDate("");
    setPickupTime("");
    setAddress("");
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Submitting...</span>
        </div>
        <p>Submitting...</p>
      </div>
    );
  }

  const currentDate = new Date().toISOString().split("T")[0];

  
  return (
    <div className="container">
      <ToastContainer />
      <h1 className="text-center mt-4 mb-5 fw-bold">Accessories Recycling</h1>
      <form className="row g-3" onSubmit={(e) => e.preventDefault()}>
        {/* Category */}
        <div className="col-md-6">
          <label htmlFor="category" className="form-label">
            Select Category:
          </label>
          <select
            id="category"
            className="form-select"
            value={selectedBrand}
            onChange={handleBrandChange}
          >
            <option value="">Select Category</option>
            {brands.map((brand) => (
              <option key={brand.category} value={brand.category}>
                {brand.category}
              </option>
            ))}
          </select>
        </div>

        {/* Items */}
        <div className="col-md-6">
          <label htmlFor="model" className="form-label">
            Select Items:
          </label>
          <select
            id="model"
            className="form-select"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
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
        <div className="col-md-6">
          <label htmlFor="recycleItemPrice" className="form-label">
            Recycle Item Price:
          </label>
          <input
            type="number"
            className="form-control"
            id="recycleItemPrice"
            value={recycleItemPrice}
            onChange={(e) => setRecycleItemPrice(e.target.value)}
          />
        </div>

        {/* Pickup Date */}
        <div className="col-md-6">
          <label htmlFor="pickupDate" className="form-label">
            Pickup Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="pickupDate"
            value={pickupDate}
            min={currentDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />
        </div>

        {/* Pickup Time */}
        <div className="col-md-6">
          <label htmlFor="pickupTime" className="form-label">
            Pickup Time:
          </label>
          <input
            type="time"
            className="form-control"
            id="pickupTime"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
          />
        </div>

        {/* Location */}
        <div className="col-md-6">
          <label htmlFor="address" className="form-label">
            Location:
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">
            Phone:
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            value={phone}
            readOnly
          />
        </div>

        {/* Facility */}
        <div className="col-md-6">
          <label htmlFor="facility" className="form-label">
            Select Facility:
          </label>
          <select
            id="facility"
            className="form-select"
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
          >
            <option value="">Select Facility</option>
            {facilityData.map((facility) => (
              <option key={facility.name} value={facility.name}>
                {facility.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="col-12 mt-3 mb-5">
          <button type="submit" onClick={handleSubmit} className="btn btn-success w-100">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Accessories;
