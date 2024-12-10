import express from "express";
import { db } from "../../../config/configdb.js";
import { sqlClientErrors } from "../../../utils/sqlClientError.js";
import jwt from "jsonwebtoken"
import { checkRole } from "../../../middlewares/otorisasi.js";

const router = express.Router();

router.get("/admin/kategori", 
    checkRole(['admin']),

    (req, res) => {

        db.query("call lihat_semua_kategori()", (err, result) => {
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
                            message: "Data kategori berhasil ditampilkan",
                            data: result[0]
                    });
                });
            });


router.get("/admin/kategori/search", 
    checkRole(['admin']),

    (req, res) => {
        const { nama_kategori } = req.query

        const data = [nama_kategori];

        db.query("call search_kategori_by_nama(?)", data, (err, result) => {
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
                            message: "Data kategori berhasil ditampilkan",
                            data: result[0]
                    });
                });
            });

router.get("/admin/layanan", 
    checkRole(['admin']),

    (req, res) => {

        db.query("call lihat_semua_layanan()", (err, result) => {
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
                            message: "Data layanan berhasil ditampilkan",
                            data: result[0]
                    });
                });
            });


router.get("/admin/layanan/search", 
    checkRole(['admin']),

    (req, res) => {
        const { nama_layanan } = req.query

        const data = [nama_layanan];

        db.query("call search_layanan_by_name(?)", data, (err, result) => {
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
                            message: "Data layanan berhasil ditampilkan",
                            data: result[0]
                    });
                });
            });

router.get("/admin/layanan/search-by", 
    checkRole(['admin']),

    (req, res) => {
        const { nama_kategori } = req.query

        const data = [nama_kategori];

        db.query("call search_layanan_by_kategori(?)", data, (err, result) => {
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
                            message: "Data layanan berhasil ditampilkan",
                            data: result[0]
                    });
                });
            });

router.get("/admin/layanan/id-layanan", 
    checkRole(['admin']),

    (req, res) => {
        const { nama_layanan } = req.query

        const data = [nama_layanan];

        db.query("call id_layanan_by_name(?)", data, (err, result) => {
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
                            message: "Data Id layanan dan nama layanan berhasil ditampilkan",
                            data: result[0]
                    });
                });
            });

export { router as cekLayananAdminRoutes };