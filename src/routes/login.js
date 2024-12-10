import express from "express"
import { db } from "../config/configdb.js";
import { jwt } from "../config/jwt.js";
import { sqlClientErrors } from "../utils/sqlClientError.js";

const router = express.Router();

router.post('/login', (req, res) => {
    const body = req.body;

    const data = [
        body.email,
        body.password
    ]

    db.query("call login(?, ?)", data, (err, result) => {
        if (err) {
            console.log(err)
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
        console.log("Result:", result);
        const queryResult = result[0][0];

        res.cookie(
            "token",
            jwt.sign(queryResult),
            {
                maxAge: 3_600 * 1000
            }
        )

        return res
            .status(200)
            .json({
                message: "Login berhasil",
                data: queryResult
            })
    })
})

export {router as loginRoutes}