import '../App.css';
import React from 'react';
import Signup from './Signup';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <h1>React App</h1>
      <Signup />
    </div>
  );
}

export default App;
