import React, { useState } from "react";
import { toast } from "react-toastify";

function ActionDeleteReference({ setReference, references, itemId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    const token = JSON.parse(localStorage.getItem("token"));

    const response = await fetch(
      `https://api.desherkhobor24.com/agent/references/${itemId}`,
      {
        method: "DELETE",
        body: itemId,
        headers: { authorization: `Bearer ${token}` },
      }
    );
    console.log(response);

    if (response.status === 200) {
      const updatedReference = references.filter(
        (reference) => reference._id !== itemId
      );
      setReference(updatedReference);
      toast.success("Delete successfully!");
    }
  };

  return (
    <>
      <button onClick={handleDelete} className="btn btn-danger btn-sm">
        {loading ? "Deleting..." : "Delete"}
        <i className="fa fa-trash"></i>
        {error && <span className="text-danger ml-2">{error}</span>}
      </button>
    </>
  );
}

export default ActionDeleteReference;
