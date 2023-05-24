import React from "react";

function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button className="btn btn-success btn-sm print-none printButton"  style={{marginTop: "5px",marginBottom: "10px"}} onClick={handlePrint}>
      Print
    </button>
  );
}

export default PrintButton;
