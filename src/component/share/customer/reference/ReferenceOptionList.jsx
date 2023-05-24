import axios from "axios";
import { useEffect, useState } from "react";

export default function ReferenceOptionList() {
  const [references, setReference] = useState([]);

  const getReferenceList = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get("https://api.desherkhobor24.com/agent/references", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setReference(response.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getReferenceList();
  }, []);

  return (
    <>
      {references &&
        references.map((reference, index) => {
          return (
            <option key={index} value={reference.name}>
              {reference.name}
            </option>
          );
        })}
    </>
  );
}
