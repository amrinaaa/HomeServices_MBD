import express from "express";
import { db } from "../../../config/configdb.js";
import { sqlClientErrors } from "../../../utils/sqlClientError.js";
import jwt from "jsonwebtoken"
import { checkRole } from "../../../middlewares/otorisasi.js";

const router = express.Router();

router.post('/layanan/:id_kategori', 
    checkRole(['admin']), 
    (req, res) => {
        const { id_kategori } = req.params;
        const body = req.body;
    
        const data = [
            id_kategori,
            body.nama_layanan,
            body.deskripsi,
            body.harga_perjam
        ];
    
        db.query("CALL tambah_layanan(?, ?, ?, ?)", data, (err, result) => {
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
                        .status(200)
                        .json({
                            message: "Layanan berhasil ditambahkan",
                            data: result[1]?.[0] || nul
                        });
                });
        });
    
router.patch('/layanan/:id_layanan',
    checkRole(['admin']),

    (req, res) => {
        const { id_layanan } = req.params;
        const body = req.body;
    
        const data = [
            id_layanan,
            body.nama_layanan,
            body.deskripsi,
            body.harga_perjam
        ];

        db.query("CALL edit_layanan(?, ?, ?, ?)", data, (err, result) => {
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
                    .status(200)
                    .json({
                        message: "Layanan berhasil diedit",
                        data: result[1]?.[0] || null
                    });
                });
        }); 

router.delete('/layanan/:id_layanan',
    checkRole(['admin']),

    (req, res) => {
        const { id_layanan } = req.params;
    
        const data = [
            id_layanan,
        ];

        db.query("CALL hapus_layanan(?)", data, (err, result) => {
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
                    .status(200)
                    .json({
                        message: "Layanan berhasil dihapus"
                    });
                });
        }); 
export { router as layananRoutes };