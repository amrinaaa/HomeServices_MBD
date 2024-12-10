import express from "express";
import { db } from "../config/configdb.js";
import { sqlClientErrors } from "../utils/sqlClientError.js";

const router = express.Router();

router.post('/regisAdmin', (req, res) => {
    const body = req.body;

    const data = [
        body.email,
        body.password,
        body.nama,
        body.no_hp
    ];

    db.query("call registrasiAdmin(?, ?, ?, ?)", data, (err, result) => {
        if (err) {
            const sqlErrorCode = err.sqlState

            if (!sqlClientErrors.includes(sqlErrorCode)) {
                return res
                    .status(500)
                    .json({
                        message: "Internal Server Error"
                    })
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
                message: "Register akun berhasil",
            })
    })
})
export { router as regisAdminRoutes };
