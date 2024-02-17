import React, { useState } from "react";
import { documentFormat, getFileExtension } from "../../../utils/functions";
import { nanoid } from "nanoid";
import RenderPdfDocument from "../RenderPdfDocument";
import RenderImgDocument from "../RenderImgDocument";

const Documents = ({ master }) => {
  const { rows } = master.data.documents;
  const [showDoc, setShowDoc] = useState("");
  const title = rows.length === 0 ? "No Document Found" : "Uploaded Documents";

  return (
    <div className="card-body px-1">
      <div className="col-md-12">
        <div className="card p-0">
          <div className="card-header fs-4">{title}</div>
          <div className="card-body px-1">
            {rows.map((document) => {
              const {
                document_type,
                document_filename,
                document_url,
                flag,
              } = document;
              const key = nanoid();
              const fileExtension = getFileExtension(document_filename);

              return (
                <div key={key}>
                  <div className="col-sm-12 col-lg-12">
                    <button
                      type="button"
                      className="btn w-full mb-2"
                      onClick={() => setShowDoc(document_type)}
                    >
                      {documentFormat(document_type).toUpperCase()}
                    </button>
                  </div>

                  {showDoc && showDoc === document_type ? (
                    fileExtension === "pdf" ? (
                      <RenderPdfDocument />
                    ) : (
                      <RenderImgDocument />
                    )
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
