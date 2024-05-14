import { defineConfig } from 'vite';
import { resolve as _resolve } from 'path';

export default defineConfig({
  // root: _resolve(__dirname, 'src'), // Это если файл index.html находится в папке src, но при этом картинки не отображаются
  root: process.cwd(), // Устанавливаем корневую директорию проекта, файл index.html находится в корне проекта
  resolve: {
    alias: {
      '~bootstrap': _resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  server: {
    port: 8080,
    hot: true
  }
});
