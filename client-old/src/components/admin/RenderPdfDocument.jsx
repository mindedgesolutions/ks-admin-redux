import React, { useState } from "react";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

import { Document, Page } from "react-pdf";
import { nanoid } from "nanoid";

const RenderPdfDocument = () => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="row row-cards px-1 mb-2">
      <div className="col-sm-12 col-lg-12">
        <div className="card card-sm">
          <div className="col-12 w-full overflow-hidden">
            <Document
              file="../../../public/pdf/image.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.apply(null, Array(numPages))
                .map((x, i) => i + 1)
                .map((page) => {
                  const key = nanoid();
                  return (
                    <Page
                      key={key}
                      pageNumber={page}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      height={340}
                    />
                  );
                })}
            </Document>
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderPdfDocument;
