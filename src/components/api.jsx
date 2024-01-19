// api.js
const courses = [
  { id: 1, name: 'Web Development' },
  { id: 2, name: 'Data Science' },
  { id: 3, name: 'Mobile App Development' },
  // Add more courses as needed
];

const getCourses = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(courses);
    }, 500); // Simulating an API delay
  });
};

export default getCourses;