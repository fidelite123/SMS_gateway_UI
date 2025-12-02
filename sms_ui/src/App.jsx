
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/marketing/Home';
import Features from './pages/marketing/Features';
import Pricing from './pages/marketing/Pricing';
import Contact from './pages/marketing/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/Login';
import AdminApprovals from './pages/admin/Approvals';
import AdminResellers from './pages/admin/Resellers';
import AdminClients from './pages/admin/Clients';
import AdminContacts from './pages/admin/Contacts';
import AdminWallet from './pages/admin/Wallet';
import AdminReports from './pages/admin/Reports';
import AdminRouting from './pages/admin/Routing';
import AdminSMPP from './pages/admin/SMPP';
import AdminSettings from './pages/admin/Settings';
import ResellerDashboard from './pages/reseller/Dashboard';
import ResellerClients from './pages/reseller/Clients';
import ResellerContacts from './pages/reseller/Contacts';
import ResellerSMSLogs from './pages/reseller/SMSLogs';
import ResellerWallet from './pages/reseller/Wallet';
import ResellerBilling from './pages/reseller/Billing';
import ResellerBranding from './pages/reseller/Branding';
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
import Security from './pages/common/Security';

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
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}
          />
          <Route
            path="/admin/approvals"
            element={<ProtectedRoute role="admin"><AdminApprovals /></ProtectedRoute>}
          />
          <Route
            path="/admin/resellers"
            element={<ProtectedRoute role="admin"><AdminResellers /></ProtectedRoute>}
          />
          <Route
            path="/admin/clients"
            element={<ProtectedRoute role="admin"><AdminClients /></ProtectedRoute>}
          />
          <Route
            path="/admin/reports"
            element={<ProtectedRoute role="admin"><AdminReports /></ProtectedRoute>}
          />
          <Route
            path="/admin/settings"
            element={<ProtectedRoute role="admin"><AdminSettings /></ProtectedRoute>}
          />
          <Route
            path="/admin/contacts"
            element={<ProtectedRoute role="admin"><AdminContacts /></ProtectedRoute>}
          />
          <Route
            path="/admin/wallet"
            element={<ProtectedRoute role="admin"><AdminWallet /></ProtectedRoute>}
          />
          <Route
            path="/admin/routing"
            element={<ProtectedRoute role="admin"><AdminRouting /></ProtectedRoute>}
          />
          <Route
            path="/admin/smpp"
            element={<ProtectedRoute role="admin"><AdminSMPP /></ProtectedRoute>}
          />
          <Route
            path="/admin/security"
            element={<ProtectedRoute role="admin"><Security /></ProtectedRoute>}
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
            path="/reseller/contacts"
            element={<ProtectedRoute role="reseller"><ResellerContacts /></ProtectedRoute>}
          />
          <Route
            path="/reseller/wallet"
            element={<ProtectedRoute role="reseller"><ResellerWallet /></ProtectedRoute>}
          />
          <Route
            path="/reseller/branding"
            element={<ProtectedRoute role="reseller"><ResellerBranding /></ProtectedRoute>}
          />
          <Route
            path="/reseller/security"
            element={<ProtectedRoute role="reseller"><Security /></ProtectedRoute>}
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
          <Route
            path="/client/security"
            element={<ProtectedRoute role="client"><Security /></ProtectedRoute>}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
