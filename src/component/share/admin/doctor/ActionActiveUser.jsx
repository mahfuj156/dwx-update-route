import React, { useState } from "react";
import { toast } from "react-toastify";

function ActionActiveUser({ setUsers, users, itemId }) {
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    const token = JSON.parse(localStorage.getItem("token"));

    const response = await fetch(
      `https://api.desherkhobor24.com/users/active/${itemId}`,
      {
        method: "PUT",
        body: itemId,
        headers: { authorization: `Bearer ${token}` },
      }
    ); 

    if (response.status === 200) {
      const updatedUsers = users.filter((user) => user._id !== itemId);
      setUsers(updatedUsers);
      toast.success("Activated successfully!");
    }
  };

  return (
    <>
      <button onClick={handleDelete} className="btn btn-success btn-sm">
        {loading ? "Activing..." : "Active"}
        <i className="fa fa-trash"></i>
        {error && <span className="text-danger ml-2">{error}</span>}
      </button>
    </>
  );
}

export default ActionActiveUser;
