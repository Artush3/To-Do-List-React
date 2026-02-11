import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === "production"

  return {
    base: isProd ? "/To-Do-List-React/" : "/",
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      devSourcemap: true,
      modules: {
        // Поведение CSS-модулей
        scopeBehaviour: 'local',
        globalModulePaths: [],
        generateScopedName: undefined,
        hashPrefix: '',
        localsConvention: 'camelCaseOnly',
      },
      preprocessorOptions: {
        scss: {
          // Автоматически подключаем helpers во все SCSS-файлы
          additionalData: `
            @use '@/app/styles/helpers' as *;
          `,
        },
        less: {},
        stylus: {},
      },
    },
  }
})
