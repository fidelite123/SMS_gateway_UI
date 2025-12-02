import React, { useState } from 'react';
// Sidebar removed — navigation moved to top
import { Plus, Edit2, Trash2, X, ArrowLeft } from 'lucide-react';
import TopNavigation from '../../components/common/TopNavigation';

export default function Pricing() {
  const [routes, setRoutes] = useState([
    { id: 1, routeName: 'US Domestic', operator: 'Carrier 1', costPerSMS: 0.01, sellingPrice: 0.05, margin: 0.04, marginPercent: 80 },
    { id: 2, routeName: 'International', operator: 'Carrier 2', costPerSMS: 0.02, sellingPrice: 0.08, margin: 0.06, marginPercent: 75 },
    { id: 3, routeName: 'Premium', operator: 'Carrier 1', costPerSMS: 0.015, sellingPrice: 0.06, margin: 0.045, marginPercent: 75 }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
  const [formData, setFormData] = useState({
    routeName: '',
    operator: '',
    costPerSMS: '',
    sellingPrice: ''
  });

  const calculateMargin = (cost, selling) => {
    const margin = selling - cost;
    const marginPercent = cost > 0 ? (margin / cost * 100) : 0;
    return { margin: margin.toFixed(4), marginPercent: marginPercent.toFixed(1) };
  };

  const handleAddRoute = () => {
    setEditingRoute(null);
    setFormData({ routeName: '', operator: '', costPerSMS: '', sellingPrice: '' });
    setShowModal(true);
  };

  const handleEditRoute = (route) => {
    setEditingRoute(route);
    setFormData({
      routeName: route.routeName,
      operator: route.operator,
      costPerSMS: route.costPerSMS,
      sellingPrice: route.sellingPrice
    });
    setShowModal(true);
  };

  const handleSaveRoute = () => {
    if (formData.routeName && formData.operator && formData.costPerSMS && formData.sellingPrice) {
      const cost = parseFloat(formData.costPerSMS);
      const selling = parseFloat(formData.sellingPrice);
      const { margin, marginPercent } = calculateMargin(cost, selling);

      const newRoute = {
        routeName: formData.routeName,
        operator: formData.operator,
        costPerSMS: cost,
        sellingPrice: selling,
        margin: parseFloat(margin),
        marginPercent: parseFloat(marginPercent)
      };

      if (editingRoute) {
        setRoutes(routes.map(r => r.id === editingRoute.id ? { ...newRoute, id: r.id } : r));
      } else {
        setRoutes([...routes, { ...newRoute, id: Date.now() }]);
      }
      setShowModal(false);
    }
  };

  const handleDeleteRoute = (id) => {
    setRoutes(routes.filter(r => r.id !== id));
  };

  const totalCost = routes.reduce((sum, r) => sum + r.costPerSMS, 0).toFixed(3);
  const totalRevenue = routes.reduce((sum, r) => sum + r.sellingPrice, 0).toFixed(3);
  const totalMargin = (parseFloat(totalRevenue) - parseFloat(totalCost)).toFixed(3);
  const avgMarginPercent = (routes.length > 0 ? routes.reduce((sum, r) => sum + r.marginPercent, 0) / routes.length : 0).toFixed(1);

  return (
    <div className="flex h-screen bg-black">
      <TopNavigation left />
      <div className="flex-1 flex flex-col overflow-hidden">
        
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <a href="/reseller/dashboard" className="text-indigo-600 hover:text-indigo-700">
                <ArrowLeft size={20} />
              </a>
              <div>
                  <h1 className="text-4xl font-bold text-white">SMS Pricing</h1>
                  <p className="text-gray-400 ml-8">Manage your SMS route pricing and profit margins</p>
              </div>
            </div>
            <button
              onClick={handleAddRoute}
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-2 rounded-lg hover:shadow-lg transition flex items-center gap-2 font-medium"
            >
              <Plus size={20} /> Add Route
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-6">
              <p className="text-sm text-gray-400 mb-1">Total Routes</p>
              <p className="text-3xl font-bold text-white">{routes.length}</p>
            </div>
            <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-6">
              <p className="text-sm text-gray-400 mb-1">Avg Cost/SMS</p>
              <p className="text-3xl font-bold text-white">${(parseFloat(totalCost) / routes.length).toFixed(4)}</p>
            </div>
            <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-6">
              <p className="text-sm text-gray-400 mb-1">Avg Selling Price</p>
              <p className="text-3xl font-bold text-white">${(parseFloat(totalRevenue) / routes.length).toFixed(4)}</p>
            </div>
            <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-6">
              <p className="text-sm text-gray-400 mb-1">Avg Margin %</p>
              <p className="text-3xl font-bold text-green-500">{avgMarginPercent + '%'}</p>
            </div>
          </div>

          {/* Routes Table */}
          <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800 border-b border-gray-800">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Route Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Operator</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-300">Cost/SMS</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-300">Selling Price</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-300">Margin</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-300">Margin %</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map(route => (
                    <tr key={route.id} className="border-b border-gray-800 hover:bg-gray-800">
                      <td className="py-3 px-4 text-white font-medium">{route.routeName}</td>
                      <td className="py-3 px-4 text-gray-400">{route.operator}</td>
                      <td className="py-3 px-4 text-right text-gray-300">${route.costPerSMS.toFixed(4)}</td>
                      <td className="py-3 px-4 text-right text-white font-medium">${route.sellingPrice.toFixed(4)}</td>
                      <td className="py-3 px-4 text-right text-green-500 font-medium">${route.margin.toFixed(4)}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                          {route.marginPercent.toFixed(1) + '%'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleEditRoute(route)}
                          className="text-indigo-600 hover:text-indigo-700 mr-3 inline-flex items-center"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteRoute(route.id)}
                          className="text-red-600 hover:text-red-700 inline-flex items-center"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer Summary */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-800 px-4 py-4">
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Total Cost</p>
                  <p className="font-semibold text-white">${totalCost}</p>
                </div>
                <div>
                  <p className="text-gray-400">Total Revenue</p>
                  <p className="font-semibold text-white">${totalRevenue}</p>
                </div>
                <div>
                  <p className="text-gray-400">Total Margin</p>
                  <p className="font-semibold text-green-500">${totalMargin}</p>
                </div>
                <div>
                  <p className="text-gray-400">Avg Margin %</p>
                  <p className="font-semibold text-green-500">{avgMarginPercent + '%'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Route Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg shadow-lg max-w-md w-full mx-4 border border-gray-800">
              <div className="flex justify-between items-center p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white">
                  {editingRoute ? 'Edit Route' : 'Add New Route'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Route Name</label>
                  <input
                    type="text"
                    placeholder="e.g., US Domestic"
                    value={formData.routeName}
                    onChange={(e) => setFormData({ ...formData, routeName: e.target.value })}
                    className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Operator</label>
                  <input
                    type="text"
                    placeholder="e.g., Carrier 1"
                    value={formData.operator}
                    onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
                    className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Cost/SMS</label>
                    <input
                      type="number"
                      placeholder="0.01"
                      step="0.001"
                      value={formData.costPerSMS}
                      onChange={(e) => setFormData({ ...formData, costPerSMS: e.target.value })}
                      className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Selling Price</label>
                    <input
                      type="number"
                      placeholder="0.05"
                      step="0.001"
                      value={formData.sellingPrice}
                      onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
                      className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {formData.costPerSMS && formData.sellingPrice && (
                  <div className="bg-green-900 rounded-lg p-3 border border-green-700">
                    <p className="text-sm text-green-200">
                      Margin: <span className="font-bold">${(parseFloat(formData.sellingPrice) - parseFloat(formData.costPerSMS)).toFixed(4)}</span>
                      {' '}({((parseFloat(formData.sellingPrice) - parseFloat(formData.costPerSMS)) / parseFloat(formData.costPerSMS) * 100).toFixed(1) + '%'})
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 p-6 border-t border-gray-800">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveRoute}
                  className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
