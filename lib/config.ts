import * as path from 'path';

// Interface for the config structure
export interface NextConfig {
  serverRuntimeConfig: { store: { token: string, projectRoot: string } };
  reactStrictMode: boolean;
}

// Get the project root directory
function getProjectRoot(): string {
  // In Next.js 16, we use process.cwd() to get the project root
  // This works reliably in both development and production
  return process.cwd();
}

// Get the store with token and project root
function getStore() {
  return {
    token: (global as any).__store?.token || '',
    projectRoot: getProjectRoot()
  };
}

// Replacement for getConfig() that mimics the old API
export default function getConfig(): NextConfig {
  return {
    serverRuntimeConfig: {
      store: getStore()
    },
    reactStrictMode: true
  };
}

// Export the project root directly for convenience
export const projectRoot = getProjectRoot();
