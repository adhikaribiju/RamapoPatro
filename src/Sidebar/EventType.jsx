import React from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";

const EventType = ({ handleChange, handleClick }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Type of Event</h4>
      {/* eventType filtering */}
      <div className="mb-4">
        <Button onClickHandler={handleClick} value="On campus" title="On Campus" />
        <Button onClickHandler={handleClick} value="Online" title="Online" />
        <Button onClickHandler={handleClick} value="Hybrid" title="Hybrid" />
      </div>
    </div>
  );
};

export default EventType;
