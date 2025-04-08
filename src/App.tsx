import {Route, HashRouter, Routes} from 'react-router-dom';
import Home from './pages/Home';
import CollegeNavbar from './appComponents/navBar/CollegeNavbar';

function App() {
  return (
    <div className="flex flex-col w-full">
      <HashRouter>
        <CollegeNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
