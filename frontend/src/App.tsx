import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './components/layout/AuthLayout';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import AppPage from './pages/AppPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authenticated routes inside layout */}
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          
          {/* Default redirect */}
          <Route index element={<SigninPage />} />
        </Route>

        {/* Protected route */}
        <Route path="/app" element={<AppPage />} />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;