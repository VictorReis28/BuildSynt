/**
 * Performance optimization utilities
 * Lazy loading, caching, and performance monitoring
 */

import { lazy } from 'react';

// Lazy loading utilities
export const createLazyComponent = (importFn: () => Promise<any>) => {
  return lazy(importFn);
};

// Image lazy loading with intersection observer
export class LazyImageLoader {
  private observer: IntersectionObserver;
  
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              this.observer.unobserve(img);
            }
          }
        });
      },
      { threshold: 0.1 }
    );
  }
  
  observe(element: HTMLImageElement) {
    this.observer.observe(element);
  }
  
  disconnect() {
    this.observer.disconnect();
  }
}

// Simple cache implementation
export class SimpleCache<T> {
  private cache = new Map<string, { data: T; timestamp: number; ttl: number }>();
  
  set(key: string, data: T, ttlMs: number = 300000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs
    });
  }
  
  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }
  
  clear(): void {
    this.cache.clear();
  }
}

// Performance monitoring
export const performanceMonitor = {
  markStart: (name: string) => {
    performance.mark(`${name}-start`);
  },
  
  markEnd: (name: string) => {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
  },
  
  getMetrics: () => {
    return performance.getEntriesByType('measure');
  }
};

// Debounce utility for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};