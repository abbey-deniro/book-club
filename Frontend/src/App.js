import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import Homepage from './Homepage';
import JoinClub from './JoinClub';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/joinClub" element={<JoinClub />} />
      </Routes>
    </Router>
  );
}

export default App;
