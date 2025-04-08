import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './pages/Home';
import CollegeNavbar from './appComponents/navBar/CollegeNavbar';

function App() {
  return (
    <div className="flex flex-col w-full">
      <Router basename="/btcstagartala">
        <CollegeNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
