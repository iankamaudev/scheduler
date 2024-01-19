import React, { useState } from 'react';
import CourseList from './components/CourseList';
import Schedule from './components/Schedule';

const App = () => {
  const getInitialSchedule = () => {
    const times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM'];
    return times.map((time) => ({
      time,
      days: ['', '', '', '', ''], // Monday to Friday
    }));
  };

  const [selectedCourses, setSelectedCourses] = useState([]);
  // Call getInitialSchedule() after it's defined
  const [schedule, setSchedule] = useState(getInitialSchedule());
  const [selectedDay, setSelectedDay] = useState(''); // New state for selected day
  const [selectedTime, setSelectedTime] = useState(''); // New state for selected time


  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleAddCourse = (courseString) => {
    if (!courseString || !selectedDay) {
      return; // Ignore if no course or day is selected
    }
  
    const course = JSON.parse(courseString);
  
    // Check if the course already exists in the selected courses for the same day and time
    const existingCourse = selectedCourses.find(
      (c) => c.day === selectedDay && c.time === course.time
    );
  
    if (existingCourse) {
      alert('A course for this day and time already exists!');
      return;
    }
  
    setSelectedCourses((prevCourses) => [
      ...prevCourses,
      { ...course, day: selectedDay },
    ]);
    updateSchedule(course, selectedDay);
  };

  const handleRemoveCourse = (index) => {
    const removedCourse = selectedCourses[index];
    setSelectedCourses((prevCourses) => prevCourses.filter((course) => course !== removedCourse));
    updateSchedule(removedCourse, removedCourse.day, true);
  };

  const updateSchedule = (course, day, remove = false) => {
    setSchedule((prevSchedule) => {
      const updatedSchedule = [...prevSchedule];
      const rowIndex = updatedSchedule.findIndex((row) => row.time === course.time);
  
      if (rowIndex !== -1) {
        const dayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].indexOf(day);
  
        if (dayIndex !== -1) {
          updatedSchedule[rowIndex].days[dayIndex] = remove ? '' : course.name;
        }
      }
  
      return updatedSchedule;
    });
  };

  return (
    <div className="app-container">
      <CourseList onAddCourse={handleAddCourse} />
      <div className="selected-courses-container">
        <h2>Selected Courses</h2>
        <ul>
          {selectedCourses.map((course, index) => (
            <li key={index}>
              {course.name} ({course.day}){' '}
              <button onClick={() => handleRemoveCourse(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="day-dropdown-container">
        <label>Select a Day:</label>
        <select value={selectedDay} onChange={handleDayChange}>
          <option value="">Select a Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
        </select>
      </div>
      <Schedule schedule={schedule} />
    </div>
  );
};

export default App;