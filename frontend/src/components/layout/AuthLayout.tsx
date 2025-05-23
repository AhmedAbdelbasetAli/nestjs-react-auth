import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <Outlet /> {/* Renders either Signin or Signup */}
      </div>
    </div>
  );
}