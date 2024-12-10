import express from "express";
import { db } from "../../../config/configdb.js";
import { sqlClientErrors } from "../../../utils/sqlClientError.js";
import { checkRole } from "../../../middlewares/otorisasi.js";

const router = express.Router();

// Order Detail
router.get('/order-detail', 
    checkRole(['pelanggan']),

    (req, res) => {
    const id_user = res.locals.payload.id_user;
    
        db.query('CALL lihat_order_detail_by_id_user(?)', [id_user], (err, results) => {
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
                            message: "Order detail berhasil didapatkankan",
                            data: results[0]
                    });
                });
            });

// Order Detail
router.get('/order-detail/getIdByStatus', 
    checkRole(['pelanggan']),
    (req, res) => {
        const id_user = res.locals.payload.id_user;
        const { status_order } = req.query;

        if (!status_order) {
            return res.status(400).json({
                message: 'Parameter status_order tidak boleh kosong',
            });
        }

        const data = [id_user, status_order];

        db.query('CALL lihat_order_detail_by_status(?, ?)', data, (err, results) => {
            if (err) {
                const sqlErrorCode = err.sqlState;

                if (!sqlClientErrors.includes(sqlErrorCode)) {
                    return res.status(500).json({
                        message: 'Internal Server Error',
                        error: err.message,
                    });
                }

                return res.status(400).json({
                    message: err.message,
                });
            }

            return res.status(200).json({
                message: 'Berhasil mendapatkan Id order detail berdasarkan status order',
                data: results[0],
            });
        });
    }
);

         
router.post('/order-detail', 
    checkRole(['pelanggan']),
    
    (req, res) => {
    const body = req.body;
    const id_user = res.locals.payload.id_user;
        
    const data = [
        id_user,
        body.jadwal_service || null,
        body.alamat,
        body.sesi,
        body.start_time || null,
        body.end_time || null
    ];
    console.log("Data yang dikirim ke query:", data); 
            
    db.query("call create_order_detail(?, ?, ?, ?, ?, ?)", data, (err, _result) => {
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
                    message: "Order detail berhasil dibuat"
            });
        });
    });

router.patch('/order-detail/:id_order_detail',
    checkRole(['pelanggan']),

    (req, res) => {
    const { id_order_detail } = req.params;
    const body = req.body;

    const data = [
        id_order_detail,
        body.jadwal_service || null,
        body.alamat,
        body.sesi,
        body.start_time || null,
        body.end_time || null
    ]
    console.log("Data yang dikirim ke query:", data); 
            
    db.query("call edit_order_detail(?, ?, ?, ?, ?, ?)", data, (err, _result) => {
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
                    message: "Data order detail berhasil diedit"
            });
        });
    });

router.delete('/order-detail/:id_order_detail',
    checkRole(['pelanggan']),
    (req, res) => {
        const { id_order_detail } = req.params;

        const data = [id_order_detail];

        console.log("Data yang dikirim ke query:", id_order_detail);

        db.query("call delete_order_detail(?)", data, (err, _result) => {
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
                    message: "Data order detail berhasil dihapus"
            });
        });
    });

export { router as orderDetailRoutes };