"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Role = "customer" | "admin" | null;

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Exclude<Role, null>;
}

interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  signup: (name: string, email: string, password: string) => { ok: boolean; message?: string };
  login: (email: string, password: string) => { ok: boolean; message?: string };
  adminLogin: (username: string, password: string) => { ok: boolean; message?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "acs_users"; // [{id,name,email,password}]
const CURRENT_USER_KEY = "acs_current_user"; // {id,name,email,role}

function loadUsers(): Array<{ id: string; name: string; email: string; password: string }> {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: Array<{ id: string; name: string; email: string; password: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      setUser(null);
    }
  }, []);

  const value = useMemo<AuthContextType>(() => ({
    user,
    isAdmin: user?.role === "admin",
    isAuthenticated: !!user,
    signup: (name, email, password) => {
      const users = loadUsers();
      const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (exists) return { ok: false, message: "Email already registered" };
      const newUser = { id: genId(), name, email, password };
      users.push(newUser);
      saveUsers(users);
      const authUser: AuthUser = { id: newUser.id, name, email, role: "customer" };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(authUser));
      setUser(authUser);
      return { ok: true };
    },
    login: (email, password) => {
      const users = loadUsers();
      const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!found) return { ok: false, message: "Invalid credentials" };
      const authUser: AuthUser = { id: found.id, name: found.name, email: found.email, role: "customer" };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(authUser));
      setUser(authUser);
      return { ok: true };
    },
    adminLogin: (username, password) => {
      // Simple demo admin: admin/admin
      if (username === "admin" && password === "admin") {
        const adminUser: AuthUser = { id: "admin", name: "Administrator", email: "admin@acs.local", role: "admin" };
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(adminUser));
        setUser(adminUser);
        return { ok: true };
      }
      return { ok: false, message: "Invalid admin credentials" };
    },
    logout: () => {
      localStorage.removeItem(CURRENT_USER_KEY);
      setUser(null);
    }
  }), [user]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}


