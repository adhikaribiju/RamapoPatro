// Function to generate class dates for the next two weeks
const generateClassDates = (classSchedule) => {
  const twoWeeks = 14; // Number of days to consider
  const today = new Date();
  let classDates = [];

  classSchedule.forEach((classItem) => {
    classItem.days.forEach((day) => {
      for (let i = 0; i < twoWeeks; i++) {
        let tempDate = new Date(today);
        tempDate.setDate(today.getDate() + i);
        if (tempDate.toLocaleString('en-US', { weekday: 'short' }) === day) {
          classDates.push({
            date: tempDate.toISOString().split('T')[0],
            starttime: classItem.starttime,
            endtime: classItem.endtime,
            title: classItem.title
          });
        }
      }
    });
  });

  return classDates;
};

// Function to check for time conflict between class and event
const hasTimeConflict = (classDates, eventDate, eventStartTime, eventEndTime) => {
  return classDates.some((classItem) => {
    if (classItem.date === eventDate) {
      return (
        (eventStartTime >= classItem.starttime && eventStartTime < classItem.endtime) ||
        (eventEndTime > classItem.starttime && eventEndTime <= classItem.endtime) ||
        (eventStartTime <= classItem.starttime && eventEndTime >= classItem.endtime)
      );
    }
    return false;
  });
};

// Main eventRecommender function
export const eventRecommender = (events, userData) => {
  const classDates = generateClassDates(userData.classSchedule);
  const recommendedEvents = [];

  events.forEach((event) => {
    let rank = 0;

    // 1. Check for time conflicts with class schedule
    const eventDate = event.postingDate;
    const eventStartTime = event.startTime;
    const eventEndTime = event.endTime;

    if (hasTimeConflict(classDates, eventDate, eventStartTime, eventEndTime)) {
      rank -= 100; // Penalize events with time conflicts
    } else {
      rank += 10; // Reward events with no time conflicts
    }

    // 2. Compare interestTags with event skills
    if (event.skills) {
      event.skills.forEach((skill) => {
        if (userData.interestTags.includes(skill.value)) {
          rank += 20; // Increase rank if skills match interestTags
        }
      });
    }

    // 3. Check if user is already registered for any event
    let userRegisteredSkills = [];
    events.forEach((e) => {
      if (e.regEmails.includes(userData.userEmail)) {
        if (e.skills) {
          userRegisteredSkills = userRegisteredSkills.concat(
            e.skills.map((skill) => skill.value)
          );
        }
      }
    });

    // 4. Compare skills of other registered events with current event skills
    if (event.skills) {
      event.skills.forEach((skill) => {
        if (userRegisteredSkills.includes(skill.value)) {
          rank += 15; // Increase rank if registered event skills match
        }
      });
    }

    // 5. Add event popularity based on the number of registrations
    const numRegistrations = event.regEmails.length;
    if (numRegistrations > 0) {
      rank += numRegistrations * 2; // Increase rank based on popularity
    }

    // 6. Add event to the recommended list with its rank
    recommendedEvents.push({ event, rank });
  });

  // Sort events by rank in descending order (higher rank first)
  recommendedEvents.sort((a, b) => b.rank - a.rank);

  // Return only the sorted events without rank
  return recommendedEvents.map((item) => item.event);
};
