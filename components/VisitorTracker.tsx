"use client";

import { useEffect, useRef } from "react";
import { db } from "@/lib/firebase";

export default function VisitorTracker() {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track once per mount in strict mode
    if (hasTracked.current) return;
    hasTracked.current = true;

    // Filter out admin paths
    if (window.location.pathname.startsWith("/admin")) return;

    const trackVisit = async () => {
      try {
        let sessionId = localStorage.getItem("geosolvix_visitor_session_id");
        let isNewVisitor = false;

        if (!sessionId) {
          sessionId = crypto.randomUUID();
          localStorage.setItem("geosolvix_visitor_session_id", sessionId);
          isNewVisitor = true;
        }

        const userAgent = navigator.userAgent;

        // Dynamic import of Firebase Firestore to reduce initial bundle size
        const { collection, addDoc, serverTimestamp, doc, setDoc, increment } = await import("firebase/firestore");

        // 1. Log the visit document
        await addDoc(collection(db, "visitors"), {
          sessionId,
          userAgent,
          isNewVisitor,
          pathname: window.location.pathname,
          timestamp: serverTimestamp(),
        });

        // 2. Increment global stats
        const globalStatsRef = doc(db, "stats", "global");
        await setDoc(globalStatsRef, {
          totalViews: increment(1),
          uniqueVisitors: increment(isNewVisitor ? 1 : 0)
        }, { merge: true });

      } catch (error) {
        console.error("Error logging visit:", error);
      }
    };

    trackVisit();
  }, []);

  return null;
}
