import { useState } from "react";
export default function DeletePatient({ setPatients, patients, itemId }) {
  const [error, setError] = useState(null);

  const handleTypeingBack = async () => {
    setError(null);
    const token = JSON.parse(localStorage.getItem("token"));

    const response = await fetch(
      `https://api.desherkhobor24.com/admin/operation/delete/${itemId}`,
      {
        method: "PUT",
        headers: { authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 200) {
      const updatedPatient = patients.filter(
        (patient) => patient._id !== itemId
      );
      setPatients(updatedPatient);
    }
  };

  return (
    <button onClick={handleTypeingBack} className="btn btn-success btn-sm">
      Delete
      <i className="fa fa-trash"></i>
      {error && <span className="text-danger ml-2">{error}</span>}
    </button>
  );
}
