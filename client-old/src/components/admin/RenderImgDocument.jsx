import React from "react";

const RenderImgDocument = () => {
  return (
    <div className="row row-cards px-1 mb-2">
      <div className="col-sm-12 col-lg-12">
        <div className="card card-sm">
          <div className="col-12 w-full overflow-hidden">
            <img
              src="../../../public/pdf/image.pdf"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderImgDocument;
