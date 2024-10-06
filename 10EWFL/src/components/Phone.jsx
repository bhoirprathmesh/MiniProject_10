import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../store/auth";

const Smartphone = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedFacility, setSelectedFacility] = useState('');
  const [recycleItemPrice, setRecycleItemPrice] = useState(null);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [brands, setBrands] = useState([]);
  const [address, setAddress] = useState('');
  const [models, setModels] = useState([]);
  const [phone, setPhone] = useState("");
  const [facilityData, setFacilityData] = useState([]);
  const [launchDate, setLaunchDate] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);

  const { storeTokenInLS, isLoggedIn  } = useAuth();

  // Fetching facilities on component mount
  useEffect(() => {
    fetch('http://localhost:4000/data/facility')
        .then(response => response.json())
        .then(data => {
            if (data.msg) {
                setFacilityData(data.msg); // Access the "msg" array directly
            } else {
                console.error('Unexpected response format:', data);
            }
        })
        .catch(error => console.error('Error fetching facilities:', error));
  }, []);


  // Function to fetch predicted price based on launch date
  const fetchPredictedPrice = async (launchDate) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ launch_date: launchDate }),
      });
      const data = await response.json();
      return data.predicted_price;
    } catch (error) {
      console.error('Error fetching predicted price:', error);
      toast.error('Failed to fetch predicted price.', { autoClose: 3000 });
    }
  };

  // Function to handle brand change
  const handleBrandChange = event => {
    const brand = event.target.value;
    setSelectedBrand(brand);
    setSelectedModel(''); // Reset model when brand changes

    // Set models based on selected brand
    const selectedBrandData = brands.find(b => b.brand === brand);
    setModels(selectedBrandData ? selectedBrandData.models : []);
  };

  // Function to handle model selection and fetch price
  const handleModelChange = async model => {
    setSelectedModel(model);

    // Mapping of models to their respective launch dates
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
      "OnePlus 9": "2021-03-16",
      "OnePlus 8T": "2020-10-14",
      "OnePlus Nord": "2020-07-21",
      "OnePlus 8": "2020-04-14",
      "Realme 8 Pro": "2021-03-24",
      "Realme Narzo 30 Pro": "2021-05-18",
      "Realme 7": "2020-09-01",
      "Realme C11": "2020-06-30",
      "Realme X7 Max": "2021-05-31",
      "Vivo V21": "2021-05-15",
      "Vivo Y73": "2021-06-10",
      "Vivo X60 Pro": "2021-01-19",
      "Vivo S1 Pro": "2020-08-06",
      "Vivo Y20G": "2020-10-12",
      "OPPO F19 Pro": "2020-12-15",
      "OPPO Reno 5 Pro": "2020-10-25",
      "OPPO A74": "2020-06-24",
      "OPPO A53": "2020-09-21",
      "OPPO Find X3 Pro": "2020-06-03",
      "Nokia 5.4": "2021-03-24",
      "Nokia 3.4": "2021-04-23",
      "Nokia 8.3": "2020-07-31",
      "Nokia 2.4": "2020-10-23",
      "Nokia 7.2": "2018-10-26",
      "Moto G60": "2021-04-08",
      "Moto G40 Fusion": "2021-06-04",
      "Moto G30": "2021-02-16",
      "Moto G9 Power": "2021-03-02",
      "Moto E7 Power": "2021-02-25",
    };

    const launchDate = modelLaunchDates[model];
    setLaunchDate(launchDate);

    // Fetch predicted price if both brand and model are selected
    if (selectedBrand && model && launchDate) {
      const predictedPrice = await fetchPredictedPrice(launchDate);
      setRecycleItemPrice(predictedPrice);
    }
  };

  // Fetch brands and their models
  useEffect(() => {
    const fetchBrandsAndModels = () => {
      const brandsData = [
        {
          brand: "Samsung",
          models: ["Galaxy S21", "Galaxy S20", "Galaxy Note 20", "Galaxy A52", "Galaxy M32"]
        },
        {
          brand: "Apple",
          models: ["iPhone 13", "iPhone 12", "iPhone SE", "iPhone 11", "iPhone XR"]
        },
        {
          brand: "Xiaomi",
          models: ["Redmi Note 10", "Mi 11X", "Poco X3", "Redmi 9", "Mi 10T"]
        },
        {
          brand: "OnePlus",
          models: ["OnePlus 9 Pro", "OnePlus 9", "OnePlus 8T", "OnePlus Nord", "OnePlus 8"]
        },
        {
          brand: "Realme",
          models: ["Realme 8 Pro", "Realme Narzo 30 Pro", "Realme 7", "Realme C11", "Realme X7 Max"]
        },
        {
          brand: "Vivo",
          models: ["Vivo V21", "Vivo Y73", "Vivo X60 Pro", "Vivo S1 Pro", "Vivo Y20G"]
        },
        {
          brand: "OPPO",
          models: ["OPPO F19 Pro", "OPPO Reno 5 Pro", "OPPO A74", "OPPO A53", "OPPO Find X3 Pro"]
        },
        {
          brand: "Nokia",
          models: ["Nokia 5.4", "Nokia 3.4", "Nokia 8.3", "Nokia 2.4", "Nokia 7.2"]
        },
        {
          brand: "Motorola",
          models: ["Moto G60", "Moto G40 Fusion", "Moto G30", "Moto G9 Power", "Moto E7 Power"]
        }
      ];
      setBrands(brandsData);
    };
    fetchBrandsAndModels();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.error('Please log in to make a booking.', { autoClose: 3000 });
      return; // Stop the function from proceeding if the user is not logged in
    }
  
    // Creating a recycle item string from the selected brand and model
    const recycleItem = `${selectedBrand} ${selectedModel}`;
  
    // Checking if all necessary fields are filled
    if (
      recycleItem &&
      selectedFacility &&
      recycleItemPrice &&
      pickupDate &&
      pickupTime &&
      address &&
      phone
    ) {
      // Preparing the booking data
      const newBooking = {
        recycleItem,
        recycleItemPrice,
        pickupDate,
        pickupTime,
        facility: selectedFacility,
        address,
        phone,
      };
  
      setIsLoading(true); // Setting the loading state
  
      try {
        // Sending a POST request with booking data
        const response = await fetch('http://localhost:4000/data/booking_data', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(newBooking),
        });
  
        const resData = await response.json(); // Parsing the server response
        console.log("Response from server", resData.extraDetails);
  
        if (response.ok) {
          //stored the token in the localstoreage
          storeTokenInLS(resData.token);
          // On successful booking
          toast.success('Booking successful!', { autoClose: 3000 });
          // Resetting the form fields
          setSelectedBrand('');
          setSelectedModel('');
          setSelectedFacility('');
          setRecycleItemPrice('');
          setPickupDate('');
          setPickupTime('');
          setAddress('');
          setPhone('');
        } else {
          // Showing an error if the booking fails
          toast.error(resData.message || 'Error submitting booking.', { autoClose: 3000 });
        }
      } catch (error) {
        // Handling any request errors
        toast.error('Error submitting booking.', { autoClose: 3000 });
      } finally {
        setIsLoading(false); // Resetting the loading state
      }
    } else {
      // Displaying an error if required fields are missing
      toast.error('Please fill in all the required fields.', { autoClose: 3000 });
    }
  };

  return (
    <div className="container my-5">
      <ToastContainer />
      <h1 className="text-center mb-4 fw-bold">Smartphone Recycling</h1>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-6 mb-3">
          <label htmlFor="brand" className="form-label">Select Brand:</label>
          <select id="brand" value={selectedBrand} onChange={handleBrandChange} className="form-select">
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand.brand} value={brand.brand}>{brand.brand}</option>
            ))}
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="model" className="form-label">Select Model:</label>
          <select id="model" value={selectedModel} onChange={(e) => handleModelChange(e.target.value)} className="form-select" disabled={!selectedBrand}>
            <option value="">Select Model</option>
            {models.map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="recycleItemPrice" className="form-label">Recycle Item Price:</label>
          <input type="number" id="recycleItemPrice" value={recycleItemPrice || ''} className="form-control" disabled />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="phone" className="form-label">Phone:</label>
          <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" />
        </div>

        {/* Warning Alert */}
        <div className="col-md-12 mb-3">
          <span className="badge bg-warning text-dark text-wrap">
          Please Note: The estimated price may vary after a thorough inspection by our team for any internal or external damage to the device.
          </span>
          {/* <div className="alert alert-warning" role="alert">
            The predicted price may be reduced based on the assessment of any internal or external damage to the device.
          </div> */}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="pickupDate" className="form-label">Pickup Date:</label>
          <input type="date" id="pickupDate" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="form-control" />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="pickupTime" className="form-label">Pickup Time:</label>
          <input type="time" id="pickupTime" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="form-control" />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="address" className="form-label">Address:</label>
          <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="facility" className="form-label">Select Nearest Facility:</label>
          <select id="facility" value={selectedFacility} onChange={(e) => setSelectedFacility(e.target.value)} className="form-select">
            <option value="">Select Facility</option>
            {facilityData.map((facility) => (
              <option key={facility.name} value={facility.name}>{facility.name}</option>
            ))}
          </select>
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

export default Smartphone;