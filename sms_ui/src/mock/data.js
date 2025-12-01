// Admin Mock Data
export const adminStats = {
  totalResellers: 127,
  totalClients: 3245,
  totalSMSSent: 1456230,
  totalRevenue: 45230.50,
  activeResellers: 98,
};

export const resellerList = [
  { id: 1, name: 'Tech Solutions Inc.', status: 'active', clients: 120, revenue: 3200 },
  { id: 2, name: 'Digital Marketing Pro', status: 'active', clients: 89, revenue: 2150 },
  { id: 3, name: 'SMS Bulk Services', status: 'inactive', clients: 45, revenue: 980 },
  { id: 4, name: 'Global Comms Ltd', status: 'active', clients: 234, revenue: 5670 },
];

export const smsSentData = [
  { date: 'Mon', sent: 2300 },
  { date: 'Tue', sent: 2800 },
  { date: 'Wed', sent: 2000 },
  { date: 'Thu', sent: 2780 },
  { date: 'Fri', sent: 1890 },
  { date: 'Sat', sent: 2390 },
  { date: 'Sun', sent: 3800 },
];

export const revenueData = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 19000 },
  { month: 'Mar', revenue: 9000 },
  { month: 'Apr', revenue: 39000 },
  { month: 'May', revenue: 20000 },
  { month: 'Jun', revenue: 23000 },
];

// Reseller Mock Data
export const resellerStats = {
  totalClients: 120,
  activeSMSCampaigns: 5,
  totalSMSSent: 45670,
  walletBalance: 1250.50,
  monthlyRevenue: 3200,
};

export const clientList = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', smsSent: 1234, spent: 150 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', smsSent: 890, spent: 110 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'inactive', smsSent: 450, spent: 50 },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'active', smsSent: 2100, spent: 280 },
];

export const smsLogData = [
  { id: 1, recipient: '+1234567890', message: 'Welcome to our service', status: 'delivered', date: '2025-12-01 10:30', cost: 0.05 },
  { id: 2, recipient: '+1234567891', message: 'Your verification code is 12345', status: 'delivered', date: '2025-12-01 10:29', cost: 0.05 },
  { id: 3, recipient: '+1234567892', message: 'Order confirmation: #12345', status: 'failed', date: '2025-12-01 10:28', cost: 0.05 },
  { id: 4, recipient: '+1234567893', message: 'Thank you for your purchase', status: 'delivered', date: '2025-12-01 10:27', cost: 0.05 },
  { id: 5, recipient: '+1234567894', message: 'Your password has been reset', status: 'pending', date: '2025-12-01 10:26', cost: 0.05 },
];

// Client Mock Data
export const clientStats = {
  walletBalance: 450.75,
  smsSentToday: 234,
  smsSentThisMonth: 5678,
  deliveryRate: 98.5,
};

export const clientSMSLogs = [
  { id: 1, recipient: '+1987654321', message: 'Hi there!', status: 'delivered', date: '2025-12-01 14:30' },
  { id: 2, recipient: '+1987654322', message: 'Appointment reminder', status: 'delivered', date: '2025-12-01 14:29' },
  { id: 3, recipient: '+1987654323', message: 'Test message', status: 'failed', date: '2025-12-01 14:28' },
  { id: 4, recipient: '+1987654324', message: 'Welcome!', status: 'delivered', date: '2025-12-01 14:27' },
  { id: 5, recipient: '+1987654325', message: 'Important update', status: 'pending', date: '2025-12-01 14:26' },
];

export const clientContacts = [
  { id: 1, name: 'Support Team', phone: '+1987654321', group: 'Business' },
  { id: 2, name: 'Marketing Lead', phone: '+1987654322', group: 'Business' },
  { id: 3, name: 'Mom', phone: '+1987654323', group: 'Personal' },
  { id: 4, name: 'Best Friend', phone: '+1987654324', group: 'Personal' },
];
