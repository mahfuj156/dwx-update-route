




import { useState } from "react";
export default function DeleteFormatAction({ setformat, formats, itemId }) {
  const [error, setError] = useState(null);

  const handleTypeingBack = async () => {
    setError(null);
    const token = JSON.parse(localStorage.getItem("token"));

    const response = await fetch(
      `https://api.desherkhobor24.com/doctor-formats/${itemId}`,
      {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      }
    );

    console.log(response);
    if (response.status === 200) {
      const updatedFormat = formats.filter(
        (format) => format._id !== itemId
      );
      setformat(updatedFormat);
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
