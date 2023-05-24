import axios from "axios";
import $ from "jquery";
import React, { useEffect, useRef, useState } from "react";
import "select2";

const Select2MultiSelect = ({ ide, role, field, form, ...props }) => {
  const selectRef = useRef(null);

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
    $("#" + ide)
      .select2({
        multiple: true,
        allowClear: true,
        placeholder: "Select options...",
      })
      .val(field.value || [])
      .trigger("change");

    $("#" + ide).on("select2:select select2:unselect", function (e) {
      const selectedValues = $("#" + ide)
        .val()
        .map((val) => (val === "" ? null : val));
      form.setFieldValue(field.name, selectedValues);
    });

    return () => {
      $("#" + ide).off("select2:select select2:unselect");
      $("#" + ide).select2("destroy");
    };
  }, [field.name, field.value, form]);

  return (
    <select
      {...field}
      {...props}
      ref={selectRef}
      id={ide}
      value={field.value || []}
      onChange={(e) => {
        const selectedValues = $(e.target)
          .val()
          .map((val) => (val === "" ? null : val));
        form.setFieldValue(field.name, selectedValues);
      }}
      onBlur={() => form.setFieldTouched(field.name, true)}
      multiple
    >
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

export default Select2MultiSelect;
