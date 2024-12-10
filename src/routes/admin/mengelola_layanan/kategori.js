import express from "express";
import { db } from "../../../config/configdb.js";
import { sqlClientErrors } from "../../../utils/sqlClientError.js";
import jwt from "jsonwebtoken"
import { checkRole } from "../../../middlewares/otorisasi.js";

const router = express.Router();

router.post('/kategori', 
    checkRole(['admin']), 
    (req, res) => {
        const body = req.body;
    
        const data = [
            body.nama_kategori
        ];
    
        db.query("CALL tambah_kategori(?)", data, (err, result) => {
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
                            message: "Kategori berhasil ditambahkan",
                            data: result[1]?.[0] || nul
                        });
                });
        });
    
router.patch('/kategori/:id_kategori',
    checkRole(['admin']),

    (req, res) => {
        const { id_kategori } = req.params;
        const body = req.body;
    
        const data = [
            id_kategori,
            body.nama_kategori
        ];

        db.query("CALL edit_kategori(?, ?)", data, (err, result) => {
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
                        message: "Kategori berhasil diedit",
                        data: result[1]?.[0] || null
                    });
                });
        }); 

router.delete('/kategori/:id_kategori',
    checkRole(['admin']),

    (req, res) => {
        const { id_kategori } = req.params;
    
        const data = [
            id_kategori,
        ];

        db.query("CALL hapus_kategori(?)", data, (err, result) => {
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
                        message: "Kategori berhasil dihapus",
                        data: result[1]?.[0] || null
                    });
                });
        }); 

export { router as kategoriRoutes };