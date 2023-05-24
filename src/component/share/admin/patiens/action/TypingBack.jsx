import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
export default function TypingBack({ setPatients, patients, itemId }) {
  const [error, setError] = useState(null);

  const handleTypeingBack = async () => {
    setError(null);
    const token = JSON.parse(localStorage.getItem("token"));

    const response = await fetch(
      `https://api.desherkhobor24.com/admin/operation/typingback/${itemId}`,
      {
        method: "PUT",
        body: itemId,
        headers: { authorization: `Bearer ${token}` },
      }
    );
    console.log(response);

    if (response.status === 200) {
      toast.success("Typing Back successfully!");
    }
  };

  return (
    <div className="">
      <button onClick={handleTypeingBack} className="btn btn-success btn-sm">
        {"T.B"}
        <i className="fa fa-trash"></i>
        {error && <span className="text-danger ml-2">{error}</span>}
      </button>
      <ToastContainer />
    </div>
  );
}
