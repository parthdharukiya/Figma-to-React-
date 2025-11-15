"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../AuthContext";

interface ServiceRequestItem {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  serviceName: string;
  createdAt: number;
  progress: number;
  status: "Pending" | "In Progress" | "Completed";
}

const REQUESTS_KEY = "acs_requests";

function loadRequests(): ServiceRequestItem[] {
  try { const raw = localStorage.getItem(REQUESTS_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export default function CustomerProfile() {
  const { user, logout } = useAuth();
  const [requests, setRequests] = useState<ServiceRequestItem[]>([]);

  useEffect(() => {
    setRequests(loadRequests());
    const onStorage = () => setRequests(loadRequests());
    window.addEventListener("storage", onStorage);
    // Poll localStorage periodically to reflect admin updates within same tab
    const interval = window.setInterval(() => setRequests(loadRequests()), 1500);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.clearInterval(interval);
    };
  }, []);

  const myRequests = useMemo(() => requests.filter(r => r.userId === user?.id), [requests, user?.id]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-sm text-neutral-400">{user?.email}</p>
        </div>
        <button onClick={logout} className="bg-neutral-900 border border-neutral-700 px-4 py-2 rounded">Logout</button>
      </header>

      <section className="bg-neutral-900 border border-neutral-700 rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Ongoing Services</h2>
        {myRequests.length === 0 ? (
          <p className="text-neutral-400">No services yet. Book one from the home page.</p>
        ) : (
          <ul className="space-y-4">
            {myRequests.sort((a,b)=>b.createdAt-a.createdAt).map(r => (
              <li key={r.id} className="border border-neutral-700 rounded p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{r.serviceName}</p>
                    <p className="text-sm text-neutral-400">Status: {r.status}</p>
                  </div>
                  <span className="text-sm">{new Date(r.createdAt).toLocaleString()}</span>
                </div>
                <div className="w-full h-3 bg-neutral-800 rounded mt-3">
                  <div className="h-3 bg-orange-600 rounded" style={{ width: `${r.progress}%` }} />
                </div>
                <div className="text-right text-sm mt-1">{r.progress}%</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}


