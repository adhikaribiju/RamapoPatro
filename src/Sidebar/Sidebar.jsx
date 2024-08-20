import React from 'react'
import Location from './Location'
import EventType from './EventType'
import EventPostingData from './EventPostingData'
import ExperienceLevel from './ExperienceLevel'
import EventCategory from './EventCategory'

const Sidebar = ({ handleChange, handleClick }) => {
  return (
    <div className='space-y-5'>
        <h3 className='text-lg font-bold mb-2'>Filters</h3>
        <Location handleChange={handleChange}/>
        <EventType handleChange={handleChange} handleClick={handleClick}/>
        <EventPostingData handleChange={handleChange}/>
        <ExperienceLevel handleChange={handleChange}/>
        <EventCategory handleChange={handleChange}/>
    </div>
  )
}

export default Sidebar