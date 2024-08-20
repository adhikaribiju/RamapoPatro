import React from 'react'
import InputField from '../components/InputField'

const ExperienceLevel = ({handleChange}) => {
  return (
    <div>
         <h4 className="text-lg font-medium mb-2">Open to</h4>
      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>Everyone
        </label>
        <InputField
          handleChange={handleChange}
          value="RCNJ Students only"
          title="RCNJ Students only"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Faculty only"
          title="Faculty only"
          name="test"
        />
      </div>
    </div>
  )
}

export default ExperienceLevel;