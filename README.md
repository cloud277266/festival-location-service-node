# 🎉 전국 축제 알리미 (Node.js Express Edition)

<div align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/MySQL_8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black">
</div>
<br>

> **💡 Polyglot Backend Project**
> 본 프로젝트는 프론트엔드와 백엔드를 완전히 분리하고, 비즈니스 로직을 서로 다른 백엔드 기술 스택으로 구현하여 시스템 아키텍처의 유연성을 증명하는 다국어 백엔드 프로젝트의 일환입니다.
> - **[PHP 버전 보러가기](https://github.com/cloud277266/festival-location-service)**
> - **[Java Spring Boot 버전 보러가기](https://github.com/cloud277266/festival-location-service-java)**

## 📌 프로젝트 소개

**전국 축제 알리미 (Node.js Version)**는 기존 시스템을 **Node.js 및 Express** 환경으로 재구축한 프로젝트입니다. 프론트엔드와 백엔드를 JavaScript 단일 언어로 통합하여 개발 효율을 극대화하였으며, Node.js 특유의 이벤트 루프(Event Loop) 기반 논블로킹(Non-blocking) I/O 모델을 활용하여 대량의 데이터베이스 조회 요청을 지연 없이 처리하는 데 집중했습니다.

## ✨ 핵심 기술적 특징 (Key Features)

* **Single Language Full-Stack:** 프론트엔드(Vanilla JS)와 백엔드(Node.js)를 동일한 JavaScript 생태계로 통일하여 컨텍스트 스위칭 비용 최소화
* **Asynchronous DB I/O:** `mysql2/promise` 라이브러리를 활용해 모든 데이터베이스 통신을 100% 비동기(Async/Await) 방식으로 구현
* **Connection Pooling:** 트래픽 증가에 대비하여 DB 커넥션 풀(Pool)을 선제적으로 구성, I/O 병목 현상 방지 및 연결 리소스 최적화
* **Security & Configuration:** `.env` 환경변수를 통해 민감한 접속 정보와 공공데이터 API 키를 캡슐화하여 소스 코드 레벨의 보안성 확보

### 🚀 Action (해결 로직 구현)
- Node.js와 Express 프레임워크를 도입하여 경량화된 비동기 API 서버 구축.
- SQL 내장 함수를 활용한 하버사인(Haversine) 거리 계산과 Limit/Offset 페이징 쿼리를 `db.query`로 비동기 호출.
- 기존 PHP `/api/get_festivals.php` 형태의 라우팅 구조를 Express 서버에 동일하게 구현하여, 프론트엔드 코드의 변경 없이 백엔드 엔진의 완벽한 핫 스왑(Hot Swap) 호환성 확보.

### 🎯 Result (결과 및 성과)
- 논블로킹 I/O를 통해 다중 접속자의 대규모 데이터 요청에 대한 시스템 응답성과 처리량을 획기적으로 개선했습니다.
- 동일한 비즈니스 로직을 서로 다른 패러다임(Java의 객체지향 vs Node.js의 비동기 함수형)으로 완벽하게 이식해 내며, 특정 언어에 종속되지 않는 유연한 백엔드 설계 능력을 입증했습니다.
