import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: '/eCommerce_App/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        cart: './cart.html',
        login: './login.html',
        page_cart_empty: './page_cart_empty.html',
        product: './product.html',
        registrationForm: './registrationForm.html',
      },
    },
  },
});
