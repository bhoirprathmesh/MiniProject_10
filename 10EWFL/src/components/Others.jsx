import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

// Mock functions to replace the imports in the original code
const getEmail = () => "user@example.com";
const getPhoneNumber = () => "1234567890";
const getUserID = () => "user123";
const getfullname = () => "John Doe";
const isAuthenticated = () => true;

const Others = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("");
  const [recycleItemPrice, setRecycleItemPrice] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [address, setAddress] = useState("");
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

  const handleSubmit = async () => {
    const recycleItem = selectedBrand + selectedModel;
    const email = getEmail();
    const userId = getUserID();
    const phone = getPhoneNumber();
    const fullname = getfullname();

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

  const currentDate = new Date().toISOString().split("T")[0];

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <div className="loading-text">Submitting...</div>
      </div>
    );
  }

  return (
    <div className="container p-5">
      <ToastContainer />

      <h1 className="text-center mt-2 mb-4 fw-bold">Others Recycling</h1>
      <form
        className="row g-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="col-md-6">
          <label htmlFor="brand" className="form-label">
            Device:
          </label>
          <input
            type="text"
            id="brand"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="model" className="form-label">
            Device Company/Model:
          </label>
          <input
            type="text"
            id="model"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="recycleItemPrice" className="form-label">
            Recycle Item Price:
          </label>
          <input
            type="number"
            id="recycleItemPrice"
            value={recycleItemPrice}
            onChange={(e) => setRecycleItemPrice(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="col-md-6">
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

        <div className="col-md-6">
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

        <div className="col-md-6">
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

        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            value={getPhoneNumber()}
            readOnly
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="facility" className="form-label">
            Select Facility:
          </label>
          <select
            id="facility"
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="form-control"
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
          <button type="submit" className="btn btn-success w-100">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Others;
