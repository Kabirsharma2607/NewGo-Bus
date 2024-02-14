import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import BusForm from "../../components/BusForm";

function AdminBuses() {
  const [showBusForm, setShowBusForm] = React.useState(false);
  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="Buses" />
        <button className="primary-btn" onClick={() => setShowBusForm(true)}>
          Add Bus
        </button>
        {showBusForm && (
          <BusForm showBusForm={showBusForm} setShowBusForm={setShowBusForm} />
        )}
      </div>
    </div>
  );
}

export default AdminBuses;
