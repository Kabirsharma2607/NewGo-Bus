import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import BusForm from "../../components/BusForm";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { message } from "antd";
import { axiosInstance } from "../../helpers/axiosInstance";

function AdminBuses() {
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);

  const getBuses = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/get-all-buses", {});
      dispatch(HideLoading());
      if (response.data.success) {
        setBuses(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBuses();
  }, []);
  const [showBusForm, setShowBusForm] = React.useState(false);
  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="Buses" />
        <button className="primary-btn" onClick={() => setShowBusForm(true)}>
          Add Bus
        </button>
        {showBusForm && (
          <BusForm
            showBusForm={showBusForm}
            setShowBusForm={setShowBusForm}
            type="add"
          />
        )}
      </div>
    </div>
  );
}

export default AdminBuses;
