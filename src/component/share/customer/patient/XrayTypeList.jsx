import axios from "axios";
import { useEffect, useState } from "react";

export default function XrayTypeList() {

  const [types, setType] = useState([]);
  useEffect(() => {
    async function fetchTypes() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          "https://api.desherkhobor24.com/agent/types",
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setType(response.data.data);
      } catch (error) {}
    }

    fetchTypes();
  }, []);

  return (
    <> 
      {types &&
      types.map((type,index) => {
        return(
          <option key={index} value={type.name}>{type.name}</option>
        )
      })}
       
    </>
  );
}
