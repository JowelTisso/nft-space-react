import React from "react";
import "./SavedAddress.css";
import { useAddress } from "../../../../context/provider/AddressProvider";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import { useAuth } from "../../../../context/provider/AuthProvider";
import { SET_ACTIVE_ADDRESS } from "../../../../utils/Constant";

const SavedAddress = ({
  data,
  toggleModal,
  toggleEditMode,
  getSelectedAddressId,
  closeNewAddressField,
}) => {
  const { _id, name, mobile, address, pin, city, state, landmark } = data;

  const { setSelectedAddress } = useAddress();
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
            <p className="active-address-tag t5 mg-right-3x">Active</p>
          ) : (
            <button
              className="active-address-tag t5 mg-right-3x btn-primary pointer"
              onClick={onActiveAddressHandler}
            >
              Select
            </button>
          )}
          <button
            className="pointer mg-right-1x"
            onClick={() => {
              closeNewAddressField();
              toggleEditMode();
              setSelectedAddress(data);
            }}
          >
            <IoCreateOutline className="t3" />
          </button>
          <button
            className="pointer"
            onClick={() => {
              toggleModal();
              getSelectedAddressId(_id);
            }}
          >
            <IoTrashOutline className="t3" />
          </button>
        </div>
      </div>
      <p className="address t5 mg-top-2x">
        {address}, {landmark}, {city}, {state} {pin}
      </p>
    </div>
  );
};

export default SavedAddress;
