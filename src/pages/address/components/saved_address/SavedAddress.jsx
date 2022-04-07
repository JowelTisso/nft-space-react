import React from "react";
import "./SavedAddress.css";
import { useAddress } from "../../context/address-context";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";

const SavedAddress = ({
  data,
  toggleModal,
  toggleEditMode,
  getSelectedAddressId,
  closeNewAddressField,
}) => {
  const { _id, name, mobile, address, pin, city, state, landmark } = data;

  const { setSelectedAddress } = useAddress();

  return (
    <div className="savedAddressContainer border mg-top-2x">
      <div className="name-container">
        <p className="t4">{name}</p>
        <p className="t4">{mobile}</p>
      </div>
      <p className="address t5 mg-top-2x">
        {address}, {landmark}, {city}, {state} {pin}
      </p>
      <div className="menu-container">
        <button
          className="pointer mg-right-2x"
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
  );
};

export default SavedAddress;
