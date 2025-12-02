import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { mockAnalyticsData, mockDashboardStats } from '../mockData'
import { useStore } from '../store'

export default function Dashboard() {
  const { sidebarOpen } = useStore()

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']

  const pieData = [
    { name: 'Completed', value: 400 },
    { name: 'Missed', value: 50 },
    { name: 'Declined', value: 30 }
  ]

  return (
    <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8 pt-4`}>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockDashboardStats.map((stat, idx) => (
          <div key={idx} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-green-600 text-xs mt-1">{stat.trend}</p>
              </div>
              <span className="text-4xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Calls Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockAnalyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="calls" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Call Duration & Satisfaction</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockAnalyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="duration" fill="#10B981" />
              <Bar dataKey="satisfaction" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Call Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label outerRadius={80} fill="#8884d8" dataKey="value">
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span>Calls today:</span><strong>127</strong></li>
            <li className="flex justify-between"><span>Active agents:</span><strong>23</strong></li>
            <li className="flex justify-between"><span>Avg hold time:</span><strong>2.3m</strong></li>
            <li className="flex justify-between"><span>System uptime:</span><strong>99.9%</strong></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
