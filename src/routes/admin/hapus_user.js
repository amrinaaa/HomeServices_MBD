import express from "express";
import { db } from "../../../config/configdb.js";
import { sqlClientErrors } from "../../../utils/sqlClientError.js";
import { checkRole } from "../../../middlewares/otorisasi.js";

const router = express.Router();

router.delete('/admin/hapus-user/:id_user',
    checkRole(['admin']),

    (req, res) => {
        
        const { id_user } = req.params;

        const data = [
            id_user
        ];

        db.query("call hapus_user_dan_data_terkait(?)", data, (err, result) => {
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
                        .status(200)
                        .json({
                            message: "User berhasil dihapus"
                        });
        });

    });