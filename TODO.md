# TODO - User Flow (No DB/Admin dulu)

- [x] Update `src/types/order.ts` untuk tambah field `address` dan `deliveryDate`.

- [x] Update `src/app/(user)/checkout/CheckoutClient.tsx`:

  - [ ] Tambah form input alamat + tanggal.
  - [ ] Pastikan order object menyertakan `address` & `deliveryDate`.
  - [ ] Simpan order ke `localStorage`.
- [ ] Update `src/app/(user)/orders/page.tsx`:
  - [x] Tampilkan alamat + tanggal.
  - [x] Implement status progression otomatis via timer sampai `Selesai`.

- [ ] Jalankan aplikasi dan test end-to-end: menu → cart → checkout → orders.



