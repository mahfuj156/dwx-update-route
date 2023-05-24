import React, { useState } from "react";
import { toast } from "react-toastify";

function ActionDeleteCheckeduser({ setCheckuser, checkusers, itemId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    const token = JSON.parse(localStorage.getItem("token"));

    const response = await fetch(
      `https://api.desherkhobor24.com/agent/checkusers/${itemId}`,
      {
        method: "DELETE",
        body: itemId,
        headers: { authorization: `Bearer ${token}` },
      }
    );
    console.log(response);

    if (response.status === 200) {
      const updatedReference = checkusers.filter(
        (reference) => reference._id !== itemId
      );
      setCheckuser(updatedReference);
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

export default ActionDeleteCheckeduser;
