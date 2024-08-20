import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Sidebar from "../Sidebar/Sidebar";
import Events from "./Events";
import Card from "../components/Card";
import Newsletter from "../components/Newsletter";
import useCurrentUser from "../hooks/useCurrentUser";
import { eventRecommender } from "../utils/eventRecommender";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [events, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isLoading, setIsLoading] = useState(true);


  const user = useCurrentUser();

  useEffect(() => {
    
    const fetchData = async () => {
      let data;
      try {
        setIsLoading(true);
        console.log("Fetching all events...");
        let res = await fetch("http://localhost:5001/all-events");
        data = await res.json();
  
        if (user) {
          console.log("Fetching user data...");
          res = await fetch(`http://localhost:5001/userdata/${user.email}`);
          
          if (!res.ok) {
            throw new Error("Failed to fetch user data");
          }
          
          const userData = await res.json();
          console.log("User data fetched:", userData);
  
          // Process and sort the events
          data = eventRecommender(data, userData);
          console.log("Sorted Data:", data);
        }
  
        setJobs(data);
      } catch (error) {
        console.error("Error:", error);
        setJobs(data);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [user]);
  
/*
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5001/all-events")
      .then((res) => res.json())
      .then((data) => {
        if (user){
          console.log("Hereeeeee");
          //fetch the userdata
          // Fetch the user's class schedule
          fetch(`http://localhost:5001/userdata/${user.email}`)
            .then((res) => {
              if (!res.ok) {
                throw new Error("Failed to fetch user data");
              }
              return res.json();
            })
            .then((userData) => {
              console.log("Here");
              //console.log(userData);
              data = eventRecommender(data,userData);
              console.log(data);
              setJobs(data);
            }
            )
          }

        setJobs(data);
        setIsLoading(false);
      });
  }, []);
  */

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };


  const filteredItems = events.filter(
    (event) => event.eventTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );


  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    // console.log(event.target.value);
  };

  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Function to calculate the index range for the current page
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  
  };

  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredData = (events, selected, query) => {
    let filteredJobs = events;
    // Filtering Input Items

    //console.log(filteredItems)
    if (query) {
      filteredJobs = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      console.log((selected));

      filteredJobs = filteredJobs.filter(
        ({
          eventLocation,
          eventType,
          experienceLevel,
          endTime,
          postingDate,
          eventCategory,
        }) =>
          eventLocation.toLowerCase() === selected.toLowerCase() ||
          postingDate === selected ||
          parseInt(endTime) <= parseInt(selected) ||
          eventType.toLowerCase() === selected.toLowerCase() ||
         experienceLevel.toLowerCase() === selected.toLowerCase() ||
         eventCategory.toLowerCase() === selected.toLowerCase()
      );
      console.log(filteredJobs);
    }

    // Slice the data based on the current page
    const { startIndex, endIndex } = calculatePageRange();
    try{
    filteredJobs = filteredJobs.slice(startIndex, endIndex);
    }
    catch{
      console.log("Caught");
    }

    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData(events, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      {/* main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        <div className="col-span-2 bg-white p-4 rounded">
          {isLoading ? ( // Loading indicator
            <p className="font-medium">Loading...</p>
          ) : result.length > 0 ? (
            <Events result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} Events</h3>
              <p>No data found</p>
            </>
          )}

          {/* pagination block here */}

          {result.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="hover:underline"
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems.length / itemsPerPage)
                }
                className="hover:underline"
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="bg-white p-4 rounded">
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Home;
