import express from "express";
import { db } from "../../../config/configdb.js";
import { sqlClientErrors } from "../../../utils/sqlClientError.js";
import { checkRole } from "../../../middlewares/otorisasi.js";

const router = express.Router();

// Order Layanan
router.post('/order-layanan/:id_order_detail', 
    checkRole(['pelanggan']),
    
    (req, res) => {
    const { id_order_detail } = req.params;
    const body = req.body;
    
    const data = [
        id_order_detail,
        body.nama_layanan
    ];

    console.log("Data yang dikirim ke query:", data); 
            
    db.query("call insert_order_layanan(?, ?)", data, (err, _result) => {
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
    
router.get('/order-layanan', 
    checkRole(['pelanggan']),

    (req, res) => {
    const id_user = res.locals.payload.id_user;
    
        db.query('CALL lihat_order_layanan_by_id_user(?)', [id_user], (err, results) => {
            if (err) {
                console.error('Error saat menjalankan prosedur: ', err);
                return res.status(500).send({
                    message: 'Terjadi kesalahan saat memproses permintaan.',
                });
            }
            return res.status(200)
            .json({
                message: 'Data order layanan anda berhasil ditampilkan.',
                data: results[0],
            });
        });
    });

router.patch('/order-layanan/:id_order_detail/:id_order_layanan', 
checkRole(['pelanggan']), 
(req, res) => {
    const { id_order_detail } = req.params;
    const { id_order_layanan } = req.params;
    const body = req.body;

    const data = [
        id_order_detail,
        id_order_layanan,
        body.nama_layanan
    ]

    db.query("call edit_order_layanan(?, ?, ?)", data, (err, _result) => {
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
                    message: "Order layanan berhasil diedit"
            });
        });
    });

router.delete('/order-layanan/:id_order_layanan',
    checkRole(['pelanggan']),
    (req, res) => {
        const { id_order_layanan } = req.params;

        db.query("call delete_order_layanan(?)",
        [id_order_layanan],
        (err, _result) => {
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
                    message: "Order layanan berhasil dihapus"
                });
            });
        });

export { router as orderLayananRoutes };
    
        