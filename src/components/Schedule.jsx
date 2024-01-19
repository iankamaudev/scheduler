import React from 'react';
import '../schedule.css';

const Schedule = ({ schedule }) => {
  return (
    <div className="schedule-container">
      <h2 className="schedule-header">Schedule</h2>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((row) => (
            <tr key={row.time}>
              <td>{row.time}</td>
              {row.days.map((course, index) => (
                <td key={index}>{course || ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
