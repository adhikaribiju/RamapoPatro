import React from 'react'

const Events = ({ result }) => {
  return (
    <>
     <div>
     <h3 className='text-lg font-bold mb-2'>{result.length} Events</h3>
     </div>
      <section className="card-container">{result}</section>
    </>
  );
};

export default Events;

