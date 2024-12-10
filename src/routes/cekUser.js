import express from "express";
import { db } from "../config/configdb.js";
import { sqlClientErrors } from "../utils/sqlClientError.js";
import { checkRole } from "../middlewares/otorisasi.js";

const router = express.Router();

router.get("/id-nama", 
    checkRole(['pelanggan', 'admin']),

    (req, res) => {

        db.query("call lihat_semua_nama_pelanggan()", (err, result) => {
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
                            message: "Data nama pelanggan berhasil ditampilkan",
                            data: result[0]
                    });
                });
            });

router.get("/id-email", 
    checkRole(['pelanggan', 'admin']),

    (req, res) => {

        db.query("call lihat_semua_email_pelanggan()", (err, result) => {
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
                            message: "Data email pelanggan berhasil ditampilkan",
                            data: result[0]
                    });
                });
            });


router.get(
  "/search-by-nama",
  checkRole(['pelanggan', 'admin']), 

  (req, res) => {
    const { nama_pelanggan } = req.query; 

    const data = [nama_pelanggan];

    db.query("CALL search_pelanggan_by_nama(?)", data, (err, result) => {
      if (err) {
        const sqlErrorCode = err.sqlState;
        if (!sqlClientErrors.includes(sqlErrorCode)) {

          return res
          .status(500)
          .json({
            message: "Internal Server Error",
            error: err.message,
          });
        }

        return res
        .status(400)
        .json({
          message: err.message,
        });
      }

      return res
      .status(200)
      .json({
        message: "Data pelanggan berhasil ditampilkan",
        data: result[0],

      });
    });
  });

  router.get(
    "/search-by-email",
    checkRole(['pelanggan', 'admin']), 
  
    (req, res) => {
      const { email_pelanggan } = req.query; 
  
      const data = [email_pelanggan];
  
      db.query("CALL search_pelanggan_by_email(?)", data, (err, result) => {
        if (err) {
          const sqlErrorCode = err.sqlState;
          if (!sqlClientErrors.includes(sqlErrorCode)) {
  
            return res
            .status(500)
            .json({
              message: "Internal Server Error",
              error: err.message,
            });
          }
  
          return res
          .status(400)
          .json({
            message: err.message,
          });
        }
  
        return res
        .status(200)
        .json({
          message: "Data pelanggan berhasil ditampilkan",
          data: result[0],
  
        });
      });
    });
  
export { router as cekUserRoutes };