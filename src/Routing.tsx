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
import NoticesPage from './pages/NoticesPage';
import {useFetchNoticeBoard} from './services/noticeBoard/fetchNoticeBoard';
import {useFetchAlerts} from './services/noticeBoard/fetchAlertsHook';
import AlertsPage from './pages/Alerts/Alerts';
import AlertDesc from './pages/Alerts/AlertDesc';
import {ProtectedRoute} from './ProtectedRoute';
import PrincipalMESSAGE from './pages/PrincipalMessage';
import Faculty from './pages/Faculty/Faculty';
import {
  NonTeacthingStaff,
  PermanentFaculty,
} from './components/faculty/permanentFaculty';

const Routing = () => {
  const [floatingIconVisible, setFloatingIconVisible] = useState<boolean>(true);

  useCarouselDimensions(); // Custom hook to load dimensions
  useFetchCarouselImages(); // Custom hook to load carousel images
  useFetchProspectusAndAdmissionForm(); //Fetch prospectus and admission form
  useFetchNoticeBoard(); //Fetch notice board
  useFetchAlerts(); //Fetch alerts

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
        <Route
          path={RouteNames.PRINCIPAL_MESSAGE}
          element={<PrincipalMESSAGE />}
        />
        <Route path={RouteNames.FACULTY} element={<Faculty />} />
        <Route
          path={`${RouteNames.FACULTY}/permanent-faculty`}
          element={<PermanentFaculty />}
        />
        <Route
          path={`${RouteNames.FACULTY}/non-teaching-staffs`}
          element={<NonTeacthingStaff />}
        />
        <Route
          path={`${RouteNames.FACULTY}/guest-faculty`}
          element={<Faculty />}
        />
        <Route
          path={RouteNames.ADMIN}
          element={
            <ProtectedRoute>
              <AdminLoginForm />
            </ProtectedRoute>
          }
        />
        <Route path="/pdf-viewer" element={<PdfIframe />} />
        <Route path={RouteNames.NOTICE_BOARD} element={<NoticesPage />} />
        <Route path={RouteNames.ALERTS} element={<AlertsPage />} />
        <Route
          path={`${RouteNames.ALERTS}/:id/:title`}
          element={<AlertDesc />}
        />
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
