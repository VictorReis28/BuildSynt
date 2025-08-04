import { useEffect } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

export const usePerformanceMonitor = () => {
  useEffect(() => {
    // Simple check for development
    const isDev =
      location.hostname === 'localhost' || location.hostname === '127.0.0.1';

    if (!isDev) return;

    const logMetrics = (metrics: PerformanceMetrics) => {
      console.group('🚀 Performance Metrics');
      if (metrics.fcp)
        console.log(`⚡ First Contentful Paint: ${metrics.fcp.toFixed(2)}ms`);
      if (metrics.lcp)
        console.log(`🎯 Largest Contentful Paint: ${metrics.lcp.toFixed(2)}ms`);
      if (metrics.fid)
        console.log(`👆 First Input Delay: ${metrics.fid.toFixed(2)}ms`);
      if (metrics.cls)
        console.log(`📐 Cumulative Layout Shift: ${metrics.cls.toFixed(4)}`);
      if (metrics.ttfb)
        console.log(`🌐 Time to First Byte: ${metrics.ttfb.toFixed(2)}ms`);
      console.groupEnd();
    };

    // Observe Performance API
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const perfObserver = new PerformanceObserver(list => {
        const metrics: PerformanceMetrics = {};

        for (const entry of list.getEntries()) {
          switch (entry.entryType) {
            case 'paint':
              if (entry.name === 'first-contentful-paint') {
                metrics.fcp = entry.startTime;
              }
              break;
            case 'largest-contentful-paint':
              metrics.lcp = entry.startTime;
              break;
            case 'first-input':
              const fidEntry = entry as any;

              metrics.fid = fidEntry.processingStart - fidEntry.startTime;
              break;
            case 'layout-shift':
              if (!(entry as any).hadRecentInput) {
                metrics.cls = (metrics.cls || 0) + (entry as any).value;
              }
              break;
            case 'navigation':
              const navEntry = entry as PerformanceNavigationTiming;

              metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
              break;
          }
        }

        if (Object.keys(metrics).length > 0) {
          logMetrics(metrics);
        }
      });

      try {
        perfObserver.observe({
          entryTypes: [
            'paint',
            'largest-contentful-paint',
            'first-input',
            'layout-shift',
            'navigation',
          ],
        });
      } catch (e) {
        // Fallback for browsers that don't support all entry types
        perfObserver.observe({ entryTypes: ['paint', 'navigation'] });
      }

      return () => {
        perfObserver.disconnect();
      };
    }
  }, []);
};

export default usePerformanceMonitor;
