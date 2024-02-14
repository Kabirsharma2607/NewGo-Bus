// Import necessary React components, hooks, styles, and libraries
import { message, Modal, Table } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import BusForm from "../components/BusForm";
import PageTitle from "../components/PageTitle";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

// Functional component for displaying and managing user bookings
function Bookings() {
  // Initialize state variables and refs
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  const componentRef = useRef();

  // Function to fetch user bookings from the server
  const getBookings = async () => {
    try {
      // Show loading state during data fetching process
      dispatch(ShowLoading());

      // Make a POST request to the server to get user bookings
      const response = await axiosInstance.post(
        "/api/bookings/get-bookings-by-user-id",
        {}
      );

      // Hide loading state after data fetching process
      dispatch(HideLoading());

      // Check the server response and update state with fetched data
      if (response.data.success) {
        // Map and format the data for displaying in the Table component
        const mappedData = response.data.data.map((booking) => {
          return {
            ...booking,
            ...booking.bus,
            key: booking._id,
          };
        });

        // Set the bookings state with the mapped data
        setBookings(mappedData);
      } else {
        // Display an error message if fetching data fails
        message.error(response.data.message);
      }
    } catch (error) {
      // Hide loading state if an error occurs during data fetching
      dispatch(HideLoading());

      // Display an error message
      message.error(error.message);
    }
  };

  // Define columns for the Table component
  const columns = [
    {
      title: "Bus Name",
      dataIndex: "name",
      key: "bus",
    },
    {
      title: "Bus Number",
      dataIndex: "number",
      key: "bus",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
    },
    {
      title: "Journey Time",
      dataIndex: "departure",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      render: (seats) => {
        return seats.join(", ");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <p
            className="text-md underline"
            onClick={() => {
              setSelectedBooking(record);
              setShowPrintModal(true);
            }}
          >
            Print Ticket
          </p>
        </div>
      ),
    },
  ];

  // Use effect hook to fetch user bookings when the component mounts
  useEffect(() => {
    getBookings();
  }, []);

  // Render the Bookings component with the Table and Print Modal
  return (
    <div>
      {/* Display page title */}
      <PageTitle title="Bookings" />

      {/* Render Table component with user bookings */}
      <div className="mt-2">
        <Table dataSource={bookings} columns={columns} />
      </div>

      {/* Display Print Ticket Modal when needed */}
      {showPrintModal && (
        <Modal
          title="Print Ticket"
          onCancel={() => {
            setShowPrintModal(false);
            setSelectedBooking(null);
          }}
          visible={showPrintModal}
          okText="Print"
        >
          <div className="d-flex flex-column p-5" ref={componentRef}>
            {/* Display details of the selected booking in the Print Ticket Modal */}
            <p>Bus: {selectedBooking.name}</p>
            <p>
              {selectedBooking.from} - {selectedBooking.to}
            </p>
            <hr />
            <p>
              <span>Journey Date:</span>{" "}
              {moment(selectedBooking.journeyDate).format("DD-MM-YYYY")}
            </p>
            <p>
              <span>Journey Time:</span> {selectedBooking.departure}
            </p>
            <hr />
            <p>
              <span>Seat Numbers:</span> <br />
              {selectedBooking.seats}
            </p>
            <hr />
            <p>
              <span>Total Amount:</span>{" "}
              {selectedBooking.fare * selectedBooking.seats.length} /-
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Export the Bookings component
export default Bookings;
