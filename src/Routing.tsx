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
import {useFetchSmallAboutCard} from './services/textServices/fetchSmallAboutCard';
import AlertsPage from './pages/Alerts/Alerts';
import AlertDesc from './pages/Alerts/AlertDesc';
import {ProtectedRoute} from './ProtectedRoute';
import PrincipalMESSAGE from './pages/PrincipalMessage';
import Faculty from './pages/Faculty/Faculty';
import {
  GuestFaculty,
  NonTeacthingStaff,
  PermanentFaculty,
} from './components/faculty/permanentFaculty';
import AboutPage from './pages/About';
import AcademicsPage from './pages/AcademicsPage';
import GalleryPage from './pages/GalleryPage';
import {useFetchCollegeResources} from './services/collegeResources/fetchCollegeResources';

// Placeholder component for routes without content yet
const PlaceholderPage = ({title}: {title: string}) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">{title}</h1>
        <p className="mb-8 text-lg text-gray-600">
          This page is under construction.
        </p>
        <p className="text-gray-500">Content will be added soon.</p>
      </div>
    </div>
  );
};

const Routing = () => {
  const [floatingIconVisible, setFloatingIconVisible] = useState<boolean>(true);

  useCarouselDimensions(); // Custom hook to load dimensions
  useFetchCarouselImages(); // Custom hook to load carousel images
  useFetchProspectusAndAdmissionForm(); //Fetch prospectus and admission form
  useFetchNoticeBoard(); //Fetch notice board
  useFetchAlerts(); //Fetch alerts
  useFetchSmallAboutCard(); //Fetch small about card
  useFetchCollegeResources(); //Fetch college resources

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
      <main>
        <Routes>
          <Route path={RouteNames.DEFAULT} element={<Home />} />
          <Route path={RouteNames.HOME} element={<Home />} />
          <Route path={RouteNames.ABOUT} element={<AboutPage />} />
          <Route path={RouteNames.CONTACT} element={<Contact />} />
          <Route path={RouteNames.ACADEMICS} element={<AcademicsPage />} />
          <Route path={RouteNames.GALLERY} element={<GalleryPage />} />
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
            element={<GuestFaculty />}
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

          {/* Navbar Placeholder Routes */}
          <Route
            path={RouteNames.ACTIVITIES}
            element={<PlaceholderPage title="Activities" />}
          />
          <Route
            path={RouteNames.RULES_REGULATIONS}
            element={<PlaceholderPage title="Rules & Regulations" />}
          />
          <Route
            path={RouteNames.FEE_STRUCTURE}
            element={<PlaceholderPage title="Fee Structure" />}
          />
          <Route
            path={RouteNames.ADMISSION_ELIGIBILITY}
            element={<PlaceholderPage title="Admission Eligibility" />}
          />
          <Route
            path={RouteNames.FUTURE_PROGRAMMES}
            element={<PlaceholderPage title="Future Programmes" />}
          />
          <Route
            path={RouteNames.STUDENT_UNIFORM}
            element={<PlaceholderPage title="Student Uniform" />}
          />
          <Route
            path={RouteNames.RESULT}
            element={<PlaceholderPage title="Result" />}
          />
          <Route
            path={RouteNames.ACADEMIC_PERFORMANCE}
            element={<PlaceholderPage title="Academic Performance" />}
          />

          {/* Quick Access Placeholder Routes */}
          <Route
            path={RouteNames.IQAC}
            element={<PlaceholderPage title="IQAC" />}
          />
          <Route
            path={RouteNames.COMMITTEE_CELLS}
            element={<PlaceholderPage title="Committee & Cells" />}
          />
          <Route
            path={RouteNames.SSR}
            element={<PlaceholderPage title="SSR" />}
          />
          <Route
            path={RouteNames.ACADEMIC_CALENDAR}
            element={<PlaceholderPage title="Academic Calendar" />}
          />
          <Route
            path={RouteNames.NAAC}
            element={<PlaceholderPage title="NAAC" />}
          />
          <Route
            path={RouteNames.MISC_DOCUMENTS}
            element={<PlaceholderPage title="Misc Documents" />}
          />
          <Route
            path={RouteNames.HELP_DESK}
            element={<PlaceholderPage title="Help Desk" />}
          />
          <Route
            path={RouteNames.AQAR}
            element={<PlaceholderPage title="AQAR" />}
          />
        </Routes>
      </main>
      {/* Conditionally render the footer */}
      {!isPdfViewer && <Footer />}

      {/* Conditionally render floating icons */}
      {floatingIconVisible && !isPdfViewer && <WhatsAppIcon />}
      {floatingIconVisible && !isPdfViewer && <UpArrowIcon />}
    </div>
  );
};

export default Routing;
