import { Routes, Route, Link } from 'react-router-dom';
import CustomerApp from './customer_app/App.tsx';
import EmployeeApp from './employee_app/App.tsx';
import AdminApp from './admin_app/App.tsx';
import SuperAdminApp from './super_admin_app/App.tsx';

function LandingPage() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Overlay Navigation Links */}
      <div
        style={{
          position: 'fixed',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          display: 'flex',
          gap: 12,
          padding: '10px 20px',
          background: 'rgba(148, 112, 194, 0.12)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          borderRadius: 40,
          boxShadow: '0 8px 32px rgba(220, 20, 60, 0.08)',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <Link
          to="/customer"
          style={{
            textDecoration: 'none',
            color: '#152e66',
            fontSize: 12.5,
            fontWeight: 600,
            padding: '6px 14px',
            borderRadius: 20,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(99, 51, 159, 0.08)';
            e.currentTarget.style.color = '#63339f';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#152e66';
          }}
        >
          Customer
        </Link>
        <Link
          to="/employee"
          style={{
            textDecoration: 'none',
            color: '#152e66',
            fontSize: 12.5,
            fontWeight: 600,
            padding: '6px 14px',
            borderRadius: 20,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(99, 51, 159, 0.08)';
            e.currentTarget.style.color = '#63339f';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#152e66';
          }}
        >
          Employee
        </Link>
        <Link
          to="/admin"
          style={{
            textDecoration: 'none',
            color: '#152e66',
            fontSize: 12.5,
            fontWeight: 600,
            padding: '6px 14px',
            borderRadius: 20,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(99, 51, 159, 0.08)';
            e.currentTarget.style.color = '#63339f';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#152e66';
          }}
        >
          Admin
        </Link>
        <Link
          to="/super-admin"
          style={{
            textDecoration: 'none',
            color: '#152e66',
            fontSize: 12.5,
            fontWeight: 600,
            padding: '6px 14px',
            borderRadius: 20,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(99, 51, 159, 0.08)';
            e.currentTarget.style.color = '#63339f';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#152e66';
          }}
        >
          Super Admin
        </Link>
      </div>

      {/* Fullscreen iframe with the untouched landing page */}
      <iframe
        src="/landing.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
        title="Landing Page"
      />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/customer" element={<CustomerApp />} />
      <Route path="/employee" element={<EmployeeApp />} />
      <Route path="/admin" element={<AdminApp />} />
      <Route path="/super-admin" element={<SuperAdminApp />} />
    </Routes>
  );
}