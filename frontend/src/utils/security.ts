/**
 * Frontend security utilities
 * Basic input validation and sanitization
 */

// Simple HTML sanitization for user inputs
export const sanitizeHtml = (input: string): string => {
  const div = document.createElement('div');

  div.textContent = input;

  return div.innerHTML;
};

// Input validation patterns
export const ValidationPatterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  githubUrl: /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+$/,
  username: /^[a-zA-Z0-9_-]{3,20}$/,
};

// Simple input sanitization
export const sanitizeInput = {
  text: (input: string): string => {
    return input.trim().replace(/[<>]/g, '');
  },

  url: (input: string): string => {
    try {
      const url = new URL(input);

      return url.href;
    } catch {
      return '';
    }
  },

  email: (input: string): string => {
    return input.toLowerCase().trim();
  },
};

// Simple rate limiting for frontend (prevents spam)
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();

  isAllowed(
    key: string,
    maxAttempts: number = 5,
    windowMs: number = 300000
  ): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];

    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < windowMs);

    if (validAttempts.length >= maxAttempts) {
      return false;
    }

    validAttempts.push(now);
    this.attempts.set(key, validAttempts);

    return true;
  }
}

export const rateLimiter = new RateLimiter();
