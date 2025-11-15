import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';

// Define the shape of a service item in the cart
export interface ServiceItem {
  name: string;
  type: 'Interim' | 'Full' | 'General'; // Distinguishes the service origin
}

// Define the context's value shape
interface ServiceCartContextType {
  cart: ServiceItem[];
  addServices: (services: ServiceItem[]) => void;
  clearCart: () => void;
  ongoingServices: ServiceItem[];
  completedServices: ServiceItem[];
  placeOrder: () => void;
}

// Create the context
const ServiceCartContext = createContext<ServiceCartContextType | undefined>(undefined);

// Create the provider component
export const ServiceCartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ServiceItem[]>([]);
  const [ongoingServices, setOngoingServices] = useState<ServiceItem[]>([]);
  const [completedServices, setCompletedServices] = useState<ServiceItem[]>([]);
  const { user } = useAuth();

  const REQUESTS_KEY = 'acs_requests';
  type ProgressStatus = 'Pending' | 'In Progress' | 'Completed';
  interface ServiceRequestItem {
    id: string;
    userId: string;
    customerName: string;
    customerEmail: string;
    serviceName: string;
    createdAt: number;
    progress: number;
    status: ProgressStatus;
  }

  const loadRequests = (): ServiceRequestItem[] => {
    try { const raw = localStorage.getItem(REQUESTS_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
  };
  const saveRequests = (list: ServiceRequestItem[]) => { localStorage.setItem(REQUESTS_KEY, JSON.stringify(list)); };

  const addServices = (newServices: ServiceItem[]) => {
    setCart(prevCart => {
      const existingNames = new Set(prevCart.map(item => item.name));
      const uniqueNewServices = newServices.filter(item => !existingNames.has(item.name));
      return [...prevCart, ...uniqueNewServices];
    });
  };

  const clearCart = () => setCart([]);

  const placeOrder = () => {
    if (!user) {
      alert('Please login to place an order.');
      return;
    }
    // Move cart items to ongoing
    setOngoingServices(prev => [...prev, ...cart]);

    // Persist requests for admin to manage
    const existing = loadRequests();
    const now = Date.now();
    const newRequests: ServiceRequestItem[] = cart.map(item => ({
      id: Math.random().toString(36).slice(2) + now.toString(36),
      userId: user.id,
      customerName: user.name,
      customerEmail: user.email,
      serviceName: item.name,
      createdAt: now,
      progress: 0,
      status: 'Pending',
    }));
    saveRequests([...existing, ...newRequests]);

    setCart([]);
  };

  return (
    <ServiceCartContext.Provider value={{ cart, addServices, clearCart, ongoingServices, completedServices, placeOrder }}>
      {children}
    </ServiceCartContext.Provider>
  );
};

// Custom hook for easy consumption of the context
export const useServiceCart = () => {
  const context = useContext(ServiceCartContext);
  if (context === undefined) {
    throw new Error('useServiceCart must be used within a ServiceCartProvider');
  }
  return context;
};