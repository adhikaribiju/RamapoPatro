
import { FiCalendar, FiClock, FiDollarSign, FiMapPin, FiSearch } from "react-icons/fi";
import { HiMenuAlt2 } from "react-icons/hi";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  console.log(data);
  const {_id,eventLogo, eventTitle, organizerName, eventLocation, eventCategory, eventType, startTime,endTime, postingDate, eventDescription} = data;
  
  // Function to get the first 28 words
  const getShortDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 28) {
      return words.slice(0, 22).join(' ') + '...';
    } else {
      return description;
    }
  };


  return (
    <div>
      <section className="card">
        <Link to={`/events/${_id}`} className="flex gap-4 flex-col sm:flex-row items-start">
          <img src={eventLogo} alt={eventTitle} className="w-60 h-120 mb-8" />
          <div className="card-details">
            <h4 className="text-primary mb-1">{organizerName}</h4>
            <h3 className="text-lg font-semibold mb-2">{eventTitle}</h3>

            <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
              <span className="flex items-center gap-2"><FiMapPin/> {eventLocation}</span>
              <span className="flex items-center gap-2"><HiMenuAlt2 /> {eventCategory}</span>
              <span className="flex items-center gap-2"><FiClock/> {startTime} - {endTime}</span>
              <span className="flex items-center gap-2"><FiCalendar/> {postingDate}</span>
            </div>

            <p className="text-base text-primary/70 ">{getShortDescription(eventDescription)}</p>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default Card;
