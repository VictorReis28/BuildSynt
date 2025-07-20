/**
 * API utilities for frontend-only operations
 * GitHub API integration for repository analysis
 */

// API Configuration for frontend services
const API_CONFIG = {
  github: {
    baseUrl: "https://api.github.com",
    timeout: 10000,
  },
};

// Custom error types
export class APIError extends Error {
  constructor(message: string, public status: number, public code?: string) {
    super(message);
    this.name = "APIError";
  }
}

// Simple headers for public APIs
const createHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // Add GitHub token if available (for higher rate limits)
  const githubToken = (import.meta as any).env?.VITE_GITHUB_TOKEN;
  if (githubToken) {
    headers["Authorization"] = `token ${githubToken}`;
  }

  return headers;
};

// Simple fetch wrapper
const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeout = API_CONFIG.github.timeout
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...createHeaders(),
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new APIError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status
      );
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof APIError) {
      throw error;
    }

    if (error instanceof Error && error.name === "AbortError") {
      throw new APIError("Request timeout", 408, "TIMEOUT");
    }

    throw new APIError("Network error", 0, "NETWORK_ERROR");
  }
};

// GitHub API functions for repository analysis
export const githubAPI = {
  // Get repository information
  async getRepository(owner: string, repo: string) {
    try {
      const url = `${API_CONFIG.github.baseUrl}/repos/${owner}/${repo}`;
      const response = await fetchWithTimeout(url);
      return await response.json();
    } catch (error) {
      console.error("Error fetching repository:", error);
      throw error;
    }
  },

  // Get repository files for analysis
  async getRepositoryContents(owner: string, repo: string, path = "") {
    try {
      const url = `${API_CONFIG.github.baseUrl}/repos/${owner}/${repo}/contents/${path}`;
      const response = await fetchWithTimeout(url);
      return await response.json();
    } catch (error) {
      console.error("Error fetching repository contents:", error);
      throw error;
    }
  },
};

// Mock analysis engine (simulating code analysis)
export const mockAnalysis = {
  async analyzeRepository(githubUrl: string) {
    // Simulate analysis processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Return analysis results
    return {
      id: Date.now().toString(),
      repositoryUrl: githubUrl,
      analysisDate: new Date().toISOString(),
      errors: [
        {
          type: "TypeScript Error",
          file: "src/components/Example.tsx",
          line: 42,
          message: "Property does not exist on type",
          severity: "error",
        },
        {
          type: "React Warning",
          file: "src/App.tsx",
          line: 15,
          message: "Missing key prop in list item",
          severity: "warning",
        },
      ],
      suggestions: [
        "Add proper TypeScript types for component props",
        "Implement proper key props for list rendering",
        "Consider using React.memo for performance optimization",
      ],
      metrics: {
        totalFiles: 45,
        errorsFound: 2,
        warningsFound: 1,
        score: 85,
      },
    };
  },
};

// Export simplified API object
export const api = {
  github: githubAPI,
  analysis: mockAnalysis,
};
