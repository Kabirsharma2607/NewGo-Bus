import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { message, Modal, Table } from "antd";
import axios from "axios";
import moment from "moment";
import BusForm from "../../components/BusForm";
import PageTitle from "../../components/PageTitle";
import { axiosInstance } from "../../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";

function Bookings() {
  // State to control the visibility of the print modal
  const [showPrintModal, setShowPrintModal] = useState(false);

  // State to store details of the selected booking
  const [selectedBooking, setSelectedBooking] = useState(null);

  // State to store the list of bookings
  const [bookings, setBookings] = useState([]);

  // Redux dispatch function
  const dispatch = useDispatch();

  // Function to fetch bookings from the server
  const getBookings = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/bookings/get-all-bookings",
        {}
      );
      dispatch(HideLoading());

      // Check if the request was successful
      if (response.data.success) {
        // Map the data for rendering and update the state
        const mappedData = response.data.data.map((booking) => {
          return {
            ...booking,
            ...booking.bus,
            key: booking._id,
          };
        });
        setBookings(mappedData);
      } else {
        // Display an error message if the request fails
        message.error(response.data.message);
      }
    } catch (error) {
      // Display an error message if there's an exception
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // Columns configuration for the Ant Design Table component
  const columns = [
    { title: "Bus Name", dataIndex: "name", key: "bus" },
    { title: "Bus Number", dataIndex: "number", key: "bus" },
    { title: "Journey Date", dataIndex: "journeyDate" },
    { title: "Journey Time", dataIndex: "departure" },
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
        // Action to trigger the print modal
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

  // Fetch bookings on component mount
  useEffect(() => {
    getBookings();
  }, []);

  // Ref to hold the reference of the print content in the modal
  const componentRef = useRef();

  return (
    <div>
      {/* Page title */}
      <PageTitle title="Bookings" />

      {/* Table to display bookings */}
      <div className="mt-2">
        <Table dataSource={bookings} columns={columns} />
      </div>

      {/* Modal for printing tickets */}
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
          {/* Content inside the print modal */}
          <div className="d-flex flex-column p-5" ref={componentRef}>
            <p>Bus : {selectedBooking.name}</p>
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

export default Bookings;
