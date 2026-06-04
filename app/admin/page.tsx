"use client";

import { useState, useEffect, useCallback } from "react";
import { collection, query, orderBy, limit, getDocs, doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Activity, Clock, Globe, Users, AlertTriangle, Settings, Power } from "lucide-react";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import KpiCard from "@/components/admin/KpiCard";
import VisitorLogsTable from "@/components/admin/VisitorLogsTable";
import { VisitorLog, DashboardStats, computeStats } from "@/lib/admin/stats";
import { trainingCourses } from "@/lib/data";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [logs, setLogs] = useState<VisitorLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({ total: 0, unique: 0 });
  const [demoHubEnabled, setDemoHubEnabled] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/check");
      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      // In Issue 13A, we planned to read the stats/global doc for accurate KPIs,
      // but if it doesn't exist yet we fall back or just use it.
      // Let's implement reading the global stats, and the last 100 logs.
      
      // 1. Fetch Logs
      const q = query(collection(db, "visitors"), orderBy("timestamp", "desc"), limit(100));
      const querySnapshot = await getDocs(q);
      
      const fetchedLogs: VisitorLog[] = [];
      querySnapshot.forEach((doc) => {
        fetchedLogs.push({ id: doc.id, ...doc.data() } as VisitorLog);
      });
      setLogs(fetchedLogs);

      // 2. Fetch Global Stats (Implementation of Issue 13A)
      // Since `stats/global` might not exist for older setups, we fallback to computed stats
      // from the fetched logs.
      try {
        const { doc, getDoc } = await import("firebase/firestore");
        const statsDoc = await getDoc(doc(db, "stats", "global"));
        if (statsDoc.exists()) {
          const data = statsDoc.data();
          setStats({
            total: data.totalViews || 0,
            unique: data.uniqueVisitors || 0,
          });
        } else {
          setStats(computeStats(fetchedLogs));
        }
      } catch (statsErr) {
        // Fallback to computed stats
        setStats(computeStats(fetchedLogs));
      }

    } catch (err: any) {
      console.error("Failed to fetch data", err);
      setFetchError(err.message || "Failed to fetch visitor data. Ensure your Firestore rules and indexes are set.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Listen to feature flags
  useEffect(() => {
    if (!isAuthenticated) return;
    const unsub = onSnapshot(doc(db, "settings", "features"), (docSnap) => {
      if (docSnap.exists()) {
        setDemoHubEnabled(docSnap.data()?.demoHubEnabled || false);
      }
    });
    return () => unsub();
  }, [isAuthenticated]);

  const toggleDemoHub = async () => {
    try {
      await setDoc(doc(db, "settings", "features"), { demoHubEnabled: !demoHubEnabled }, { merge: true });
    } catch (err) {
      console.error("Failed to update feature flag", err);
    }
  };

  const seedMockData = async () => {
    if (!window.confirm("Are you sure you want to seed the database with mock traffic data? This will overwrite the global stats counters.")) return;
    setSeeding(true);
    try {
      const { collection, addDoc, Timestamp } = await import("firebase/firestore");
      
      const paths = ["/", "/products", "/tools", "/training"];
      const userAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
        "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/119.0"
      ];
      
      const sessions = Array.from({ length: 15 }, () => ({
        id: crypto.randomUUID(),
        userAgent: userAgents[Math.floor(Math.random() * userAgents.length)],
      }));

      let totalInserted = 0;
      let uniqueCount = sessions.length;

      for (let i = 0; i < 40; i++) {
        const sessionIndex = Math.floor(Math.random() * sessions.length);
        const session = sessions[sessionIndex];
        const pathname = paths[Math.floor(Math.random() * paths.length)];
        const daysAgo = Math.random() * 7;
        const date = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
        const isNewVisitor = Math.random() > 0.5;

        await addDoc(collection(db, "visitors"), {
          sessionId: session.id,
          userAgent: session.userAgent,
          isNewVisitor,
          pathname,
          timestamp: Timestamp.fromDate(date),
        });
        totalInserted++;
      }

      await setDoc(doc(db, "stats", "global"), {
        totalViews: totalInserted,
        uniqueVisitors: uniqueCount,
      });

      await setDoc(doc(db, "settings", "features"), {
        demoHubEnabled: false
      }, { merge: true });

      alert(`Successfully seeded database with ${totalInserted} visitor logs!`);
      fetchData();
    } catch (err: any) {
      console.error("Seeding failed", err);
      alert(`Seeding failed: ${err.message}`);
    } finally {
      setSeeding(false);
    }
  };

  const seedCourses = async () => {
    if (!window.confirm("Are you sure you want to seed the courses into Firestore? This will overwrite existing courses with the same IDs.")) return;
    setSeeding(true);
    try {
      const { doc, setDoc } = await import("firebase/firestore");
      let count = 0;
      for (const course of trainingCourses) {
        await setDoc(doc(db, "courses", course.id), course);
        count++;
      }
      alert(`Successfully seeded ${count} courses to Firestore!`);
    } catch (err: any) {
      console.error("Course seeding failed", err);
      alert(`Course seeding failed: ${err.message}`);
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  if (isAuthenticated === null) {
    return <div className="min-h-screen bg-zinc-950 flex items-center justify-center"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!isAuthenticated) {
    return <AdminLoginForm onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 selection:bg-indigo-500/30 font-sans p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <Activity className="text-indigo-500" />
              Engagement Dashboard
            </h1>
            <p className="text-zinc-500 mt-1">Real-time visitor tracking and analytics</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={seedCourses} 
              disabled={seeding}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 border border-emerald-500 rounded-lg hover:bg-emerald-500 transition text-sm text-white disabled:opacity-50 font-semibold"
            >
              {seeding ? "Seeding..." : "Seed Courses"}
            </button>
            <button 
              onClick={seedMockData} 
              disabled={seeding}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 border border-indigo-500 rounded-lg hover:bg-indigo-500 transition text-sm text-white disabled:opacity-50 font-semibold"
            >
              {seeding ? "Seeding..." : "Seed Mock Data"}
            </button>
            <button 
              onClick={fetchData} 
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/10 rounded-lg hover:bg-zinc-800 transition text-sm text-white disabled:opacity-50"
            >
              <Clock className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
          </div>
        </header>

        {/* Error Banner */}
        {fetchError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-300">Data Fetch Error</h3>
              <p className="text-sm mt-1">{fetchError}</p>
            </div>
          </div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <KpiCard
            title="Total Views"
            value={stats.total}
            icon={<Globe className="text-blue-400 w-6 h-6" />}
            gradientFrom="from-blue-500"
            gradientTo="to-indigo-600"
            iconBgColor="bg-blue-500/10"
            iconBorderColor="border-blue-500/20"
            isLoading={loading && logs.length === 0}
          />
          <KpiCard
            title="Unique Visitors"
            value={stats.unique}
            icon={<Users className="text-emerald-400 w-6 h-6" />}
            gradientFrom="from-emerald-500"
            gradientTo="to-teal-600"
            iconBgColor="bg-emerald-500/10"
            iconBorderColor="border-emerald-500/20"
            isLoading={loading && logs.length === 0}
          />
        </div>

        {/* Feature Flags / Settings */}
        <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
            <Settings className="w-5 h-5 text-zinc-400" />
            Platform Settings
          </h2>
          <div className="flex items-center justify-between p-4 bg-zinc-950/50 rounded-lg border border-white/5">
            <div>
              <h3 className="font-semibold text-white">Public Demo Hub</h3>
              <p className="text-sm text-zinc-500 mt-1">Enable or disable access to the interactive Map Studio for public users.</p>
            </div>
            <button
              onClick={toggleDemoHub}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 ${
                demoHubEnabled ? "bg-indigo-500" : "bg-zinc-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  demoHubEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Logs Table */}
        <VisitorLogsTable logs={logs} isLoading={loading && logs.length === 0} />
      </div>
    </div>
  );
}
