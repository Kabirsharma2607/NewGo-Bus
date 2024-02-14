import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { message, Table } from "antd";
import axios from "axios";
import moment from "moment";
import BusForm from "../../components/BusForm";
import PageTitle from "../../components/PageTitle";
import { axiosInstance } from "../../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import "./adminBuses.css";

function AdminBuses() {
  // Redux dispatch function
  const dispatch = useDispatch();

  // State for displaying bus form modal
  const [showBusForm, setShowBusForm] = useState(false);

  // State to store fetched buses
  const [buses, setBuses] = useState([]);

  // State to store details of the selected bus for editing
  const [selectedBus, setSelectedBus] = useState(null);

  // Function to fetch buses from the server
  const getBuses = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/get-all-buses", {});
      dispatch(HideLoading());

      // Check if the request was successful
      if (response.data.success) {
        // Update the state with the fetched data
        setBuses(response.data.data);
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

  // Function to delete a bus by its ID
  const deleteBus = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/delete-bus", {
        _id: id,
      });
      dispatch(HideLoading());

      // Check if the request was successful
      if (response.data.success) {
        // Display a success message and refresh the bus data
        message.success(response.data.message);
        getBuses();
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
    { title: "Name", dataIndex: "name" },
    { title: "Number", dataIndex: "number" },
    { title: "From", dataIndex: "from" },
    { title: "To", dataIndex: "to" },
    { title: "Journey Date", dataIndex: "journeyDate" },
    { title: "Status", dataIndex: "status" },
    { title: "Fare", dataIndex: "fare" },
    { title: "Departure", dataIndex: "departure" },
    { title: "Arrival", dataIndex: "arrival" },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        // Actions for each row (Delete and Edit buttons)
        <div className="d-flex gap-3">
          <i
            className="ri-delete-bin-line cur"
            onClick={() => {
              deleteBus(record._id);
            }}
          ></i>
          <i
            className="ri-pencil-line cur"
            onClick={() => {
              setSelectedBus(record);
              setShowBusForm(true);
            }}
          ></i>
        </div>
      ),
    },
  ];

  // Fetch buses on component mount
  useEffect(() => {
    getBuses();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between my-2">
        {/* Page title */}
        <PageTitle title="Buses" />

        {/* Button to add a new bus */}
        <button className="primary-btn" onClick={() => setShowBusForm(true)}>
          Add Bus
        </button>
      </div>

      {/* Table to display buses */}
      <Table columns={columns} dataSource={buses} />

      {/* Modal to add/edit a bus */}
      {showBusForm && (
        <BusForm
          showBusForm={showBusForm}
          setShowBusForm={setShowBusForm}
          type={selectedBus ? "edit" : "add"}
          selectedBus={selectedBus}
          setSelectedBus={setSelectedBus}
          getData={getBuses}
        />
      )}
    </div>
  );
}

export default AdminBuses;
