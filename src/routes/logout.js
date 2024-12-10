import express from "express";

const router = express.Router();

router.delete('/logout',
    (_req, res) => {
    res.cookie(
      "token",
      " ",
      {
        maxAge: 0
      }
    );
  
    res.status(200).json({
      message: "Logout Berhasil"
    });
  });
  
  export { router as logoutRoutes };

