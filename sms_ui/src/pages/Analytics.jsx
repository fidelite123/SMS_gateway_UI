import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts'
import { mockAnalyticsData } from '../mockData'
import { useStore } from '../store'

export default function Analytics() {
  const { sidebarOpen } = useStore()

  return (
    <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8 pt-4`}>
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>

      <div className="grid grid-cols-1 gap-6">
        {/* Area Chart - Call Trends */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">📞 Call Volume Trends</h2>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={mockAnalyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="calls" fill="#3B82F6" stroke="#3B82F6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Satisfaction Score */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">😊 Customer Satisfaction</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={mockAnalyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="satisfaction" fill="#F59E0B" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Scatter - Duration vs Day */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">⏱️ Call Duration Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={mockAnalyticsData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" name="Day" />
              <YAxis dataKey="duration" name="Duration (min)" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Duration" data={mockAnalyticsData} fill="#10B981" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card text-center">
            <p className="text-3xl font-bold text-primary">1,250</p>
            <p className="text-gray-600 text-sm">Total Calls</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-secondary">92%</p>
            <p className="text-gray-600 text-sm">Satisfaction</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-warning">4.2m</p>
            <p className="text-gray-600 text-sm">Avg Duration</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-danger">3%</p>
            <p className="text-gray-600 text-sm">Drop Rate</p>
          </div>
        </div>
      </div>
    </div>
  )
}
