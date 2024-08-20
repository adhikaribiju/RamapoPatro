import { Input } from "postcss";
import React from "react";
import InputField from "../components/InputField";

const Location = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Location</h4>
      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <InputField
          handleChange={handleChange}
          value="ASB"
          title="ASB"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Pavillion"
          title="Pavillion"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Bischoff"
          title="Bischoff"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="SC"
          title="SC"
          name="test"
        />
      </div>
    </div>
  );
};

export default Location;
