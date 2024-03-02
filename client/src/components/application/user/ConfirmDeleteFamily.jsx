import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../../features/userApplication/familySlice";

const ConfirmDeleteFamily = ({ deleteConfirmed }) => {
  const dispatch = useDispatch();
  const { visible, fMember } = useSelector((store) => store.family);

  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <Modal show={visible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you wish to delete <b>{fMember.member_name}</b>?
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
