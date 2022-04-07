import React from "react";

export const Modal = ({ toggleModal, deleteAddressFromServer }) => {
  return (
    <div id="modal" className="modal">
      <div
        id="modal-backdrop"
        className="modal-backdrop"
        onClick={toggleModal}
      ></div>
      <div className="modal-content">
        <p className="t4 mg-top-2x mg-bottom-4x">
          Are you sure you want to delete this address?
        </p>
        <div className="modal-btn-container">
          <button className="btn btn-primary" onClick={deleteAddressFromServer}>
            DELETE
          </button>
          <button className="btn btn-secondary" onClick={toggleModal}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};
