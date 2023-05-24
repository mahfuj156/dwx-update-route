import axios from "axios";
import $ from "jquery";
import { useEffect, useState } from "react";

const DrSelectBox = ({ name, setFieldValue, role, ide, values = {} }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          "https://api.desherkhobor24.com/doctorlist",
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setDoctors(response.data.data);
      } catch (error) {}
    }

    fetchDoctors();
  }, []);

  useEffect(() => {
    // Initialize select2 plugin
    const $select = $(".select2");
    const select2Instance = $select.select2({
      // Pass handleSelect function as onSelect callback
      onSelect: handleSelect,
    });

    // Clean up function to remove select2 plugin when component unmounts
    return () => {
      // Check if the element is using Select2 before calling destroy method
      if (select2Instance.data("select2")) {
        //       select2Instance.select2("destroy");
      }
    };
  }, [handleSelect]);

  const handleSelect = (event) => {
    console.log(event);
    const selectedOptionIds = event.params.data.id;
    setFieldValue(name, selectedOptionIds);
  };

  const handleChange = (event) => {
    // Only set the field value, do not interfere with the onSelect event in select2
    setFieldValue(name, event.target.value);
  };

  return (
    <select
      className="select2 form-control"
      id={ide}
      name={name}
      value={values[name] || ""}
      onChange={handleChange}
    >
      <option value="">Select</option>
      {doctors &&
        doctors.map((doctor) => {
          if (doctor.role === role) {
            return (
              <option key={doctor._id} value={doctor._id + "__" + doctor.email}>
                {doctor.email}
              </option>
            );
          } else {
            // skip doctors whose role is not 'xray_dr'
            return null;
          }
        })}
    </select>
  );
};

export default DrSelectBox;
