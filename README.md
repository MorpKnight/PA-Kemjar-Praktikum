# Proyek Keamanan Aplikasi Web

Proyek ini terdiri dari dua aplikasi web yang dirancang untuk menguji dan meningkatkan keamanan aplikasi web terhadap serangan CSRF (Cross-Site Request Forgery) dan penggunaan JWT (JSON Web Token) yang tidak aman.

## Tujuan

Tujuan dari proyek ini adalah untuk:
1. Mengidentifikasi dan memahami potensi kerentanan keamanan dalam aplikasi web.
2. Menerapkan teknik mitigasi untuk melindungi aplikasi dari serangan CSRF.
3. Menggunakan JWT dengan cara yang aman untuk otentikasi dan otorisasi.

## Struktur Proyek

Proyek ini terdiri dari dua bagian utama:
1. **CSRF**: Aplikasi yang berfokus pada mitigasi serangan CSRF.
2. **Insecure-JWT**: Aplikasi yang berfokus pada penggunaan JWT yang aman.

Setiap bagian memiliki dua komponen:
- **Backend**: Server-side code yang menangani logika bisnis dan komunikasi dengan database.
- **Frontend**: Client-side code yang menangani antarmuka pengguna.

## Teknologi yang Digunakan

- **Backend**:
  - Node.js
  - Docker
  - Docker Compose

- **Frontend**:
  - React
  - TypeScript
  - Vite
  - Tailwind CSS

## Cara Menjalankan Proyek

### Menjalankan Backend

1. **CSRF Backend**:
   - Buka terminal dan navigasikan ke direktori `CSRF/Backend`.
   - Jalankan perintah berikut untuk membangun dan menjalankan container Docker:
     ```sh
     docker-compose up --build
     ```

2. **Insecure-JWT Backend**:
   - Buka terminal dan navigasikan ke direktori `Insecure-JWT/Backend`.
   - Jalankan perintah berikut untuk membangun dan menjalankan container Docker:
     ```sh
     docker-compose up --build
     ```

### Menjalankan Frontend

1. **CSRF Frontend**:
   - Buka terminal dan navigasikan ke direktori `CSRF/Frontend`.
   - Instal dependensi dengan perintah:
     ```sh
     npm install
     ```
   - Jalankan aplikasi dengan perintah:
     ```sh
     npm run dev
     ```

2. **Insecure-JWT Frontend**:
   - Buka terminal dan navigasikan ke direktori [Frontend](http://_vscodecontentref_/0).
   - Instal dependensi dengan perintah:
     ```sh
     npm install
     ```
   - Jalankan aplikasi dengan perintah:
     ```sh
     npm run dev
     ```

## Remediasi

### CSRF

Untuk melindungi aplikasi dari serangan CSRF, langkah-langkah berikut dapat diambil:
1. **Menggunakan Token CSRF**: Setiap permintaan yang memodifikasi data harus menyertakan token CSRF yang unik dan valid.
2. **Validasi Referer Header**: Memeriksa header referer untuk memastikan permintaan berasal dari domain yang sah.
3. **Menggunakan SameSite Cookie Attribute**: Mengatur atribut `SameSite` pada cookie untuk mencegah pengiriman cookie lintas situs.

### Insecure-JWT

Untuk menggunakan JWT dengan aman, langkah-langkah berikut dapat diambil:
1. **Menggunakan Algoritma yang Aman**: Pastikan menggunakan algoritma enkripsi yang kuat seperti `HS256` atau `RS256`.
2. **Memvalidasi JWT**: Memeriksa validitas JWT pada setiap permintaan yang memerlukan otentikasi.
3. **Mengatur Masa Berlaku JWT**: Mengatur masa berlaku JWT yang  dansingkat memperbarui token secara berkala.
4. **Menggunakan Secure Cookie**: Menyimpan JWT dalam cookie yang aman dengan atribut `HttpOnly` dan `Secure`.

Dengan mengikuti langkah-langkah di atas, aplikasi web dapat lebih terlindungi dari serangan CSRF dan penggunaan JWT yang tidak aman.