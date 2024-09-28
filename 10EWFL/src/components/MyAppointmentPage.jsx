import { useState, useEffect } from 'react';

function MyAppointmentPage() {
    // const [appointmentData, setAppointmentData] = useState(null);


    // const sendAppointmentDetailsRequest = async (userId) => {
    //     const response = await fetch("http://localhost:4000/appointment/getAppointmentDetails", {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ userId }),
    //     });

    //     if (!response.ok) {
    //         console.log("Error in sendAppointmentDetailsRequest");
    //         setAppointmentData(null);
    //         return;
    //     }

    //     const data = await response.json();
    //     setAppointmentData(data.appointmentDetails);
    // };

    return (
        <div>
            <p className="text-danger font-montserrat fw-bold">No Appointment Data Found</p>
        </div>
    );
}

export default MyAppointmentPage;
