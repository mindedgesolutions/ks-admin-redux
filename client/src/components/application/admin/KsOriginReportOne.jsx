import React from "react";
import ExportBtnGroup from "./ExportBtnGroup";

const KsOriginReportOne = () => {
  return (
    <div className="col-12">
      <div className="card">
        <ExportBtnGroup />

        <div className="card-body p-2">
          <div className="table-responsive">
            <table className="table table-vcenter text-nowrap datatable table-hover table-bordered card-table fs-5">
              <thead>
                <tr>
                  <th className="bg-dark text-white">SL. NO.</th>
                  <th className="bg-dark text-white">Provisional MWIN</th>
                  <th className="bg-dark text-white">Doc. Uploaded</th>
                  <th className="bg-dark text-white">Under Process *</th>
                  <th className="bg-dark text-white">Rejected</th>
                  <th className="bg-dark text-white">Permanent MWIN</th>
                  <th className="bg-dark text-white">Total MWIN</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>First comp</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KsOriginReportOne;
