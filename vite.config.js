import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Устанавливаем корневую директорию на корень проекта index.html находится в корне проекта
  base: '/eCommerce_App/',
  server: {
    port: 8080,
    hot: true,
    open: '/index.html', // Открываем index.html при запуске сервера
  },
  build: {
    outDir: 'dist', // Выходная директория для сборки
  },
});
