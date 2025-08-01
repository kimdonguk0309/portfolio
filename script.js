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

const attackDescriptions = {
  "SQL Injection": {
    desc: "SQL Injection 공격은 입력값을 조작해 데이터베이스 쿼리를 변조하여 비정상적인 데이터 접근이나 조작을 시도하는 공격입니다.",
    alertLevel: "심각 (Red)",
    alertClass: "red",
    alertCode: "RED ALERT - SQL 인젝션 공격 탐지"
  },
  "Cross-Site Scripting (XSS)": {
    desc: "XSS 공격은 악성 스크립트를 웹 페이지에 삽입해 사용자의 세션 탈취나 정보 노출을 유발합니다.",
    alertLevel: "심각 (Red)",
    alertClass: "red",
    alertCode: "RED ALERT - 크로스 사이트 스크립팅 탐지"
  },
  "Cross-Site Request Forgery (CSRF)": {
    desc: "CSRF 공격은 사용자의 인증된 권한을 악용해 의도하지 않은 요청을 서버에 전송하도록 만드는 공격입니다.",
    alertLevel: "중간 (Orange)",
    alertClass: "orange",
    alertCode: "ORANGE ALERT - CSRF 공격 탐지"
  },
  "File Upload Vulnerability": {
    desc: "악성 파일 업로드를 통해 서버에 쉘코드나 악성 스크립트를 삽입하는 공격입니다.",
    alertLevel: "중간 (Orange)",
    alertClass: "orange",
    alertCode: "ORANGE ALERT - 파일 업로드 공격 탐지"
  },
  "Command Injection": {
    desc: "명령어 삽입 공격은 시스템 명령어를 외부에서 조작해 임의 코드 실행을 시도하는 공격입니다.",
    alertLevel: "심각 (Red)",
    alertClass: "red",
    alertCode: "RED ALERT - 명령어 삽입 공격 탐지"
  },
  "Directory Traversal": {
    desc: "디렉토리 이동 공격은 파일 경로를 조작해 시스템 파일에 비정상적으로 접근하는 공격입니다.",
    alertLevel: "중간 (Orange)",
    alertClass: "orange",
    alertCode: "ORANGE ALERT - 디렉토리 이동 공격 탐지"
  },
  "Clickjacking": {
    desc: "클릭재킹 공격은 투명한 프레임으로 사용자 클릭을 가로채는 공격입니다.",
    alertLevel: "낮음 (Yellow)",
    alertClass: "yellow",
    alertCode: "YELLOW ALERT - 클릭재킹 공격 탐지"
  },
  "Session Hijacking": {
    desc: "세션 탈취 공격은 세션 쿠키를 탈취하여 인증 권한을 빼앗는 공격입니다.",
    alertLevel: "심각 (Red)",
    alertClass: "red",
    alertCode: "RED ALERT - 세션 탈취 공격 탐지"
  },
  "Brute Force Attack": {
    desc: "무차별 대입 공격은 반복적인 로그인 시도로 비밀번호를 알아내려는 공격입니다.",
    alertLevel: "중간 (Orange)",
    alertClass: "orange",
    alertCode: "ORANGE ALERT - 무차별 대입 공격 탐지"
  },
  "Open Redirect": {
    desc: "오픈 리디렉션은 악성 사이트로 사용자를 유도하는 공격입니다.",
    alertLevel: "낮음 (Yellow)",
    alertClass: "yellow",
    alertCode: "YELLOW ALERT - 오픈 리디렉션 공격 탐지"
  },
  "Server-Side Request Forgery (SSRF)": {
    desc: "SSRF 공격은 서버가 내부 시스템에 비정상적으로 요청을 보내도록 하는 공격입니다.",
    alertLevel: "심각 (Red)",
    alertClass: "red",
    alertCode: "RED ALERT - SSRF 공격 탐지"
  },
  "Insecure Deserialization": {
    desc: "불안정한 역직렬화는 악성 객체를 역직렬화하여 임의 코드 실행을 유발하는 공격입니다.",
    alertLevel: "심각 (Red)",
    alertClass: "red",
    alertCode: "RED ALERT - 불안정한 역직렬화 공격 탐지"
  }
};

const attackMap = {
  sql_injection: "SQL Injection",
  xss: "Cross-Site Scripting (XSS)",
  csrf: "Cross-Site Request Forgery (CSRF)",
  file_upload: "File Upload Vulnerability",
  cmd_injection: "Command Injection",
  dir_traversal: "Directory Traversal",
  clickjacking: "Clickjacking",
  session_hijacking: "Session Hijacking",
  brute_force: "Brute Force Attack",
  open_redirect: "Open Redirect",
  ssrf: "Server-Side Request Forgery (SSRF)",
  insecure_deserialization: "Insecure Deserialization"
};

const attackButtonsContainer = document.getElementById("attackButtons");
const simArea = document.getElementById("simArea");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const alertLevelDiv = document.getElementById("alertLevel");
const alertCodeDiv = document.getElementById("alertCode");
const modalCloseBtn = document.getElementById("modalCloseBtn");

// 모달 열기 함수
function openModal(name) {
  const info = attackDescriptions[name];
  if (!info) return;

  modalTitle.textContent = name;
  modalDesc.textContent = info.desc;
  alertLevelDiv.textContent = `위기경보 단계: ${info.alertLevel}`;
  alertLevelDiv.className = `alert-level ${info.alertClass}`;
  alertCodeDiv.textContent = `코드발령: ${info.alertCode}`;

  modal.classList.remove("hidden");
}

// 모달 닫기 함수
function closeModal() {
  modal.classList.add("hidden");
}

modalCloseBtn.addEventListener("click", closeModal);

// 모달 바깥 클릭 시 닫기
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// 공격 버튼 생성 및 ❓ 아이콘 추가
function createButtons() {
  Object.keys(attackScenarios).forEach(key => {
    const name = attackMap[key] || key;

    const wrapper = document.createElement("div");
    wrapper.className = "attack-button-wrapper";

    const btn = document.createElement("button");
    btn.className = "attack-btn";
    btn.textContent = name;
    btn.onclick = () => runSimulation(key);

    const infoIcon = document.createElement("span");
    infoIcon.className = "info-icon";
    infoIcon.title = `${name} 설명 보기`;
    infoIcon.textContent = "❓";
    infoIcon.onclick = (e) => {
      e.stopPropagation();
      openModal(name);
    };

    wrapper.appendChild(btn);
    wrapper.appendChild(infoIcon);
    attackButtonsContainer.appendChild(wrapper);
  });
}

// 시뮬레이션 실행 (단계별 출력 + 버튼 비활성화)
function runSimulation(type) {
  simArea.innerHTML = "";
  const steps = attackScenarios[type];
  const buttons = document.querySelectorAll("#attackButtons button");

  buttons.forEach(btn => btn.disabled = true);

  steps.forEach((step, idx) => {
    setTimeout(() => {
      const div = document.createElement("div");
      div.className = "sim-step";
      div.style.animationDelay = `${idx * 0.2}s`;
      div.textContent = `[${idx + 1}] ${step}`;
      simArea.appendChild(div);

      if (idx === steps.length - 1) {
        setTimeout(() => {
          buttons.forEach(btn => btn.disabled = false);
        }, 800);
      }
    }, idx * 800);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  createButtons();
});
