export const mockCalls = [
  { id: 1, caller: '+1234567890', receiver: 'Support Team', duration: 3.5, date: '2025-12-01', status: 'completed', type: 'inbound' },
  { id: 2, caller: '+9876543210', receiver: 'Sales', duration: 5.2, date: '2025-12-01', status: 'completed', type: 'outbound' },
  { id: 3, caller: '+5555555555', receiver: 'Support Team', duration: 2.1, date: '2025-11-30', status: 'completed', type: 'inbound' },
  { id: 4, caller: '+1111111111', receiver: 'Tech Support', duration: 8.5, date: '2025-11-30', status: 'completed', type: 'inbound' },
  { id: 5, caller: '+2222222222', receiver: 'Billing', duration: 4.0, date: '2025-11-29', status: 'missed', type: 'inbound' }
]

export const mockUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@wecall.com', role: 'admin', status: 'active', calls: 245 },
  { id: 2, name: 'Bob Smith', email: 'bob@wecall.com', role: 'agent', status: 'active', calls: 189 },
  { id: 3, name: 'Carol Williams', email: 'carol@wecall.com', role: 'agent', status: 'away', calls: 156 },
  { id: 4, name: 'David Brown', email: 'david@wecall.com', role: 'user', status: 'inactive', calls: 45 }
]

export const mockAnalyticsData = [
  { name: 'Mon', calls: 240, duration: 24, satisfaction: 88 },
  { name: 'Tue', calls: 221, duration: 22, satisfaction: 91 },
  { name: 'Wed', calls: 229, duration: 20, satisfaction: 85 },
  { name: 'Thu', calls: 200, duration: 18, satisfaction: 89 },
  { name: 'Fri', calls: 250, duration: 25, satisfaction: 94 },
  { name: 'Sat', cards: 150, duration: 15, satisfaction: 90 },
  { name: 'Sun', calls: 180, duration: 17, satisfaction: 92 }
]

export const mockDashboardStats = [
  { label: 'Total Calls', value: 1250, trend: '+12%', icon: '📞' },
  { label: 'Active Users', value: 342, trend: '+5%', icon: '👥' },
  { label: 'Avg Duration', value: '4.2m', trend: '-2%', icon: '⏱️' },
  { label: 'Satisfaction', value: '92%', trend: '+3%', icon: '😊' }
]
