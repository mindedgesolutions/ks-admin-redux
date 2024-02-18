export const handleHeaderStyling = (objName, cellArray) => {
  cellArray.map((cell) => {
    objName.getCell(cell).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: import.meta.env.VITE_HEADER_BG },
      bgColor: { argb: import.meta.env.VITE_HEADER_BG },
    };
  });
};

export const handleFooterStyling = (objName, cellArray) => {
  cellArray.map((cell) => {
    objName.getCell(cell).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: import.meta.env.VITE_FOOTER_BG },
      bgColor: { argb: import.meta.env.VITE_FOOTER_BG },
    };
  });
};
