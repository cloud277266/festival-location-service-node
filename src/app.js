// src/app.js
const express = require('express');
const path = require('path');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8082;

// 1. 프론트엔드 정적 파일 서빙 (public 폴더 안의 HTML, JS를 브라우저에 제공)
app.use(express.static(path.join(__dirname, '../public')));

// 2. 축제 데이터 조회 API (기존 PHP 프론트엔드와 100% 호환되도록 주소 유지)
app.get('/api/get_festivals.php', async (req, res) => {
    try {
        // 클라이언트가 보낸 쿼리 파라미터 받기 (기본값 설정)
        const type = parseInt(req.query.type) || 1;
        const lat = parseFloat(req.query.lat) || 37.5665;
        const lng = parseFloat(req.query.lng) || 126.9780;
        const page = parseInt(req.query.page) || 1;
        
        const limit = 12;
        const offset = (page - 1) * limit;

        let whereClause = "";
        let orderClause = "";
        let selectClause = "*";
        let queryParams = [];

        // Type별 필터 조건 설정
        if (type === 3) {
            whereClause = "WHERE eventstartdate > CURDATE()";
            orderClause = "ORDER BY eventstartdate ASC";
        } else {
            whereClause = "WHERE eventstartdate <= CURDATE() AND eventenddate >= CURDATE()";
            if (type === 2) orderClause = "ORDER BY eventenddate ASC";
        }

        // Type 1 (내 주변): 하버사인 거리 계산 공식 적용
        if (type === 1) {
            selectClause = `*, (6371 * acos(LEAST(1.0, GREATEST(-1.0, cos(radians(?)) * cos(radians(mapy)) * cos(radians(mapx) - radians(?)) + sin(radians(?)) * sin(radians(mapy)))))) AS distance`;
            queryParams.push(lat, lng, lat);
            orderClause = "ORDER BY distance ASC";
        }

        // 3. 페이지네이션을 위한 전체 데이터 개수 조회
        const [countRows] = await db.query(`SELECT COUNT(*) as total FROM festivals ${whereClause}`);
        const totalRows = countRows[0].total;
        const totalPages = Math.ceil(totalRows / limit);

        // 4. 실제 데이터 조회
        const sql = `SELECT ${selectClause} FROM festivals ${whereClause} ${orderClause} LIMIT ? OFFSET ?`;
        queryParams.push(limit, offset);
        
        const [results] = await db.query(sql, queryParams);

        // 5. JSON 응답 보내기 (PHP, Java와 동일한 규격)
        res.json({
            status: 'success',
            data: results,
            total_pages: totalPages,
            current_page: page
        });

    } catch (error) {
        console.error("DB Error:", error);
        res.status(500).json({ status: 'error', message: '서버 에러가 발생했습니다.' });
    }
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`🚀 Node.js 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});