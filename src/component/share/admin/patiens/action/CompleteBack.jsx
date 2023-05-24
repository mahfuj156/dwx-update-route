import { ErrorMessage } from "formik";
import { error } from "jquery";
import  React from "react";
import { ToastContainer, toast } from "react-toastify";
export default function CompleteBack({ setPatients, patients, itemId }) {
 

  const handleCompleteBack = async () => {
     
    const token = JSON.parse(localStorage.getItem("token"));

    const response = await fetch(
      `https://api.desherkhobor24.com/admin/operation/complete-back/${itemId}`,
      {
        method: "PUT",
        body: itemId,
        headers: { authorization: `Bearer ${token}` },
      }
    ); 

    if (response.status === 200) {
      toast.success("Complete Back successfully!");
    }
  };

  return (
    <div className="">
      <button onClick={handleCompleteBack} className="btn btn-success btn-sm">
        {"C.B"}
        <i className="fa fa-trash"></i>
        {ErrorMessage && <span className="text-danger ml-2">{error}</span>}
      </button>
      <ToastContainer />
    </div>
  );
}
