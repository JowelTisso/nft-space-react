import React from "react";
import "../../../pages/address/components/saved_address/SavedAddress.css";
import { useAuth } from "../../../context/provider/AuthProvider";
import { SET_ACTIVE_ADDRESS } from "../../../utils/Constant";

const SavedAddress = ({ data }) => {
  const { _id, name, mobile, address, pin, city, state, landmark } = data;

  const { authState, authDispatch } = useAuth();

  const activeAddressId = authState.activeAddress._id;

  const onActiveAddressHandler = () => {
    authDispatch({ type: SET_ACTIVE_ADDRESS, payload: { address: data } });
  };

  return (
    <div className="savedAddressContainer border mg-top-2x">
      <div className="name-container">
        <p className="t4">{name}</p>
        <p className="t4">{mobile}</p>
        <div className="menu-container">
          {_id === activeAddressId ? (
            <p className="active-address-tag t5 mg-right-2x">Active</p>
          ) : (
            <button
              className="active-address-tag t5 mg-right-2x btn-primary pointer"
              onClick={onActiveAddressHandler}
            >
              Select
            </button>
          )}
        </div>
      </div>
      <p className="address t5 mg-top-2x">
        {address}, {landmark}, {city}, {state} {pin}
      </p>
    </div>
  );
};

export default SavedAddress;
