import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/Dashboard';
import ResellerDashboard from './pages/reseller/Dashboard';
import ResellerClients from './pages/reseller/Clients';
import ResellerSMSLogs from './pages/reseller/SMSLogs';
import ResellerBilling from './pages/reseller/Billing';
import ResellerSendSMS from './pages/reseller/SendSMS';
import ClientDashboard from './pages/client/Dashboard';
import ClientSendSMS from './pages/client/SendSMS';
import ClientSMSLogs from './pages/client/SMSLogs';
import ClientContacts from './pages/client/Contacts';
import ClientWallet from './pages/client/Wallet';
import ClientTemplates from './pages/client/Templates';
import ClientSenderID from './pages/client/SenderID';
import ClientAPIManagement from './pages/client/APIManagement';
import ClientSettings from './pages/client/Settings';

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}
          />
          <Route
            path="/reseller/dashboard"
            element={<ProtectedRoute role="reseller"><ResellerDashboard /></ProtectedRoute>}
          />
          <Route
            path="/reseller/clients"
            element={<ProtectedRoute role="reseller"><ResellerClients /></ProtectedRoute>}
          />
          <Route
            path="/reseller/logs"
            element={<ProtectedRoute role="reseller"><ResellerSMSLogs /></ProtectedRoute>}
          />
          <Route
            path="/reseller/billing"
            element={<ProtectedRoute role="reseller"><ResellerBilling /></ProtectedRoute>}
          />
          <Route
            path="/reseller/send"
            element={<ProtectedRoute role="reseller"><ResellerSendSMS /></ProtectedRoute>}
          />
          <Route
            path="/client/dashboard"
            element={<ProtectedRoute role="client"><ClientDashboard /></ProtectedRoute>}
          />
          <Route
            path="/client/send"
            element={<ProtectedRoute role="client"><ClientSendSMS /></ProtectedRoute>}
          />
          <Route
            path="/client/logs"
            element={<ProtectedRoute role="client"><ClientSMSLogs /></ProtectedRoute>}
          />
          <Route
            path="/client/contacts"
            element={<ProtectedRoute role="client"><ClientContacts /></ProtectedRoute>}
          />
          <Route
            path="/client/wallet"
            element={<ProtectedRoute role="client"><ClientWallet /></ProtectedRoute>}
          />
          <Route
            path="/client/templates"
            element={<ProtectedRoute role="client"><ClientTemplates /></ProtectedRoute>}
          />
          <Route
            path="/client/senderid"
            element={<ProtectedRoute role="client"><ClientSenderID /></ProtectedRoute>}
          />
          <Route
            path="/client/api"
            element={<ProtectedRoute role="client"><ClientAPIManagement /></ProtectedRoute>}
          />
          <Route
            path="/client/settings"
            element={<ProtectedRoute role="client"><ClientSettings /></ProtectedRoute>}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
