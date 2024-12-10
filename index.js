import express from "express"
import cookieParser from "cookie-parser"

import { jwt } from "./src/config/jwt.js";
import { registrasiRoutes } from "./src/routes/registrasi.js";
import { regisAdminRoutes } from "./src/routes/regisAdmin.js";
import { loginRoutes } from "./src/routes/login.js";
// Admin
import { cekLayananAdminRoutes } from "./src/routes/admin/mengelola_layanan/cek_layanan.js";
import { layananRoutes } from "./src/routes/admin/mengelola_layanan/layanan.js";
import { kategoriRoutes } from "./src/routes/admin/mengelola_layanan/kategori.js";
import { melihatDataOrderanPelangganRoutes } from "./src/routes/admin/melihat_orderan/data_orderan.js";
import { statusTransaksiByAdminRoutes } from "./src/routes/admin/verifikasi_transaksi.js/konfirmasi_transaksi.js";

// Pelanggan
import { cekUserRoutes } from "./src/routes/cekUser.js";
import { orderDetailRoutes } from "./src/routes/Pelanggan/order_layanan/order_detail.js";
import { cekLayananRoutes } from "./src/routes/Pelanggan/order_layanan/cek_layanan.js";
import { orderLayananRoutes } from "./src/routes/Pelanggan/order_layanan/order_layanan.js";
import { melakukanTransaksiRoutes } from "./src/routes/Pelanggan/melakukan_transaksi.js";
import { melihatRiwayatTransaksiRoutes } from "./src/routes/Pelanggan/melihat_riwayat_transaksi.js";

// Logout
import { logoutRoutes } from "./src/routes/logout.js";
const app = express()

// middleware untuk baca body (json)
app.use(express.json())

// middleware untuk baca cookie
app.use(cookieParser())

// router registrasi
app.use(registrasiRoutes),
app.use(regisAdminRoutes),
app.use(loginRoutes)

// middleware check auth
app.use((req, res, next) => {
    const token = req.cookies.token
    const payload = jwt.verify(token)
    console.log(payload)
    
    if (!payload) {
        res
            .status(401)
            .json({
                message: "Unauthorized",
            })

        return
    }

    res.locals.payload = payload

    next()
})

// Admin
// Mengelola Layanan
app.use(cekLayananAdminRoutes),
app.use(layananRoutes),
app.use(kategoriRoutes),
app.use(melihatDataOrderanPelangganRoutes),
app.use(statusTransaksiByAdminRoutes)


// Pelanggan
// Order Layanan
app.use(cekUserRoutes),
app.use(cekLayananRoutes),
app.use(orderDetailRoutes),
app.use(orderLayananRoutes),
app.use(melakukanTransaksiRoutes),
app.use(melihatRiwayatTransaksiRoutes)

//logout
app.use(logoutRoutes)
const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});