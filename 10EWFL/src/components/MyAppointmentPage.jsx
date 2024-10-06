import { useState, useEffect } from 'react';
import { useAuth } from "../store/auth";
import { toast } from "react-toastify"; // Assuming you are using react-toastify for notifications

function MyAppointmentPage() {
    const { user, isLoggedIn } = useAuth();
    const [appointmentData, setAppointmentData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch appointment details when the component mounts
    useEffect(() => {
        if (isLoggedIn && user) {
            sendAppointmentDetailsRequest(user._id);
        }
    }, [isLoggedIn, user]);

    const sendAppointmentDetailsRequest = async (userId) => {
        try {
            const response = await fetch(`http://localhost:4000/data/booking_data?userId=${userId}`, {
                method: 'GET', // Using GET since we're passing userId in the URL
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (!response.ok) {
                console.log("Error in sendAppointmentDetailsRequest");
                setAppointmentData([]);
                setIsLoading(false);
                return;
            }
    
            const data = await response.json();
            console.log("Fetched data:", data);
            setAppointmentData(data.appointmentDetails); // Ensure this is the correct path in response
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching appointment data", error);
            setIsLoading(false);
        }
    };
    

    // Handle Delete functionality
    const handleDelete = async (appointmentId) => {
        try {
            const response = await fetch(`http://localhost:4000/data/booking_data/delete/${appointmentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Appointment deleted successfully!', { autoClose: 3000 });
                setAppointmentData(appointmentData.filter(item => item._id !== appointmentId)); // Update UI after delete
            } else {
                toast.error('Failed to delete appointment.', { autoClose: 3000 });
            }
        } catch (error) {
            console.error("Error deleting appointment:", error);
            toast.error('Error deleting appointment.', { autoClose: 3000 });
        }
    };

    // Handle Edit functionality (this can be customized further)
    const handleEdit = (appointmentId) => {
        // Logic to handle editing an appointment, e.g., navigating to an edit form
        toast.info('Edit functionality not implemented yet.', { autoClose: 3000 });
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {appointmentData.length > 0 ? (
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Facility</th>
                            <th>Price</th>
                            <th>Pickup Date</th>
                            <th>Pickup Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointmentData.map((appointment) => (
                            <tr key={appointment._id}>
                                <td>{appointment.recycleItem}</td>
                                <td>{appointment.facility}</td>
                                <td>{appointment.recycleItemPrice}</td>
                                <td>{new Date(appointment.pickupDate).toLocaleDateString()}</td>
                                <td>{appointment.pickupTime}</td>
                                <td>
                                    <button className="btn btn-primary me-2" onClick={() => handleEdit(appointment._id)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(appointment._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-danger font-montserrat fw-bold">No Appointment Data Found</p>
            )}
        </div>
    );
}

export default MyAppointmentPage;
