"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../AuthContext";

type ProgressStatus = "Pending" | "In Progress" | "Completed";

interface ServiceRequestItem {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  serviceName: string;
  createdAt: number;
  progress: number; // 0..100
  status: ProgressStatus;
}

const REQUESTS_KEY = "acs_requests";
const SUBSCRIBERS_KEY = "acs_subscribers"; // string[] emails

function loadRequests(): ServiceRequestItem[] {
  try { const raw = localStorage.getItem(REQUESTS_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}
function saveRequests(list: ServiceRequestItem[]) { localStorage.setItem(REQUESTS_KEY, JSON.stringify(list)); }
function loadSubscribers(): string[] { try { const raw = localStorage.getItem(SUBSCRIBERS_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; } }

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [requests, setRequests] = useState<ServiceRequestItem[]>([]);
  const [subscribers, setSubscribers] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProgressStatus | "All">("All");

  useEffect(() => {
    setRequests(loadRequests());
    setSubscribers(loadSubscribers());
  }, []);

  const onProgressChange = (id: string, newValue: number) => {
    setRequests((prev): ServiceRequestItem[] => {
      const next: ServiceRequestItem[] = prev.map(r => {
        if (r.id !== id) return r;
        const status: ProgressStatus = newValue >= 100 ? "Completed" : (newValue > 0 ? "In Progress" : "Pending");
        return { ...r, progress: newValue, status };
      });
      saveRequests(next);
      return next;
    });
  };

  const completedCount = useMemo(() => requests.filter(r => r.status === "Completed").length, [requests]);
  const pendingCount = useMemo(() => requests.filter(r => r.status === "Pending").length, [requests]);
  const inProgressCount = useMemo(() => requests.filter(r => r.status === "In Progress").length, [requests]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const byStatus = statusFilter === "All" ? requests : requests.filter(r => r.status === statusFilter);
    if (!q) return byStatus;
    return byStatus.filter(r =>
      r.customerName.toLowerCase().includes(q) ||
      r.customerEmail.toLowerCase().includes(q) ||
      r.serviceName.toLowerCase().includes(q)
    );
  }, [requests, query, statusFilter]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-orange-500">Admin Dashboard</h1>
        <button onClick={logout} className="bg-neutral-800 border border-neutral-600 px-4 py-2 rounded">Logout</button>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
        <div className="bg-neutral-900 border border-neutral-700 rounded p-4">
          <div className="text-xs text-neutral-400">Total Requests</div>
          <div className="text-2xl font-bold">{requests.length}</div>
        </div>
        <div className="bg-neutral-900 border border-neutral-700 rounded p-4">
          <div className="text-xs text-neutral-400">Pending</div>
          <div className="text-2xl font-bold">{pendingCount}</div>
        </div>
        <div className="bg-neutral-900 border border-neutral-700 rounded p-4">
          <div className="text-xs text-neutral-400">In Progress</div>
          <div className="text-2xl font-bold">{inProgressCount}</div>
        </div>
        <div className="bg-neutral-900 border border-neutral-700 rounded p-4">
          <div className="text-xs text-neutral-400">Completed</div>
          <div className="text-2xl font-bold">{completedCount}</div>
        </div>
        <div className="bg-neutral-900 border border-neutral-700 rounded p-4 hidden xl:block">
          <div className="text-xs text-neutral-400">Subscribers</div>
          <div className="text-2xl font-bold">{subscribers.length}</div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-neutral-900 border border-neutral-700 rounded p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <h2 className="text-xl font-semibold">Service Requests</h2>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                value={query}
                onChange={e=>setQuery(e.target.value)}
                placeholder="Search by customer or service..."
                className="flex-1 md:w-72 bg-neutral-800 border border-neutral-700 rounded px-3 py-2 outline-none"
              />
              <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value as any)} className="bg-neutral-800 border border-neutral-700 rounded px-3 py-2 outline-none">
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {requests.length === 0 ? (
            <p className="text-neutral-400">No requests yet.</p>
          ) : (
            <ul className="space-y-4">
              {filtered.sort((a,b)=>b.createdAt-a.createdAt).map(r => (
                <li key={r.id} className="border border-neutral-700 rounded p-3">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="font-semibold text-lg">{r.serviceName}</p>
                      <p className="text-sm text-neutral-400">Requested by: {r.customerName} • {r.customerEmail}</p>
                      <p className="text-xs text-neutral-500">Placed: {new Date(r.createdAt).toLocaleString()}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-neutral-800 border border-neutral-700 whitespace-nowrap">{r.status}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="range" min={0} max={100} value={r.progress} onChange={e=>onProgressChange(r.id, Number(e.target.value))} className="w-full" />
                    <span className="w-12 text-right">{r.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-800 rounded mt-2">
                    <div className="h-2 bg-orange-600 rounded" style={{ width: `${r.progress}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-neutral-900 border border-neutral-700 rounded p-4">
          <h2 className="text-xl font-semibold mb-2">Subscribers</h2>
          <p className="text-sm text-neutral-400 mb-4">Total: {subscribers.length}</p>
          <ul className="space-y-2 max-h-[420px] overflow-y-auto">
            {subscribers.map((e,i)=>(<li key={i} className="text-sm border-b border-neutral-800 pb-1">{e}</li>))}
          </ul>
          <div className="mt-4 text-sm text-neutral-400">Completed services: {completedCount}</div>
        </div>
      </section>
    </div>
  );
}


