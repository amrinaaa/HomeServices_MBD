import express from "express";
import { db } from "../../../config/configdb.js";
import { sqlClientErrors } from "../../../utils/sqlClientError.js";
import { checkRole } from "../../../middlewares/otorisasi.js";

const router = express.Router();

router.patch('/transaksi/konfirmasi-pembayaran/:id_transaksi',
    checkRole(['admin']),

    (req, res) => {
        const { id_transaksi} = req.params;
        const body = req.body;

        const data = [
            id_transaksi,
            body.status_transaksi
        ]

        db.query("call ubah_status_transaksi_verifikasi_pembayaran_by_admin(?, ?)", data, (err, _result) => {
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
                    message: "Pembayaran berhasil dilakukan",
                });
        });
    });


router.patch('/transaksi/konfirmasi-pembatalan/:id_transaksi',
    checkRole(['admin']),

    (req, res) => {
        const { id_transaksi} = req.params;
        const body = req.body;

        const data = [
            id_transaksi,
            body.status_transaksi
        ]

        db.query("call ubah_status_transaksi_verifikasi_pembatalan_by_admin(?, ?)", data, (err, _result) => {
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
                    message: "Pembatalan berhasil dilakukan",
                });
        });
    });


router.get('/transaksi/search-by-status', 
    checkRole(['admin']),
    (req, res) => {
        const { status_transaksi } = req.query;
        const data = [
            status_transaksi
        ]

        if (!status_transaksi) {
            return res.status(400).json({
                message: "Status transaksi harus diisi"
            });
        }

        db.query("CALL liat_semua_transactions_by_status(?)", data, (err, result) => {
            if (err) {
            
                const sqlErrorCode = err.sqlState;

                if (!sqlClientErrors.includes(sqlErrorCode)) {
                    return res.status(500).json({
                        message: "Internal Server Error",
                        error: err.message
                    });
                }

                return res.status(400).json({
                    message: err.message
                });
            }

            return res.status(200).json({
                message: "Daftar transaksi berhasil diambil",
                data: result[0]
            });
        });
    }
);


router.get('/admin/cek-transaksi', 
    checkRole(['admin']),

    (req, res) => {
    
        db.query('CALL liat_semua_transactions()', (err, results) => {
            if (err) {
                const sqlErrorCode = err.sqlState;
        
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
                            message: "Transaksi berhasil didapatkan",
                            data: results[0]
                    });
                });
            });
export { router as statusTransaksiByAdminRoutes };