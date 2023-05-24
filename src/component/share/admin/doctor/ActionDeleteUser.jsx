import React, { useState } from "react";
import { toast } from "react-toastify";

function ActionDeleteUser({ setUsers, users, itemId }) {
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    const token = JSON.parse(localStorage.getItem("token"));

    const response = await fetch(
      `https://api.desherkhobor24.com/users/delete/${itemId}`,
      {
        method: "PUT",
        body: itemId,
        headers: { authorization: `Bearer ${token}` },
      }
    ); 

    if (response.status === 200) {
      const updatedUsers = users.filter((user) => user._id !== itemId);
      setUsers(updatedUsers);
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

export default ActionDeleteUser;
