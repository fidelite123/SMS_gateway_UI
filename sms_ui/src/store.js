import { create } from 'zustand'

export const useStore = create((set) => ({
  // User state
  user: {
    id: 1,
    name: 'John Doe',
    email: 'john@wecall.com',
    role: 'admin', // 'admin', 'user', 'agent'
    avatar: '👤'
  },
  setUser: (user) => set({ user }),

  // Calls state
  calls: [],
  setCalls: (calls) => set({ calls }),
  addCall: (call) => set((state) => ({ calls: [...state.calls, call] })),
  updateCall: (id, updates) => set((state) => ({
    calls: state.calls.map((c) => c.id === id ? { ...c, ...updates } : c)
  })),

  // Analytics state
  analytics: {
    totalCalls: 1250,
    activeUsers: 342,
    avgDuration: 4.2,
    satisfaction: 92
  },
  setAnalytics: (analytics) => set({ analytics }),

  // UI state
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  // Theme
  darkMode: false,
  setDarkMode: (mode) => set({ darkMode: mode })
}))
