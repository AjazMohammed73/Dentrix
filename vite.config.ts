import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Content-Security-Policy — the primary XSS defense.
//  - script-src 'self'  => no inline <script>, no inline on* handlers, no eval
//  - connect-src locked to the API origin => injected JS can't exfiltrate the token
//  - style-src allows 'unsafe-inline' only for React style={{}} attributes (low risk)
function buildCsp(apiOrigin: string): string {
  return [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data:",
    `connect-src 'self' ${apiOrigin}`.trim(),
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "worker-src 'self'",
    "manifest-src 'self'",
  ].join('; ');
}

// Inject the CSP as a <meta> tag into the *built* index.html only (never the dev
// server, whose HMR needs inline scripts + eval).
function cspMetaPlugin(apiOrigin: string): Plugin {
  return {
    name: 'csp-meta',
    apply: 'build',
    transformIndexHtml(html) {
      const tag = `<meta http-equiv="Content-Security-Policy" content="${buildCsp(apiOrigin)}" />`;
      return html.replace('</title>', `</title>\n    ${tag}`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  let apiOrigin = '';
  try {
    apiOrigin = env.VITE_API_URL ? new URL(env.VITE_API_URL).origin : '';
  } catch {
    apiOrigin = '';
  }

  return {
    plugins: [react(), cspMetaPlugin(apiOrigin)],
    server: {
      port: 3000,
      open: true,
    },
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-three': ['three'],
            'vendor-icons': ['lucide-react'],
          },
        },
      },
    },
  };
});
