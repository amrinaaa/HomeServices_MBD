import express from "express";
import { db } from "../../../config/configdb.js";
import { sqlClientErrors } from "../../../utils/sqlClientError.js";
import jwt from "jsonwebtoken"
import { checkRole } from "../../../middlewares/otorisasi.js";

const router = express.Router();

router.get('/admin/cek-order-detail', 
    checkRole(['admin']),

    (req, res) => {
    
        db.query('CALL lihat_semua_order_detail()', (err, results) => {
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
                            message: "Order detail berhasil didapatkan",
                            data: results[0]
                    });
                });
            });

router.get("/admin/orderan/data/:id_order_detail", 
    checkRole(['admin']),

    (req, res) => {
        const { id_order_detail } = req.params;

        const data = [
            id_order_detail
        ]

        console.log(data);

        db.query("call lihat_order_detail_berdasarkan_id_order(?)", data, (err, result) => {
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
                            message: "Data orderan pelanggan berhasil ditampilkan",
                            data: result[0]
                    });
                });
            });


router.get("/admin/orderan/data", 
    checkRole(['admin']),

    (req, res) => {
        const { nama_pelanggan } = req.query;

        const data = [
            nama_pelanggan
        ]

        console.log(data);

        db.query("call lihat_order_detail_by_nama_pelanggan(?)", data, (err, result) => {
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
                            message: "Data orderan pelanggan berhasil ditampilkan",
                            data: result[0]
                    });
                });
            });

    router.get('/admin/id-order-detail-by-nama', 
        checkRole(['admin']),
    
        (req, res) => {

            const { nama_pelanggan } = req.query

                db.query('CALL order_detail_by_nama(?)', [nama_pelanggan], (err, results) => {
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
                                message: "Order detail berhasil didapatkan",
                                data: results[0]                        
                            });
                    });
                });
         
    router.get('/admin/id-order-detail-by-email', 
        checkRole(['admin']),
    
        (req, res) => {

            const { email } = req.query

                db.query('CALL order_detail_by_email(?)', [email], (err, results) => {
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
                                message: "Order detail berhasil didapatkan",
                                data: results[0]                        
                            });
                    });
                })

router.get('/admin/cek-order-layanan', 
    checkRole(['admin']),

    (req, res) => {
    
        db.query('CALL liat_semua_order_layanan()', (err, results) => {
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
                            message: "Order detail berhasil didapatkan",
                            data: results[0]
                    });
                });
            });
export { router as melihatDataOrderanPelangganRoutes };

