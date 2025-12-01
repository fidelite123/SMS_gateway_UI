import React from 'react';

export default function StatCard({ title, value, color }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800 border-blue-300',
    green: 'bg-green-100 text-green-800 border-green-300',
    purple: 'bg-purple-100 text-purple-800 border-purple-300',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    red: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <div className={`${colorClasses[color]} border-l-4 p-6 rounded-lg shadow`}>
      <p className="text-sm font-semibold opacity-75">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
