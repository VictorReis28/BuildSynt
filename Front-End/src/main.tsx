import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "../styles/index.css";

// Performance monitoring
import { performanceMonitor } from "../utils/performance";

performanceMonitor.markStart("app-initialization");

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

performanceMonitor.markEnd("app-initialization");

// TODO: Backend Integration - Initialize analytics and monitoring
// Example: Initialize error tracking service (Sentry, LogRocket, etc.)
// Example: Initialize performance monitoring
// Example: Initialize user analytics

// Service Worker registration for PWA capabilities (optional)
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
