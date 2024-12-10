import express from "express";
import { db } from "../../config/configdb.js";
import { sqlClientErrors } from "../../utils/sqlClientError.js";
import jwt from "jsonwebtoken"
import { checkRole } from "../../middlewares/otorisasi.js";

const router = express.Router();

router.patch('/transaksi/metode/:id_transaksi',
    checkRole(['pelanggan']),
    (req, res) => {
        const { id_transaksi } = req.params;
        const body = req.body;

        const data = [
            id_transaksi,
            body.metode_transaksi
        ];

        db.query("call ubah_metode_transaksi(?, ?)", data, (err, _result) => {
            if (err) {
                const sqlErrorCode = err.sqlState;

                console.error("Database Error:", {
                    code: err.code,
                    message: err.message,
                    sqlState: err.sqlState,
                    stack: err.stack
                });

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
                    message: "Metode transaksi berhasil diubah"
                });
        });
    });


    router.patch('/transaksi/pembayaran/:id_transaksi',
        checkRole(['pelanggan']),
    
        (req, res) => {
            const { id_transaksi} = req.params;
            const body = req.body;
    
            const data = [
                id_transaksi,
                body.status_transaksi
            ]
    
            db.query("call ubah_status_transaksi_pembayaran_pelanggan(?, ?)", data, (err, _result) => {
                if (err) {
                    const sqlErrorCode = err.sqlState;

                    // Log error ke konsol
                    console.error("Database Error:", {
                        code: err.code,
                        message: err.message,
                        sqlState: err.sqlState,
                        stack: err.stack
                    });
                
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
                        })
                }
                return res
                    .status(201)
                    .json({
                        message: "Pembayaran berhasil dilakukan, tunggu konfirmasi dari amdin",
                    });
            });
        });

    router.patch('/transaksi/pembatalan/:id_transaksi',
        checkRole(['pelanggan']),
    
        (req, res) => {
            const { id_transaksi} = req.params;
            const body = req.body;
    
            const data = [
                id_transaksi,
                body.status_transaksi
            ]
    
            db.query("call ubah_status_transaksi_pembatalan_pelanggan(?, ?)", data, (err, _result) => {
                if (err) {
                    const sqlErrorCode = err.sqlState;

                    // Log error ke konsol
                    console.error("Database Error:", {
                        code: err.code,
                        message: err.message,
                        sqlState: err.sqlState,
                        stack: err.stack
                    });
                
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
                        })
                }
                return res
                    .status(201)
                    .json({
                        message: "Membatalkan transaksi, tunggu sampai admin mengkonfirmasi pembatalan",
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

export { router as melakukanTransaksiRoutes };
    