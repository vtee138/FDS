"use client";

import { useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

/** Starts one cookie-backed anonymous session for each browser visitor. */
export default function SessionTracker() {
  useEffect(() => {
    void fetch(`${API_URL}/auth/session`, {
      method: "POST",
      credentials: "include",
    }).catch(() => {
      // Visitor tracking must never block rendering the public website.
    });
  }, []);

  return null;
}
