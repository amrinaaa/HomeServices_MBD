import express from "express";
import { db } from "../../config/configdb.js";
import { sqlClientErrors } from "../../utils/sqlClientError.js";
import { checkRole } from "../../middlewares/otorisasi.js";

const router = express.Router();

router.get("/transaksi/riwayat", 
    checkRole(['pelanggan']),

    (req, res) => {
        const id_user = res.locals.payload.id_user;

        const data = [
            id_user
        ]

        console.log(data);

        db.query("call lihat_riwayat_transaksi_pelanggan(?)", data, (err, result) => {
            if (err) {
                const sqlErrorCode = err.sqlState

                if (!sqlClientErrors.includes(sqlErrorCode)) {
                    return res
                        .status(500)
                        .json({
                            message: "Internal Server Error",
                            error: err.message 
                        });
                    }
                    return res
                        .status(400)
                        .json({
                            message: err.message
                        });
                    }
                    return res
                        .status(201)
                        .json({
                            message: "Data riwayat transaksi anda berhasil ditampilkan",
                            data: result[0]
                    });
                });
            });


router.get('/transaksi/search', 
    checkRole(['pelanggan']), (req, res) => {
  const { status_transaksi } = req.query;

  if (!status_transaksi) {
    return res.status(400).json({ message: "Status transaksi diperlukan" });
  }

  db.query("CALL liat_semua_transactions_by_status(?)", [status_transaksi], (err, result) => {
    if (err) {
      const sqlErrorCode = err.sqlState;
      if (!sqlClientErrors.includes(sqlErrorCode)) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: err.message,
        });
      }

      return res.status(400).json({
        message: err.message,
      });
    }

    if (result[0].length === 0) {
      return res.status(404).json({
        message: `Tidak ada transaksi dengan status ${status_transaksi} ditemukan`,
      });
    }

    return res.status(200).json({
      message: "Data transaksi berhasil ditampilkan",
      data: result[0],
    });
  });
});

export { router as melihatRiwayatTransaksiRoutes };