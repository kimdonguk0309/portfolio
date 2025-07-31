const attackScenarios = {
  sql_injection: [
    "입력값 감지: ' OR 1=1 --",
    "쿼리 파싱 중...",
    "🚨 SQL Injection 탐지됨",
    "요청 차단 및 관리자 알림",
    "완료 ✅"
  ],
  xss: [
    "스크립트 감지: <script>alert('XSS')</script>",
    "입력 필터링 확인 중...",
    "🚨 XSS 시도 차단됨",
    "콘텐츠 보안 정책 적용됨",
    "완료 ✅"
  ],
  csrf: [
    "의심 외부 요청 수신됨",
    "CSRF 토큰 검증 중...",
    "🚨 CSRF 공격 차단",
    "세션 보호 성공",
    "완료 ✅"
  ],
  file_upload: [
    "파일 업로드 요청: shell.php",
    "MIME/확장자 검사 중...",
    "🚨 악성 파일 업로드 탐지",
    "업로드 중단됨",
    "완료 ✅"
  ],
  cmd_injection: [
    "명령어 입력 감지: ; rm -rf /",
    "명령어 유효성 필터링 중...",
    "🚨 명령어 삽입 시도 차단됨",
    "입력 거부 및 기록 저장",
    "완료 ✅"
  ],
  dir_traversal: [
    "경로 입력 감지: ../../etc/passwd",
    "경로 정규화 처리 중...",
    "🚨 디렉토리 이동 탐지",
    "요청 차단됨",
    "완료 ✅"
  ],
  clickjacking: [
    "외부 iFrame 로딩 탐지",
    "X-Frame-Options 검사 중...",
    "🚨 클릭재킹 시도 탐지",
    "보안 헤더로 차단",
    "완료 ✅"
  ],
  session_hijacking: [
    "쿠키 노출 감지 시도",
    "Secure / HttpOnly 속성 검사 중...",
    "🚨 세션 탈취 시도 탐지됨",
    "세션 재설정 완료",
    "완료 ✅"
  ],
  brute_force: [
    "로그인 시도 횟수: 15회",
    "지속적인 로그인 실패 감지",
    "🚨 무차별 대입 공격 탐지",
    "IP 일시 차단",
    "완료 ✅"
  ],
  open_redirect: [
    "URL 파라미터 감지: ?next=http://attacker.com",
    "도메인 검증 중...",
    "🚨 오픈 리디렉션 탐지됨",
    "내부 경로로 강제 전환됨",
    "완료 ✅"
  ],
  ssrf: [
    "내부 IP 요청 감지: http://127.0.0.1",
    "서버 대상 검사 중...",
    "🚨 SSRF 공격 차단",
    "내부 리소스 접근 제한",
    "완료 ✅"
  ],
  insecure_deserialization: [
    "직렬화된 객체 수신됨",
    "객체 무결성 확인 중...",
    "🚨 불안정한 역직렬화 탐지됨",
    "객체 실행 차단 및 경고",
    "완료 ✅"
  ]
};

const attackNames = {
  sql_injection: "SQL Injection",
  xss: "XSS",
  csrf: "CSRF",
  file_upload: "파일 업로드",
  cmd_injection: "명령어 삽입",
  dir_traversal: "디렉토리 이동",
  clickjacking: "클릭재킹",
  session_hijacking: "세션 하이재킹",
  brute_force: "무차별 로그인",
  open_redirect: "오픈 리디렉션",
  ssrf: "SSRF",
  insecure_deserialization: "역직렬화 취약점"
};

window.addEventListener('DOMContentLoaded', () => {
  const btnContainer = document.getElementById("attackButtons");
  for (const key in attackNames) {
    const btn = document.createElement("button");
    btn.textContent = attackNames[key];
    btn.addEventListener("click", () => runSimulation(key));
    btnContainer.appendChild(btn);
  }
});

function runSimulation(type) {
  const area = document.getElementById("simArea");
  area.innerHTML = "";
  const steps = attackScenarios[type];
  steps.forEach((step, index) => {
    setTimeout(() => {
      const div = document.createElement("div");
      div.className = "sim-step";
      div.style.animationDelay = `${index * 0.2}s`;
      div.textContent = `[${index + 1}] ${step}`;
      area.appendChild(div);
    }, index * 800);
  });
}
