import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeoBlocks,
  setDeoWards,
  unsetDeo,
} from "../../../features/deo/deoSlice";
import { Modal } from "react-bootstrap";
import customFetch from "../../../utils/customFetch";
import { splitErrors } from "../../../utils/showErrors";
import { nanoid } from "nanoid";
import { randomBadgeBg } from "../../../utils/functions";

const ModalDeoDetails = () => {
  const dispatch = useDispatch();
  const { viewDeo, deoModal, deoBlocks, deoWards } = useSelector(
    (store) => store.deo
  );

  const handleCloseModal = () => {
    dispatch(unsetDeo());
  };

  const getBlockWards = async () => {
    if (deoBlocks.length === 0 || deoWards.length === 0) {
      try {
        const response = await customFetch.get(`/master/blocks-wards`);
        dispatch(setDeoBlocks(response.data.blocks.rows));
        dispatch(setDeoWards(response.data.wards.rows));
      } catch (error) {
        splitErrors(error?.response?.data?.msg);
        return error;
      }
    }
    return [];
  };

  useEffect(() => {
    getBlockWards();
  }, []);

  let block,
    ward,
    allottedWards = [];

  if (viewDeo?.allotted_areatype_code) {
    block = deoBlocks
      .find((c) => c.block_mun_code === viewDeo?.allotted_areatype_code)
      ?.block_mun_name?.toUpperCase();
  }

  if (viewDeo?.allotted_vill_ward) {
    ward = deoWards
      .find((c) => c.village_ward_code === viewDeo?.allotted_vill_ward)
      ?.village_ward_name?.toUpperCase();
  }

  if (viewDeo?.allotted_vill_ward_all) {
    const newWardAll = viewDeo?.allotted_vill_ward_all?.split(",");
    newWardAll.map((n) => {
      const wardFilter = deoWards.filter(
        (c) => Number(c.village_ward_code) === Number(n)
      );
      allottedWards.push(wardFilter[0]?.village_ward_name);
    });
  }

  return (
    <Modal show={deoModal} size="lg" onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          Details of{" "}
          <b className="text-success ms-1">{viewDeo?.name?.toUpperCase()}</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row row-cards">
          <div className="mb-3 col-md-6 mt-0 pt-0">
            <label className="datagrid-title">Email : </label>
            <label className="form-label">{viewDeo?.email}</label>
          </div>
          <div className="mb-3 col-md-6 mt-0 pt-0">
            <label className="datagrid-title">Mobile : </label>
            <label className="form-label">{viewDeo?.mobile}</label>
          </div>
          <div className="mb-3 col-md-6 mt-0 pt-0">
            <label className="datagrid-title">Aadhaar no. : </label>
            <label className="form-label">{viewDeo?.aadhaar_number}</label>
          </div>
          <div className="mb-3 col-md-6 mt-0 pt-0">
            <label className="datagrid-title">PAN : </label>
            <label className="form-label">{viewDeo?.pan_number}</label>
          </div>
          <div className="mb-3 col-md-6 mt-0 pt-0">
            <label className="datagrid-title">Bank name : </label>
            <label className="form-label">{viewDeo?.bank_name}</label>
          </div>
          <div className="mb-3 col-md-6 mt-0 pt-0">
            <label className="datagrid-title">Branch name : </label>
            <label className="form-label">{viewDeo?.branch_name || `NA`}</label>
          </div>
          <div className="mb-3 col-md-6 mt-0 pt-0">
            <label className="datagrid-title">IFSC code : </label>
            <label className="form-label">{viewDeo?.ifsc_code}</label>
          </div>
          <div className="mb-3 col-md-6 mt-0 pt-0">
            <label className="datagrid-title">A/C no. : </label>
            <label className="form-label">{viewDeo?.bank_account_number}</label>
          </div>
          <div className="mb-3 col-md-12 mt-0 pt-0">
            <label className="datagrid-title">DEO address : </label>
            <label className="form-label">
              {viewDeo?.user_address || `NA`}
            </label>
          </div>
          <div className="mb-3 col-md-6 mt-0 pt-0">
            <label className="datagrid-title">Block : </label>
            <label className="form-label">
              {ward ? ward + ", " : "" + block}
            </label>
          </div>
          <div className="mb-3 col-md-12 mt-0 pt-0">
            <label className="datagrid-title">
              Allotted wards ({allottedWards.length}) :{" "}
            </label>
            <br />
            {allottedWards?.map((a) => {
              return (
                <span
                  key={nanoid()}
                  className={`badge bg-${randomBadgeBg()}-lt p-2 me-2 my-1`}
                >
                  {a?.toUpperCase()}
                </span>
              );
            })}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleCloseModal}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeoDetails;
