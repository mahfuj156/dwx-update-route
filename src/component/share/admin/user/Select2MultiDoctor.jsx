import axios from "axios";
import $ from "jquery";
import React, { useEffect, useRef, useState } from "react";
import "select2";

const Select2MultiDoctor = ({ ide, field, form, ...props }) => {
  const selectRef = useRef(null);

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          "https://api.desherkhobor24.com/users/alldoctors",
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
          return (
            <option key={doctor._id} value={doctor._id + "__" + doctor.email}>
              {doctor.email}
            </option>
          );
        })}
    </select>
  );
};

export default Select2MultiDoctor;
