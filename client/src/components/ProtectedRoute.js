import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import DefaultLayout from "./DefaultLayout";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.alerts);
  const navigateToLogin = useNavigate();

  const validateToken = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/users/get-user-by-id",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        dispatch(SetUser(response.data.data));
      } else {
        localStorage.removeItem("token");
        navigateToLogin("/login");
      }
    } catch (error) {
      localStorage.removeItem("token");
      message.error(error.message);
      dispatch(HideLoading());
      navigateToLogin("/login");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigateToLogin("/login");
    }
  }, []);
  return <div>{loading ? <div>Loading...</div> : <DefaultLayout />}</div>;
}

export default ProtectedRoute;
