import React from "react";
import { Form, Modal } from "react-bootstrap";

const ModalAddNewBank = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add new bank</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="required">Enter IFSC code</Form.Label>
            <Form.Control type="text" name="newIfsc" autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="required">Bank name</Form.Label>
            <Form.Control type="text" name="newBankName" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="required">Branch name</Form.Label>
            <Form.Control type="text" name="newBranchName" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="required">Branch address</Form.Label>
            <Form.Control type="text" name="newBranchAddress" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-default btn-sm px-2 py-1"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          type="button"
          className="btn btn-warning btn-sm px-2 py-1"
          onClick={handleClose}
        >
          Add bank
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddNewBank;
