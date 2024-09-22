import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/SignIn';
import RegistrationForm from './components/SignUp';
import Footer from './components/Footer';
import Home from './components/Home';
import AboutUs from './components/Aboutus';
import RecycleCenter from './components/Recycle';
import Smartphone from './components/Phone';
import Laptop from './components/Pc';
import FacilityMap from './components/Efacility';
import Accessories from './components/Accessories';
import Television from './components/Television';
import Refrigerator from './components/Refrigerator';
import Others from './components/Others';
import Rules from './components/Rules';
import ContactUs from './components/ContactUs';
import Education from './components/Education';
import Store from './components/Store';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<Login />} />
          <Route path="/SignUp" element={<RegistrationForm />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/e-facilities" element={<FacilityMap />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/education" element={<Education />} />
          <Route path="/store" element={<Store />} />
          
          
          {/* Route for Recycle Center */}
          <Route path="/recycle" element={<RecycleCenter />} />
          
          {/* Independent routes for Smartphone and Laptop */}
          <Route path="/recycle/smartphone" element={<Smartphone />} />
          <Route path="/recycle/laptop" element={<Laptop />} />
          <Route path="/recycle/accessories" element={<Accessories />} />
          <Route path="/recycle/television" element={<Television />} />
          <Route path="/recycle/refrigerator" element={<Refrigerator />} />
          <Route path="/recycle/others" element={<Others />} />
          
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
