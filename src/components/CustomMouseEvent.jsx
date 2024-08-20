import React from 'react';

const CustomMouseEvent = ({ event, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      onMouseEnter={(e) => onMouseEnter(event, e)}
      onMouseLeave={onMouseLeave}
    >
      {event.title}
    </div>
  );
};

export default CustomMouseEvent;
