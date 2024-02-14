import React, { useState } from "react";

function PageTitle({ title }) {
  return (
    <div>
      <h1 className="text-xl">{title}</h1>
    </div>
  );
}

export default PageTitle;
