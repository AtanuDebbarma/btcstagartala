import {useState, Suspense, lazy} from 'react';
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
import Home from './pages/Home'; // Keep Home for immediate loading
import {useFetchCarouselImages} from './services/carousel/carouselFetchHook';
import {useCarouselDimensions} from './services/carousel/fetchDimentions';
import {useFetchProspectusAndAdmissionForm} from './services/fetchProspectusAndAdmissionForm';
import {useFetchNoticeBoard} from './services/noticeBoard/fetchNoticeBoard';
import {useFetchAlerts} from './services/noticeBoard/fetchAlertsHook';
import {useFetchSmallAboutCard} from './services/textServices/fetchSmallAboutCard';
import {useFetchCollegeResources} from './services/collegeResources/fetchCollegeResources';

// Lazy load all pages except Home
const AboutPage = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const AcademicsPage = lazy(() => import('./pages/AcademicsPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const AdminLoginForm = lazy(() => import('./pages/AdminLoginForm'));
const PdfIframe = lazy(() =>
  import('./appComponents/pdfIframe').then(module => ({
    default: module.PdfIframe,
  })),
);
const NoticesPage = lazy(() => import('./pages/NoticesPage'));
const AlertsPage = lazy(() => import('./pages/Alerts/Alerts'));
const AlertDesc = lazy(() => import('./pages/Alerts/AlertDesc'));
const ProtectedRoute = lazy(() =>
  import('./ProtectedRoute').then(module => ({default: module.ProtectedRoute})),
);
const PrincipalMESSAGE = lazy(() => import('./pages/PrincipalMessage'));
const Faculty = lazy(() => import('./pages/Faculty/Faculty'));
const PermanentFaculty = lazy(() =>
  import('./components/faculty/permanentFaculty').then(module => ({
    default: module.PermanentFaculty,
  })),
);
const NonTeacthingStaff = lazy(() =>
  import('./components/faculty/permanentFaculty').then(module => ({
    default: module.NonTeacthingStaff,
  })),
);
const GuestFaculty = lazy(() =>
  import('./components/faculty/permanentFaculty').then(module => ({
    default: module.GuestFaculty,
  })),
);
const AICTEPage = lazy(() => import('./pages/AICTEPage'));
const FacilitiesPage = lazy(() => import('./pages/FacilitiesPage'));
const FeeStructurePage = lazy(() => import('./pages/FeeStructurePage'));
const ActivitiesPage = lazy(() => import('./pages/ActivitiesPage'));
const RulesRegulationsPage = lazy(() => import('./pages/RulesRegulationsPage'));
const StudentUniformPage = lazy(() => import('./pages/StudentUniformPage'));
const CommitteeCellsPage = lazy(() => import('./pages/CommitteeCellsPage'));
const MiscDocumentsPage = lazy(() => import('./pages/MiscDocumentsPage'));
const ResultPage = lazy(() => import('./pages/ResultPage'));
const AISHEPage = lazy(() => import('./pages/AISHEPage'));
const DHEPage = lazy(() => import('./pages/DHEPage'));
const ProspectusRedirectPage = lazy(
  () => import('./pages/ProspectusRedirectPage'),
);

// Loading fallback component
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#900090] border-t-transparent"></div>
  </div>
);

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
          <Route
            path={RouteNames.ABOUT}
            element={
              <Suspense fallback={<PageLoader />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path={RouteNames.CONTACT}
            element={
              <Suspense fallback={<PageLoader />}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path={RouteNames.ACADEMICS}
            element={
              <Suspense fallback={<PageLoader />}>
                <AcademicsPage />
              </Suspense>
            }
          />
          <Route
            path={RouteNames.FACILITIES}
            element={
              <Suspense fallback={<PageLoader />}>
                <FacilitiesPage />
              </Suspense>
            }
          />
          <Route
            path={RouteNames.GALLERY}
            element={
              <Suspense fallback={<PageLoader />}>
                <GalleryPage />
              </Suspense>
            }
          />
          <Route
            path={RouteNames.PRINCIPAL_MESSAGE}
            element={
              <Suspense fallback={<PageLoader />}>
                <PrincipalMESSAGE />
              </Suspense>
            }
          />
          <Route
            path={RouteNames.FACULTY}
            element={
              <Suspense fallback={<PageLoader />}>
                <Faculty />
              </Suspense>
            }
          />
          <Route
            path={`${RouteNames.FACULTY}/permanent-faculty`}
            element={
              <Suspense fallback={<PageLoader />}>
                <PermanentFaculty />
              </Suspense>
            }
          />
          <Route
            path={`${RouteNames.FACULTY}/non-teaching-staffs`}
            element={
              <Suspense fallback={<PageLoader />}>
                <NonTeacthingStaff />
              </Suspense>
            }
          />
          <Route
            path={`${RouteNames.FACULTY}/guest-faculty`}
            element={
              <Suspense fallback={<PageLoader />}>
                <GuestFaculty />
              </Suspense>
            }
          />
          <Route
            path={RouteNames.ADMIN}
            element={
              <Suspense fallback={<PageLoader />}>
                <ProtectedRoute>
                  <AdminLoginForm />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/pdf-viewer"
            element={
              <Suspense fallback={<PageLoader />}>
                <PdfIframe />
              </Suspense>
            }
          />
          <Route
            path={RouteNames.NOTICE_BOARD}
            element={
              <Suspense fallback={<PageLoader />}>
                <NoticesPage />
              </Suspense>
            }
          />
          <Route
            path={RouteNames.ALERTS}
            element={
              <Suspense fallback={<PageLoader />}>
                <AlertsPage />
              </Suspense>
            }
          />
          <Route
            path={`${RouteNames.ALERTS}/:id/:title`}
            element={
              <Suspense fallback={<PageLoader />}>
                <AlertDesc />
              </Suspense>
            }
          />

          {/* Navbar Placeholder Routes */}
          <Route
            path={RouteNames.ACTIVITIES}
            element={
              <Suspense fallback={<PageLoader />}>
                <ActivitiesPage />
              </Suspense>
            }
          />
          <Route
            path={RouteNames.RULES_REGULATIONS}
            element={
              <Suspense fallback={<PageLoader />}>
                <RulesRegulationsPage />
              </Suspense>
            }
          />
          <Route
            path={RouteNames.FEE_STRUCTURE}
            element={
              <Suspense fallback={<PageLoader />}>
                <FeeStructurePage />
              </Suspense>
            }
          />
          <Route
            path={RouteNames.STUDENT_UNIFORM}
            element={
              <Suspense fallback={<PageLoader />}>
                <StudentUniformPage />
              </Suspense>
            }
          />
          <Route
            path={RouteNames.RESULT}
            element={
              <Suspense fallback={<PageLoader />}>
                <ResultPage />
              </Suspense>
            }
          />
          <Route
            path={RouteNames.ACADEMIC_PERFORMANCE}
            element={<PlaceholderPage title="Academic Performance" />}
          />

          {/* Quick Access Placeholder Routes */}
          {/* <Route
            path={RouteNames.IQAC}
            element={<PlaceholderPage title="IQAC" />}
          /> */}
          <Route
            path={RouteNames.COMMITTEE_CELLS}
            element={
              <Suspense fallback={<PageLoader />}>
                <CommitteeCellsPage />
              </Suspense>
            }
          />
          <Route
            path={RouteNames.DHE}
            element={
              <Suspense fallback={<PageLoader />}>
                <DHEPage />
              </Suspense>
            }
          />
          <Route
            path={RouteNames.ACADEMIC_CALENDAR}
            element={<PlaceholderPage title="Academic Calendar" />}
          />
          <Route
            path={RouteNames.AICTE}
            element={
              <Suspense fallback={<PageLoader />}>
                <AICTEPage />
              </Suspense>
            }
          />
          <Route
            path={RouteNames.MISC_DOCUMENTS}
            element={
              <Suspense fallback={<PageLoader />}>
                <MiscDocumentsPage />
              </Suspense>
            }
          />
          <Route
            path={RouteNames.HELP_DESK}
            element={
              <Suspense fallback={<PageLoader />}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path={RouteNames.AISHE}
            element={
              <Suspense fallback={<PageLoader />}>
                <AISHEPage />
              </Suspense>
            }
          />
          <Route
            path="/prospectus"
            element={
              <Suspense fallback={<PageLoader />}>
                <ProspectusRedirectPage />
              </Suspense>
            }
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
