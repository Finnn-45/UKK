# TODO

## Menu card full-screen modal (di klik card)

- [ ] Buat komponen `src/components/MenuFullScreenModal.tsx` (modal overlay full layar) yang menampilkan: foto besar, title, category, rating, harga, deskripsi + section tambahan biar tidak kosong.
- [ ] Modal punya tombol close (X) dan aksi `Tambah ke Keranjang`.
- [ ] Update `src/components/MenuCard.tsx`: saat card diklik, buka modal; tombol cart tetap stopPropagation.
- [ ] Tambahkan logic supaya modal butuh session: kalau user belum login, tampilkan `LoginModal` (reuse yang sudah ada) atau tutup modal lalu login modal.
- [ ] Cek layout & z-index supaya tidak konflik dengan `LoginModal`.
- [ ] Jalankan `npm run lint` dan `npm run build` untuk memastikan compile.

