# Gunakan image Node.js berbasis Alpine
FROM node:lts-alpine

# Set environment variable
ENV NODE_ENV=development

# Set working directory
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json untuk instalasi dependencies
COPY ["package.json", "package-lock.json*", "./"]

# Install dependencies, termasuk Vite
RUN npm install --silent && npm install vite --save-dev

# Salin semua file aplikasi
COPY . .

# Expose port aplikasi (default untuk Vite adalah 5173)
EXPOSE 5173

# Jalankan aplikasi menggunakan Vite dev server
CMD ["npm", "run", "dev"]
