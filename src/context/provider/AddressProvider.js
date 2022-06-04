import { createContext, useContext, useState } from "react";

const defaultValue = {
  addressList: [],
  setAddressList: () => {},
  addToAddressList: () => {},
  removeFromAddressList: () => {},
  selectedAddress: {
    _id: "",
    name: "",
    mobile: "",
    address: "",
    pin: "",
    city: "",
    state: "",
    landmark: "",
  },
  setSelectedAddress: () => {},
};

const AddressContext = createContext(defaultValue);

const AddressProvider = ({ children }) => {
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});

  const addToAddressList = (data) => {
    setAddressList((list) => list.concat(data));
  };

  const removeFromAddressList = (_id) => {
    setAddressList((list) => list.filter((address) => address._id !== _id));
  };

  return (
    <AddressContext.Provider
      value={{
        addressList: addressList,
        setAddressList: setAddressList,
        addToAddressList: addToAddressList,
        removeFromAddressList: removeFromAddressList,
        selectedAddress: selectedAddress,
        setSelectedAddress: setSelectedAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

const useAddress = () => useContext(AddressContext);

export { AddressProvider, useAddress };
