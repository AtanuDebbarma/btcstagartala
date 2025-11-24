# 🎓 BTCST Agartala - Official Website

Official website for **Bhavan's Tripura College of Science & Technology**, affiliated to Tripura University (A Central University), Agartala, Tripura West, North East, India.

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF.svg)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.6.0-orange.svg)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-38B2AC.svg)](https://tailwindcss.com/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [Admin Features](#-admin-features)
- [Deployment](#-deployment)
- [Scripts](#-scripts)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### **Public Features**
- 🏠 **Dynamic Homepage** with carousel, news ticker, and quick access
- 📢 **Notice Board** with real-time updates
- 🚨 **Alerts System** with detailed descriptions
- 📸 **Gallery** with pagination (15 images per page)
- 👨‍🏫 **Faculty Directory** (Permanent, Guest, Non-Teaching Staff)
- 📚 **Academics** information
- 📞 **Contact** page
- ℹ️ **About** page with college history
- 📄 **Prospectus & Admission Form** downloads
- 📱 **Fully Responsive** design

### **Admin Features** (Authentication Required)
- 🔐 **Firebase Authentication** with email/password
- 🖼️ **Carousel Management** (Add/Edit/Delete images)
- 📋 **Notice Board Management** (Add/Edit/Delete PDFs)
- 🚨 **Alerts Management** (Add/Edit/Delete with links)
- 📸 **Gallery Management** (Add/Edit/Delete images with pagination)
- 🎨 **College Resources Management** (Edit image URLs)
- ✏️ **Text Content Management** (Edit about card text)
- 📊 **Real-time Updates** across all sections

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 7.2.4** - Build tool & dev server
- **Tailwind CSS 4.1.17** - Utility-first CSS
- **React Router DOM 7.9.6** - Client-side routing
- **Zustand 5.0.8** - State management
- **Firebase 12.6.0** - Authentication & Firestore database

### **Additional Libraries**
- **React Multi Carousel** - Image carousels
- **React CountUp** - Animated counters
- **React Spinners** - Loading indicators
- **Font Awesome** - Icons
- **UUID** - Unique ID generation

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript linting
- **Vite TSConfig Paths** - Path aliases

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**
- **Git**
- **Firebase Account** (for backend services)
- **Backend Server** (see `btcs_backend` folder)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd btcstagartala
```

### 2. Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Admin Emails (for authentication)
VITE_FIREBASE_ADMIN_EMAIL1=admin1@example.com
VITE_FIREBASE_ADMIN_EMAIL2=admin2@example.com

# Backend API URL
VITE_API_BACKEND_URL=http://localhost:5000
```

### **Getting Firebase Credentials:**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Go to Project Settings → General
4. Scroll to "Your apps" → Web app
5. Copy the configuration values

---

## 🏃 Running the Application

### **Development Mode**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### **Production Build**

```bash
npm run build
```

### **Preview Production Build**

```bash
npm run preview
```

---

## 📁 Project Structure

```
btcstagartala/
├── public/                      # Static assets
│   └── _redirects              # Netlify redirects
├── src/
│   ├── appComponents/          # Reusable app components
│   │   ├── adminInteractionBtns.tsx
│   │   ├── bottomFloatingIcons.tsx
│   │   ├── navBar/            # Navigation components
│   │   └── pdfIframe.tsx
│   ├── appStore/              # Zustand state management
│   │   ├── appStore.ts
│   │   ├── adminSlice.ts
│   │   ├── gallerySlice.ts
│   │   ├── collegeResourcesSlice.ts
│   │   └── ...
│   ├── assets/                # Images and static files
│   ├── components/            # Feature components
│   │   ├── home/             # Homepage components
│   │   │   ├── carousel/
│   │   │   ├── collegeResources/
│   │   │   ├── noticeSection/
│   │   │   └── smallAboutCard/
│   │   ├── gallery/          # Gallery components
│   │   └── faculty/          # Faculty components
│   ├── constants/            # App constants
│   │   └── routeNames.ts
│   ├── data/                 # Static data
│   │   └── homeData/
│   ├── helpers/              # Business logic helpers
│   │   ├── carouselHelpers/
│   │   ├── galleryHelpers/
│   │   ├── collegeResourcesHelpers/
│   │   └── noticeTableHelpers/
│   ├── pages/                # Page components
│   │   ├── Home.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── Faculty/
│   │   ├── Alerts/
│   │   └── ...
│   ├── services/             # API & Firebase services
│   │   ├── firebase.ts
│   │   ├── backend/
│   │   ├── carousel/
│   │   ├── gallery/
│   │   ├── collegeResources/
│   │   └── textServices/
│   ├── types/                # TypeScript types
│   │   ├── homeTypes.ts
│   │   ├── galleryTypes.ts
│   │   └── collegeResourcesTypes.ts
│   ├── utils/                # Utility functions
│   ├── App.tsx               # Main app component
│   ├── Routing.tsx           # Route configuration
│   ├── AuthWrapper.tsx       # Auth wrapper
│   ├── ProtectedRoute.tsx    # Protected route HOC
│   └── main.tsx              # Entry point
├── .env.local                # Environment variables
├── index.html                # HTML template
├── package.json              # Dependencies
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── README.md                 # This file
```

---

## 🔑 Admin Features

### **Authentication**

Admins must log in with authorized email addresses (configured in `.env.local`).

**Login Route:** `/admin`

### **Admin Capabilities**

| Feature | Add | Edit | Delete |
|---------|-----|------|--------|
| Carousel Images | ✅ | ✅ | ✅ |
| Notice Board | ✅ | ✅ | ✅ |
| Alerts | ✅ | ✅ | ✅ |
| Gallery Images | ✅ | ✅ | ✅ |
| College Resources | ❌ | ✅ | ❌ |
| About Card Text | ❌ | ✅ | ❌ |
| About Card Image | ❌ | ✅ | ❌ |

### **Admin UI Features**

- **Hover-to-Edit**: Hover over content to reveal edit buttons
- **Modal Forms**: Clean modal interfaces for all operations
- **Live Preview**: See changes before saving
- **Loading States**: Visual feedback during operations
- **Success Messages**: Confirmation after successful operations
- **Error Handling**: Clear error messages for failures

---

## 🌐 Deployment

### **Netlify Deployment**

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to Netlify

3. Configure environment variables in Netlify dashboard

4. Add `_redirects` file (already included in `public/`):
   ```
   /*    /index.html   200
   ```

### **Other Platforms**

The app can be deployed to:
- **Vercel**
- **Firebase Hosting**
- **AWS Amplify**
- **GitHub Pages**

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

---

## 🗂️ Key Features Implementation

### **Gallery Pagination**

- **Cursor-based pagination** for efficient Firestore reads
- **15 images per page**
- **Automatic fallback** to offset-based for jump navigation
- **70-90% reduction** in Firestore document reads

### **College Resources**

- **Dynamic image loading** from Firestore
- **Fallback to local images** if Firestore is empty
- **Admin editing** with URL-based updates
- **Mapping system** between Firestore names and display titles

### **State Management**

- **Zustand** for global state
- **Immer** for immutable updates
- **Separate slices** for each feature
- **Type-safe** with TypeScript

### **Authentication**

- **Firebase Authentication**
- **Protected routes** with HOC
- **Email-based admin access**
- **Backend verification** for sensitive operations

---

## 🔧 Configuration Files

### **Tailwind Config** (`tailwind.config.ts`)
- Custom colors
- Custom fonts
- Responsive breakpoints
- Plugin configurations

### **TypeScript Config** (`tsconfig.json`)
- Path aliases (`@/`)
- Strict mode enabled
- React JSX support

### **Vite Config** (`vite.config.ts`)
- React SWC plugin
- Path resolution
- Build optimizations

---

## 🐛 Troubleshooting

### **Common Issues**

1. **Firebase Connection Error**
   - Check `.env.local` configuration
   - Verify Firebase project settings
   - Ensure Firestore rules allow read/write

2. **Backend API 404**
   - Ensure backend server is running
   - Check `VITE_API_BACKEND_URL` in `.env.local`
   - Verify backend routes are correct

3. **Build Errors**
   - Clear `node_modules` and reinstall
   - Check TypeScript errors: `npm run build`
   - Verify all imports are correct

4. **Admin Login Issues**
   - Verify email in `.env.local`
   - Check Firebase Authentication is enabled
   - Ensure user exists in Firebase

---

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### **Code Style**

- Follow ESLint rules
- Use Prettier for formatting
- Write TypeScript types
- Add comments for complex logic

---

## 📄 License

This project is proprietary and confidential. All rights reserved by Bhavan's Tripura College of Science & Technology.

---

## 👥 Team

Developed and maintained by the BTCST Web Development Team.

---

## 📞 Support

For issues or questions:
- **Email**: contact@btcstagartala.org
- **Website**: [btcstagartala.org](https://btcstagartala.org)

---

## 🙏 Acknowledgments

- **Bharatiya Vidya Bhavan** - Parent organization
- **Tripura University** - Affiliation
- **Government of Tripura** - Support
- **ONGC Tripura Asset** - Initial funding

---

**Made with ❤️ for BTCST Agartala**
