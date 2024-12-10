import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "localhost",
    user: "amrybubbombd",
    password: "amrybubbo123",
    database: "amrina_home_services",
    port: 3306
})