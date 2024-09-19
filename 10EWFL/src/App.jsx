import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './components/SignIn/SignIn';
import RegistrationForm from './components/SignUp/SignUp';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import AboutUs from './components/Aboutus/Aboutus';
import RecycleCenter from './components/Recycle/Recycle';
import Smartphone from './components/Phone/Phone';
import Laptop from './components/Pc/Pc';
import FacilityMap from './components/Efacility/Efacility';
import Accessories from './components/Accessories/Accessories';
import Television from './components/Television/Television';
import Refrigerator from './components/Refrigerator/Refrigerator';
import Others from './components/Others/Others';
import Rules from './components/Rules/Rules';

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
