import React, {useState} from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';
import {WhatsAppIcon, UpArrowIcon} from './appComponents/bottomFloatingIcons';
import CollegeNavbar from './appComponents/navBar/CollegeNavbar';
import Footer from './appComponents/navBar/Footer';
import {RouteNames} from './constants/routeNames';
import AdminLoginForm from './pages/AdminLoginForm';
import Contact from './pages/Contact';
import Home from './pages/Home';
import {useFetchCarouselImages} from './services/carousel/carouselFetchHook';
import {useCarouselDimensions} from './services/carousel/fetchDimentions';
import {PdfIframe} from './appComponents/pdfIframe';
import {useFetchProspectusAndAdmissionForm} from './services/fetchProspectusAndAdmissionForm';

const Routing = () => {
  const [floatingIconVisible, setFloatingIconVisible] = useState<boolean>(true);

  useCarouselDimensions(); // Custom hook to load dimensions
  useFetchCarouselImages(); // Custom hook to load carousel images
  useFetchProspectusAndAdmissionForm(); //Fetch prospectus and admission form

  return (
    <Router>
      <RoutesWrapper
        floatingIconVisible={floatingIconVisible}
        setFloatingIconVisible={setFloatingIconVisible}
      />
    </Router>
  );
};

const RoutesWrapper = ({
  floatingIconVisible,
  setFloatingIconVisible,
}: {
  floatingIconVisible: boolean;
  setFloatingIconVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const location = useLocation();

  // Check if the current path is "/pdf-viewer"
  const isPdfViewer = location.pathname === '/pdf-viewer';

  return (
    <div className="flex w-full flex-col">
      {/* Conditionally render the navbar */}
      {!isPdfViewer && (
        <CollegeNavbar setFloatingIconVisible={setFloatingIconVisible} />
      )}

      <Routes>
        <Route path={RouteNames.DEFAULT} element={<Home />} />
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route path={RouteNames.CONTACT} element={<Contact />} />
        <Route path={RouteNames.ADMIN} element={<AdminLoginForm />} />
        <Route path="/pdf-viewer" element={<PdfIframe />} />
      </Routes>

      {/* Conditionally render the footer */}
      {!isPdfViewer && <Footer />}

      {/* Conditionally render floating icons */}
      {floatingIconVisible && !isPdfViewer && <WhatsAppIcon />}
      {floatingIconVisible && !isPdfViewer && <UpArrowIcon />}
    </div>
  );
};

export default Routing;
