import React from "react";
import { Modal } from "react-bootstrap";

const ConfirmDeleteFamily = ({ modal, deleteConfirmed, handleClose }) => {
  const { showModal, memberName, memberId } = modal;
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm mobile no.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You have entered <b>{memberName}</b>. Please confirm this is the right
        mobile number
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-success"
          onClick={deleteConfirmed}
        >
          Confirm
        </button>
        <button type="button" className="btn btn-danger" onClick={handleClose}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteFamily;
