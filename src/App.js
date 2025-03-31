import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import './App.css';

const skillsData = [
  { name: 'React', level: 90 },
  { name: 'JavaScript', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'Python', level: 75 },
  { name: 'SQL', level: 85 },
  { name: 'Git', level: 88 },
];

const projectsData = [
  { name: 'E-commerce Platform', completion: 100 },
  { name: 'Portfolio Website', completion: 100 },
  { name: 'Task Manager App', completion: 90 },
  { name: 'Weather Dashboard', completion: 85 },
  { name: 'Chat Application', completion: 75 },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SantiSkills Dashboard</h1>
      </header>
      <main className="dashboard-container">
        <section className="skills-section">
          <h2>Skills Overview</h2>
          <div className="chart-container">
            <RadarChart width={500} height={400} data={skillsData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Skills"
                dataKey="level"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </div>
        </section>
        
        <section className="projects-section">
          <h2>Project Completion</h2>
          <div className="chart-container">
            <BarChart width={500} height={300} data={projectsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completion" fill="#82ca9d" />
            </BarChart>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
