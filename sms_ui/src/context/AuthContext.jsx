import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState(() => {
    // Load users from localStorage on initialization; seed default admin if missing
    const saved = localStorage.getItem('sms_gateway_users');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasAdmin = Array.isArray(parsed) && parsed.some(u => u.role === 'admin');
        if (!hasAdmin) {
          const defaultAdmin = {
            id: 'admin-1',
            email: 'admin@wecall.local',
            password: 'Admin@12345',
            role: 'admin',
            profile: { name: 'System Admin', phone: '', company: 'WeCall' },
            data: {
              walletBalance: 0,
              totalClients: 0,
              activeSMSCampaigns: 0,
              totalSMSSent: 0,
              monthlyRevenue: 0,
              clients: [],
              logs: [],
            },
            createdAt: new Date().toISOString(),
          };
          const updated = [...parsed, defaultAdmin];
          localStorage.setItem('sms_gateway_users', JSON.stringify(updated));
          return updated;
        }
        return parsed;
      } catch {
        // fall through to reseed if parsing fails
      }
    }

    const defaultAdmin = {
      id: 'admin-1',
      email: 'admin@wecall.local',
      password: 'Admin@12345',
      role: 'admin',
      profile: { name: 'System Admin', phone: '', company: 'WeCall' },
      data: {
        walletBalance: 0,
        totalClients: 0,
        activeSMSCampaigns: 0,
        totalSMSSent: 0,
        monthlyRevenue: 0,
        clients: [],
        logs: [],
      },
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('sms_gateway_users', JSON.stringify([defaultAdmin]));
    return [defaultAdmin];
  });

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('sms_gateway_users', JSON.stringify(users));
  }, [users]);

  const register = (email, password, role) => {
    // Check if user already exists
    const existing = users.find(u => u.email === email);
    if (existing) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In production, this would be hashed
      role,
      status: role === 'admin' ? 'active' : 'pending',
      profile: {
        name: '',
        phone: '',
        company: '',
      },
      data: role === 'client' ? {
        walletBalance: 500,
        smsSentToday: 0,
        smsSentThisMonth: 0,
        deliveryRate: 98.5,
        logs: [],
        contacts: [
          { id: 1, name: 'Sample Contact', phone: '+1234567890', group: 'Personal' },
        ],
      } : {
        walletBalance: 1000,
        totalClients: 0,
        activeSMSCampaigns: 0,
        totalSMSSent: 0,
        monthlyRevenue: 0,
        clients: [],
        logs: [],
      },
      createdAt: new Date().toISOString(),
    };

    setUsers([...users, newUser]);
    setUser(newUser);
    setIsAuthenticated(true);
    return newUser;
  };

  const login = (email, password) => {
    // Find user by email and password
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    if (foundUser.status === 'pending') {
      throw new Error('Your account is pending approval. Please wait for admin confirmation.');
    }

    if (foundUser.status === 'inactive') {
      throw new Error('Your account has been deactivated. Contact support for assistance.');
    }

    setUser(foundUser);
    setIsAuthenticated(true);
    return foundUser;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  // Admin helpers
  const allUsers = () => users;

  const createReseller = ({ email, password, name = '', company = '' }) => {
    const exists = users.some(u => u.email === email);
    if (exists) throw new Error('Email already exists');
    const reseller = {
      id: Date.now().toString(),
      email,
      password,
      role: 'reseller',
      status: 'active',
      profile: { name, phone: '', company },
      data: {
        walletBalance: 1000,
        totalClients: 0,
        activeSMSCampaigns: 0,
        totalSMSSent: 0,
        monthlyRevenue: 0,
        clients: [],
        logs: [],
      },
      createdAt: new Date().toISOString(),
    };
    const updated = [...users, reseller];
    setUsers(updated);
    return reseller;
  };

  const setUserStatus = (id, status) => {
    const updated = users.map(u => u.id === id ? { ...u, status } : u);
    setUsers(updated);
    if (user && user.id === id) setUser({ ...user, status });
  };

  const resetUserPassword = (id, newPassword) => {
    const updated = users.map(u => u.id === id ? { ...u, password: newPassword } : u);
    setUsers(updated);
  };

  const deleteUser = (id) => {
    const target = users.find(u => u.id === id);
    if (!target) return;
    if (target.role === 'admin') throw new Error('Cannot delete admin users');
    const updated = users.filter(u => u.id !== id);
    setUsers(updated);
    if (user && user.id === id) logout();
  };

  const approveUser = (id) => {
    const updated = users.map(u => u.id === id ? { ...u, status: 'active' } : u);
    setUsers(updated);
    if (user && user.id === id) setUser({ ...user, status: 'active' });
  };

  const updateUserProfile = (updates) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      profile: { ...user.profile, ...updates },
    };
    
    setUser(updatedUser);
    setUsers(users.map(u => u.id === user.id ? updatedUser : u));
  };

  const updateUserData = (dataUpdates) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      data: { ...user.data, ...dataUpdates },
    };
    
    setUser(updatedUser);
    setUsers(users.map(u => u.id === user.id ? updatedUser : u));
  };

  const addLog = (logEntry) => {
    if (!user) return;
    
    const newLog = {
      id: Date.now(),
      ...logEntry,
      date: new Date().toLocaleString(),
    };
    
    const updatedUser = {
      ...user,
      data: {
        ...user.data,
        logs: [newLog, ...user.data.logs],
      },
    };
    
    setUser(updatedUser);
    setUsers(users.map(u => u.id === user.id ? updatedUser : u));
    return newLog;
  };

  // Reseller: send SMS on behalf of a client (deduct client's wallet, update smsSent, add logs)
  const sendSMSForClient = ({ clientId, recipients = [], message, senderId = 'WeCall', messageType = 'gsm', costPerSms = 0.03 }) => {
    if (!user || user.role !== 'reseller') {
      throw new Error('Only resellers can perform this action');
    }

    const charsPerSms = messageType === 'unicode' ? 70 : 160;
    const smsPerMessage = Math.max(1, Math.ceil((message || '').length / charsPerSms));
    const recipientCount = recipients.length;
    const totalCost = parseFloat((smsPerMessage * recipientCount * costPerSms).toFixed(2));

    const resellerData = user.data || {};
    const clients = Array.isArray(resellerData.clients) ? resellerData.clients : [];

    const clientIndex = clients.findIndex(c => String(c.id) === String(clientId));
    if (clientIndex === -1) {
      throw new Error('Client not found');
    }

    const targetClient = clients[clientIndex];
    const clientWallet = parseFloat(targetClient.walletBalance || 0);
    if (clientWallet < totalCost) {
      throw new Error('Client has insufficient wallet balance');
    }

    // Create log entries
    const timestamp = new Date().toLocaleString();
    const logsForRecipients = recipients.map(r => ({
      id: Date.now() + Math.floor(Math.random() * 1000),
      recipient: r.trim(),
      message,
      status: 'delivered',
      cost: parseFloat((smsPerMessage * costPerSms).toFixed(4)),
      senderId,
      clientName: targetClient.name,
      date: timestamp,
    }));

    // Update client record inside reseller's clients array
    const updatedClient = {
      ...targetClient,
      walletBalance: parseFloat((clientWallet - totalCost).toFixed(2)),
      smsSent: (targetClient.smsSent || 0) + (smsPerMessage * recipientCount),
      logs: [...(targetClient.logs || []), ...logsForRecipients],
    };

    const updatedClients = clients.map((c, idx) => idx === clientIndex ? updatedClient : c);

    // Update reseller logs and summary
    const resellerLogEntries = logsForRecipients.map(l => ({ ...l, resellerId: user.id }));
    const updatedReseller = {
      ...user,
      data: {
        ...resellerData,
        clients: updatedClients,
        logs: [...resellerLogEntries, ...(resellerData.logs || [])],
        totalSMSSent: (resellerData.totalSMSSent || 0) + (smsPerMessage * recipientCount),
        monthlyRevenue: parseFloat(((resellerData.monthlyRevenue || 0) + totalCost).toFixed(2)),
      },
    };

    // Persist changes to current user and to users array
    setUser(updatedReseller);
    setUsers(users.map(u => u.id === user.id ? updatedReseller : u));

    return { totalCost, smsPerMessage, recipientCount, updatedClient };
  };

  const addContact = (contact) => {
    if (!user || user.role !== 'client') return;
    
    const newContact = {
      id: Date.now(),
      ...contact,
    };
    
    const updatedUser = {
      ...user,
      data: {
        ...user.data,
        contacts: [...user.data.contacts, newContact],
      },
    };
    
    setUser(updatedUser);
    setUsers(users.map(u => u.id === user.id ? updatedUser : u));
    return newContact;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      register,
      login,
      logout,
      updateUserProfile,
      updateUserData,
      addLog,
      addContact,
      sendSMSForClient,
      allUsers,
      createReseller,
      setUserStatus,
      resetUserPassword,
      deleteUser,
      approveUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
