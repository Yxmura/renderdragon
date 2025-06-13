import { defineConfig, loadEnv } from "vite";
import sitemap from 'vite-plugin-sitemap';
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      host: "::",
      port: 8080,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      sitemap({
        hostname: 'https://renderdragon.org'
      }),
      react(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      include: [
        'html2canvas',
        '@radix-ui/react-primitive',
        '@radix-ui/react-use-callback-ref',
        '@radix-ui/react-use-controllable-state',
        '@radix-ui/react-use-layout-effect',
        '@radix-ui/react-use-previous',
        '@radix-ui/react-visually-hidden',
        'aria-hidden',
        'react-remove-scroll',
        '@radix-ui/react-context',
        '@radix-ui/react-compose-refs'
      ]
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true
      }
    },
    // Vite env configuration
    define: {
      'process.env': env
    }
  };
});
