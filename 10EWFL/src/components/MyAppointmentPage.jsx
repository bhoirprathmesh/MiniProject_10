import { useState, useEffect } from 'react';
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

function MyAppointmentPage() {
    const { myappointment: authAppointments } = useAuth();  // Use data from auth context
    const [myappointment, setMyAppointment] = useState(authAppointments); // Local state copy

    const [editingId, setEditingId] = useState(null); // ID of the appointment being edited
    const [editFormData, setEditFormData] = useState({
        recycleItem: '',
        recycleItemPrice: '',
        pickupDate: '',
        pickupTime: '',
        facility: '',
        address: '',
        phone: ''
    });

    useEffect(() => {
        // Keep local state in sync with authAppointments
        setMyAppointment(authAppointments);
    }, [authAppointments]);

    // Handler for setting form data for the selected appointment
    const handleEdit = (appointment) => {
        setEditingId(appointment._id);
        setEditFormData({
            recycleItem: appointment.recycleItem,
            recycleItemPrice: appointment.recycleItemPrice,
            pickupDate: appointment.pickupDate.split('T')[0], // Ensure correct date format
            pickupTime: appointment.pickupTime,
            facility: appointment.facility,
            address: appointment.address,
            phone: appointment.phone
        });
    };

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Function to update appointment
    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:4000/data/booking_data/${editingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editFormData)
            });

            if (response.ok) {
                const updatedData = await response.json();
                toast.success("Appointment Updated Successfully");

                // Update the appointments in the state immediately without page refresh
                const updatedAppointments = myappointment.map((appointment) =>
                    appointment._id === editingId ? updatedData.updatedBooking : appointment
                );
                setMyAppointment(updatedAppointments); // Update local state
                setEditingId(null); // Close the edit form
            } else {
                const data = await response.json();
                toast.error(`Failed to update appointment: ${data.message}`);
            }
        } catch (error) {
            console.error("Error updating appointment:", error);
            toast.error("Error updating appointment");
        }
    };

    const handleCancel = async (appointmentId) => {
        try {
            const response = await fetch(`http://localhost:4000/data/booking_data/${appointmentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success("Appointment Canceled Successfully");

                // Remove the appointment from the local state
                const updatedAppointments = myappointment.filter(
                    appointment => appointment._id !== appointmentId
                );
                setMyAppointment(updatedAppointments); // Update local state immediately
            } else {
                const data = await response.json();
                toast.error(`Failed to cancel appointment: ${data.message}`);
            }
        } catch (error) {
            console.error("Error canceling appointment:", error);
            toast.error("Error canceling appointment");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className='text-success fw-bold mb-3'>Your Appointments</h2>
            {myappointment.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <div className="row">
                    {myappointment.map((appointment) => (
                        <div key={appointment._id} className="col-md-4">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">{appointment.recycleItem}</h5>
                                    <p className="card-text">
                                        <strong>Price:</strong> {appointment.recycleItemPrice} <br />
                                        <strong>Pickup Date:</strong> {new Date(appointment.pickupDate).toLocaleDateString()} <br />
                                        <strong>Pickup Time:</strong> {appointment.pickupTime} <br />
                                        <strong>Facility:</strong> {appointment.facility} <br />
                                        <strong>Address:</strong> {appointment.address} <br />
                                        <strong>Phone:</strong> {appointment.phone}
                                    </p>

                                    {/* Edit and Cancel Buttons */}
                                    <div className="d-flex justify-content-between">
                                        <button 
                                            className="btn btn-success w-50 b m-2" 
                                            onClick={() => handleEdit(appointment)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="btn btn-danger w-50 b m-2" 
                                            onClick={() => handleCancel(appointment._id)}
                                        >
                                            Cancel
                                        </button>
                                    </div>

                                    {/* Inline Edit Form */}
                                    {editingId === appointment._id && (
                                        <div className="mt-3">
                                            <h5>Edit Appointment</h5>
                                            <input
                                                type="text"
                                                name="recycleItem"
                                                value={editFormData.recycleItem}
                                                onChange={handleChange}
                                                placeholder="Recycle Item"
                                                className="form-control mb-2"
                                            />
                                            <input
                                                type="number"
                                                name="recycleItemPrice"
                                                value={editFormData.recycleItemPrice}
                                                onChange={handleChange}
                                                placeholder="Price"
                                                className="form-control mb-2"
                                            />
                                            <input
                                                type="date"
                                                name="pickupDate"
                                                value={editFormData.pickupDate}
                                                onChange={handleChange}
                                                className="form-control mb-2"
                                            />
                                            <input
                                                type="text"
                                                name="pickupTime"
                                                value={editFormData.pickupTime}
                                                onChange={handleChange}
                                                placeholder="Pickup Time"
                                                className="form-control mb-2"
                                            />
                                            <input
                                                type="text"
                                                name="facility"
                                                value={editFormData.facility}
                                                onChange={handleChange}
                                                placeholder="Facility"
                                                className="form-control mb-2"
                                            />
                                            <input
                                                type="text"
                                                name="address"
                                                value={editFormData.address}
                                                onChange={handleChange}
                                                placeholder="Address"
                                                className="form-control mb-2"
                                            />
                                            <input
                                                type="text"
                                                name="phone"
                                                value={editFormData.phone}
                                                onChange={handleChange}
                                                placeholder="Phone"
                                                className="form-control mb-2"
                                            />
                                            <button
                                                className="btn btn-primary w-100 b"
                                                onClick={handleUpdate}
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyAppointmentPage;
