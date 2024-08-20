import React from 'react'
import InputField from '../components/InputField'

const EventCategory = ({handleChange}) => {
  return (
    <div>
    <h4 className="text-lg font-medium mb-2">Event Category</h4>
 <div>
   <label className="sidebar-label-container">
     <input onChange={handleChange} type="radio" value="" name="test" />
     <span className="checkmark"></span>Any
   </label>
   <InputField
     handleChange={handleChange}
     value="Lecture"
     title="Lecture"
     name="test"
   />
   <InputField
     handleChange={handleChange}
     value="Sports"
     title="Sports"
     name="test"
   />
   <InputField
     handleChange={handleChange}
     value="Networking"
     title="Networking"
     name="test"
   />
 </div>
</div>
  )
}

export default EventCategory