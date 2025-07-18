
import { createContext, useContext, useEffect, useState } from "react"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => { 
    
    const url = "https://miniproject-10-server.onrender.com";

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUSer] = useState("");
    const [facilityuse, setFacilityUSe] = useState("");
    const [myappointment, setMyAppointment] = useState("");

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);  //this is to remove continuous refreshment after login btn
        return localStorage.setItem("token", serverToken);
    };

    let isLoggedIn = !!token;
    console.log("isLoggedIn", isLoggedIn);

    // Logout Functionallity
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    };

    // JWT Authentication - to get currently logged in user data 
    const userAuthentication = async () => {
        try {
            const response = await fetch(`${url}/auth/user`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if(response.ok) {
                const data = await response.json(); 
                console.log("user data ", data.userData);    
                setUSer(data.userData);            
            }
        } catch(error) {
            console.log("Error Fetching User Data");
        }
    }

    // to fetch the facility from the database
    const getFacility = async () => {
        try {
            const response = await fetch(`${url}/data/facility`, {
              method: "GET",
            });

            if(response.ok) {
                const data = await response.json();
                console.log(data.msg);
                setFacilityUSe(data.msg);
            }
        } catch(error) {
            console.log(`facility frontened error : ${error}`);
        }
    }

    const getAppointment = async () => {
        try{
            const response = await fetch(`${url}/data/booking_data`, {
              method: "GET",
            });

            if(response.ok) {
                const data = await response.json();
                console.log("Fetched appointment data:", data.bookings); // Log for debugging
                setMyAppointment(data.bookings);
            }
        }catch(error) {
            console.log(`Appointment frontned error : ${error}`);
        }
    }

    useEffect( () => {
        getAppointment();
        getFacility();
        userAuthentication()
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, facilityuse, myappointment }} >
            {children} 
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    // useAuth Functoin now contains the value provided by the 
    // AuthContext.Provider higher up in the component tree

    if(!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }

    return authContextValue;
};