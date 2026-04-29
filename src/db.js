// src/db.js
require('dotenv').config(); // .env 파일의 환경변수를 불러옵니다.
const mysql = require('mysql2/promise');

// DB 커넥션 풀(Pool) 생성: 요청이 올 때마다 연결하는 게 아니라, 미리 연결 통로를 만들어두고 재사용합니다.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;