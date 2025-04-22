import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './pages/Home';
import CollegeNavbar from './appComponents/navBar/CollegeNavbar';
import Footer from './appComponents/navBar/Footer';
import AdminLoginForm from './pages/AdminLoginForm';
import {RouteNames} from './constants/routeNames';
import {AuthWrapper} from './AuthWrapper';

function App() {
  return (
    <AuthWrapper>
      <div className="flex w-full flex-col">
        <Router>
          <CollegeNavbar />
          <Routes>
            <Route path={RouteNames.DEFAULT} element={<Home />} />
            <Route path={RouteNames.HOME} element={<Home />} />
            <Route path={RouteNames.ADMIN} element={<AdminLoginForm />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </AuthWrapper>
  );
}

export default App;
