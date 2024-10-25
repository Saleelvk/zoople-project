import React from 'react';
import Navbar from './components/Navbar/NavBar'; // Adjust the import path as needed
import Routing from './Routing/Routing'; // Adjust the import path as needed
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation(); // Get current location

  return (
    <div>
      {/* Render Navbar only when not on login page */}
      {location.pathname !== '/login' && <Navbar />}
      <Routing />
    </div>
  );
}

export default App;
