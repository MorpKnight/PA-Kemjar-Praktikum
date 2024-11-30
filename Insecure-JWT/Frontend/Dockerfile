# Gunakan image Node.js berbasis Alpine untuk ukuran lebih kecil
FROM node:lts-alpine AS build

# Set environment variable untuk production
ENV NODE_ENV=production

# Set working directory
WORKDIR /usr/src/app

# Salin file package.json dan lock file untuk instalasi dependency
COPY ["package.json", "package-lock.json*", "./"]

# Install dependencies
RUN npm install --silent

# Salin semua file aplikasi
COPY . .

# Install global dependency Vite jika diperlukan
RUN npm install -g vite @types/vite

# Build aplikasi untuk production
RUN npm run build

# --- Stage kedua untuk menjalankan aplikasi ---
FROM node:lts-alpine AS production

# Set environment variable untuk production
ENV NODE_ENV=production

# Set working directory
WORKDIR /usr/src/app

# Copy build output dari stage pertama
COPY --from=build /usr/src/app/dist ./dist

# Install server untuk melayani aplikasi
RUN npm install -g serve

# Expose port untuk server
EXPOSE 3000

# Jalankan server untuk melayani build output
CMD ["serve", "-s", "dist", "-l", "3000"]
