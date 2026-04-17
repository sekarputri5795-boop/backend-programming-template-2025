# Gacha System API - Backend Programming Quiz (UTS)

## 🛠️ Daftar Endpoint

### 1. Bermain Gacha
- **Method:** `POST`
- **URL:** `/api/gacha/play`
- **Body:**
  ```json
  {
    "userId": "12345",
    "userName": "Sekar"
  }
  ```

### 2. Riwayat User
- **Method:** `GET`
- **URL:** `/api/gacha/history/:userId`
- **Keterangan:** Menampilkan semua riwayat tarikan gacha untuk user ID tertentu.

### 3. Daftar Inventaris Hadiah
- **Method:** `GET`
- **URL:** `/api/gacha/prizes`
- **Keterangan:** Menampilkan daftar hadiah, total kuota, dan jumlah pemenang saat ini.

### 4. Daftar Pemenang (Privacy Mode)
- **Method:** `GET`
- **URL:** `/api/gacha/winners`
- **Keterangan:** Menampilkan daftar user yang memenangkan hadiah dengan nama yang telah disensor.

## Cara Instalasi
1. Clone repository ini.
2. Jalankan 
   ```bash
   npm install
   ```
3. Konfigurasi file `.env`
4. Jalankan server:
   ```bash
   npm run dev
   ```
---