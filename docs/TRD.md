# Technical Requirements Document (TRD) - RAM Commerce

**Versi:** 1.0

## 1. Tech Stack
- **Frontend:** React.js atau Next.js (untuk SEO yang lebih baik).
- **Backend:** Node.js dengan Express atau Go.
- **Database:** PostgreSQL (untuk data relasional produk & transaksi).
- **Caching:** Redis (untuk filter produk yang cepat).
- **Hosting:** AWS atau Google Cloud Platform.

## 2. Arsitektur Sistem
Sistem akan menggunakan arsitektur **Monolith yang modular** di awal, dengan pemisahan antara API dan Frontend.

## 3. Struktur Database (Schema Utama)
- **Table Products:** `id, name, type (DDR4/5), capacity, speed, voltage, latency, stock, price`.
- **Table Compatibility:** `id, product_id, motherboard_model, laptop_model`.
- **Table Orders:** `id, user_id, total_price, status, payment_link`.

## 4. Integrasi API Pihak Ketiga
1. **Payment Gateway:** API Midtrans (Snap/Core API).
2. **Logistik:** API RajaOngkir untuk kalkulasi ongkos kirim.
3. **Auth:** Firebase Auth atau Auth0 untuk login (Google/Email).

## 5. Keamanan (Security)
- Penggunaan HTTPS/SSL.
- JWT (JSON Web Token) untuk otentikasi API.
- Input validasi untuk mencegah SQL Injection pada fitur filter.

## 6. Rencana Deployment
- CI/CD menggunakan GitHub Actions.
- Dockerization untuk lingkungan pengembangan dan produksi.
