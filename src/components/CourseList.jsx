import React, { useState, useEffect } from 'react';
import getCourses from './api';
import '../schedule.css';

const CourseList = ({ onAddCourse }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="course-list-container">
      <h2 className="course-list-header">Available Courses</h2>
      <select className="course-dropdown" onChange={(e) => onAddCourse(e.target.value)}>
        <option value="" disabled selected>
          Select a Course
        </option>
        {courses.map((course) => (
          <option key={course.id} value={JSON.stringify(course)}>
            {course.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CourseList;
