const checkRole = (roles) => {
    return (req, res, next) => {
        const { role } = res.locals.payload;

        console.log("Role pengguna:", role);

        if (!roles.includes(role)) {
            return res.status(403).json({
                message: "Forbidden: Anda tidak memiliki akses ke endpoint ini.",
            });
        }

        next();
    };
};


export {  checkRole };

