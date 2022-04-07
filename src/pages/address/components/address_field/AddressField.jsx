import "./AddressField.css";
import { v4 as uuid } from "uuid";
import axios from "axios";
import React, { useState } from "react";
import { useAddress } from "../../context/address-context";
import { getUserToken } from "../../../../utils/TokenHelper";

const AddressField = ({ toggleAddressField }) => {
  const { selectedAddress } = useAddress();

  const [formData, setFormData] = useState(
    selectedAddress || {
      name: "",
      mobile: "",
      address: "",
      pin: "",
      city: "",
      state: "",
      landmark: "",
    }
  );

  const [formValidation, setFormValidation] = useState({
    name: true,
    mobile: true,
    address: true,
    pin: true,
    city: true,
    state: true,
    landmark: true,
  });

  const [validationMsg, setValidationMsg] = useState({
    name: "",
    mobile: "Please fill your mobile",
    address: "",
    pin: "",
    city: "",
    state: "",
    landmark: "",
  });

  const { addToAddressList, removeFromAddressList } = useAddress();

  const { name, mobile, address, pin, city, state, landmark } = formData;

  const updateFormData = (target, key) => {
    setFormData((formData) => ({ ...formData, [key]: target.value }));
  };

  const submitForm = async () => {
    try {
      // To check if each field in address has valid entry
      ["name", "mobile", "address", "pin", "city", "state", "landmark"].map(
        (field) =>
          formData[field].length > 0
            ? setFormValidation((validation) => ({
                ...validation,
                [field]: true,
              }))
            : setFormValidation((validation) => ({
                ...validation,
                [field]: false,
              }))
      );

      // To check if all the fields are not empty
      if (
        name.length > 1 &&
        mobile.length === 10 &&
        address.length > 1 &&
        pin.length > 1 &&
        city.length > 1 &&
        state.length > 1 &&
        landmark.length > 1
      ) {
        const addressData = {
          _id: uuid(),
          name: name,
          mobile: mobile,
          address: address,
          pin: pin,
          city: city,
          state: state,
          landmark: landmark,
        };

        // To check if its a new entry or and update

        if (selectedAddress.name === "" && selectedAddress.address === "") {
          // Add address
          const res = await axios.post(
            "/api/user/addresses",
            {
              address: addressData,
            },
            {
              headers: { authorization: getUserToken() },
            }
          );

          if (res?.status === 201) {
            addToAddressList(addressData);
          }
        } else {
          // Update address
          const res = await axios.post(
            `/api/user/addresses/${selectedAddress._id}`,
            {
              address: { ...addressData, _id: selectedAddress._id }, // To make _id consistent through out updates
            },
            {
              headers: { authorization: getUserToken() },
            }
          );
          console.log(res);
          if (res?.status === 200) {
            removeFromAddressList(selectedAddress._id);
            addToAddressList({ ...addressData, _id: selectedAddress._id }); // To make _id consistent through out updates
            toggleAddressField();
          }
        }
      } else if (mobile.length !== 10) {
        //To check if mobile is valid
        setFormValidation((validation) => ({
          ...validation,
          mobile: false,
        }));

        // To change validation message for mobile if invalid input
        setValidationMsg((validation) => ({
          ...validation,
          mobile: "Please fill correct mobile number",
        }));
      } else {
        // To change validation message for mobile if no input
        setValidationMsg((validation) => ({
          ...validation,
          mobile: "Please fill your mobile",
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="AddressFieldContainer mg-top-2x">
      <p className="t4">Add a new address</p>
      <main className="grid mg-top-2x">
        <div className="input-container mg-bottom-3x">
          <input
            type="text"
            className="input-simple"
            placeholder="Name"
            value={name}
            onChange={({ target }) => updateFormData(target, "name")}
          />
          {!formValidation.name && (
            <p className="input-val val-error">Please fill your name</p>
          )}
        </div>

        <div className="input-container mg-bottom-3x">
          <input
            type="tel"
            className="input-simple"
            placeholder="Mobile"
            value={mobile}
            onChange={({ target }) => updateFormData(target, "mobile")}
          />
          {!formValidation.mobile && (
            <p className="input-val val-error">{validationMsg.mobile}</p>
          )}
        </div>

        <div className="input-container mg-bottom-3x input-address">
          <textarea
            className="input-simple input-area"
            placeholder="Address"
            value={address}
            onChange={({ target }) => updateFormData(target, "address")}
          />
          {!formValidation.address && (
            <p className="input-val val-error">Please fill your address</p>
          )}
        </div>

        <div className="input-container mg-bottom-3x">
          <input
            type="number"
            className="input-simple"
            placeholder="Pin"
            value={pin}
            onChange={({ target }) => updateFormData(target, "pin")}
          />
          {!formValidation.pin && (
            <p className="input-val val-error">Please fill your pin</p>
          )}
        </div>

        <div className="input-container mg-bottom-3x">
          <input
            type="text"
            className="input-simple"
            placeholder="City/District/Town"
            value={city}
            onChange={({ target }) => updateFormData(target, "city")}
          />
          {!formValidation.city && (
            <p className="input-val val-error">Please fill your city</p>
          )}
        </div>

        <div className="input-container mg-bottom-3x">
          <input
            type="text"
            className="input-simple"
            placeholder="State"
            value={state}
            onChange={({ target }) => updateFormData(target, "state")}
          />
          {!formValidation.state && (
            <p className="input-val val-error">Please fill your state</p>
          )}
        </div>

        <div className="input-container mg-bottom-3x">
          <input
            type="text"
            className="input-simple"
            placeholder="Landmark"
            value={landmark}
            onChange={({ target }) => updateFormData(target, "landmark")}
          />
          {!formValidation.landmark && (
            <p className="input-val val-error">Please fill your landmark</p>
          )}
        </div>
      </main>
      <button className="btn btn-primary" onClick={submitForm}>
        Save
      </button>
      <button
        className="btn btn-secondary mg-left-2x"
        onClick={toggleAddressField}
      >
        Cancel
      </button>
    </div>
  );
};

export { AddressField };
