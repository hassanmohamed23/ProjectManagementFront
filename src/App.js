import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import ProjectsList from './components/ProjectsList.jsx';
import TasksList from './components/TasksList.jsx';
import Layout from './components/Layout.jsx';
import AddOrEditProject from './components/AddOrEditProject.jsx';
import AddOrEditTask from './components/AddOrEditTask.jsx';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ username: 'testuser' });
    }
  }, []);

  return (
    <Router>
       <Routes>
       <Route path="/login" element={<Login setUser={setUser} />} />
       </Routes>
      <Layout>
        <Routes>
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/projects/AddOrUpdate/:id" element={<AddOrEditProject />} />
          <Route path="/tasks/AddOrUpdate/:id" element={<AddOrEditTask />} />
          <Route path="/tasks" element={<TasksList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}


export default App;
