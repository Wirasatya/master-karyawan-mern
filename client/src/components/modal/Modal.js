import React from "react";
import "./modal.scss";

const Modal = ({ handleSubmit, setShowModal, text }) => {
  return (
    <div className="modal">
      <div className="modalWrapper">
        <p>anda yakin {text} data ini</p>
        <div className="buttonWrapper">
          <button onClick={() => setShowModal(false)}>tidak</button>
          <button type="submit" onClick={handleSubmit}>
            ya
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
