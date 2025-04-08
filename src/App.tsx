import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Home from './pages/Home';
import CollegeNavbar from './appComponents/navBar/CollegeNavbar';

function App() {
  return (
    <div className="flex flex-col w-full">
      <BrowserRouter>
        <CollegeNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
