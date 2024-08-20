import React from 'react';

const EventTooltip = ({ event, style }) => {
  console.log('Event data:', event); // Log the event object to the console

  // Conditionally add a green background if location does not exist
  const containerStyle = event.location
    ? { ...style }
    : { ...style, backgroundColor: 'green', color: 'white' }; // Add green background and white text if no location

  return (
    <div className="tooltip-container" style={containerStyle}>
      <h4>{event.title}</h4>
      {event.date && <p><strong>Date:</strong> {event.date}</p>}  {/* Only show if event.date exists */}
      <p><strong>Time:</strong> {event.time}</p>
      {event.location && <p><strong>Location:</strong> {event.location}</p>}  {/* Only show if event.location exists */}
      <br />
      <p>{event.description}</p>
    </div>
  );
};

export default EventTooltip;
