// 1. Multi-Page Navigation
function switchPage(pageId) {
  document.querySelectorAll('.page').forEach((page) => {
    page.classList.remove('active');
  });
  document.querySelectorAll('nav button').forEach((btn) => {
    btn.classList.remove('active');
  });

  const targetPage = document.getElementById(pageId);
  const targetNav = document.getElementById('nav-' + pageId);
  if (targetPage) targetPage.classList.add('active');
  if (targetNav) targetNav.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 2. Real-Time Password Strength Evaluator
const pwdInput = document.getElementById('pwd-input');
const meterFill = document.getElementById('meter-fill');
const pwdFeedback = document.getElementById('pwd-feedback');

if (pwdInput) {
  pwdInput.addEventListener('input', () => {
    const val = pwdInput.value;
    let score = 0;

    if (!val) {
      meterFill.style.width = '0%';
      pwdFeedback.textContent = 'Enter a password to evaluate entropy and crack resistance.';
      pwdFeedback.style.color = '#94a3b8';
      return;
    }

    if (val.length >= 8) score += 1;
    if (val.length >= 14) score += 1;
    if (/[A-Z]/.test(val)) score += 1;
    if (/[0-9]/.test(val)) score += 1;
    if (/[^A-Za-z0-9]/.test(val)) score += 1;

    switch (score) {
      case 1:
      case 2:
        meterFill.style.width = '30%';
        meterFill.style.background = 'var(--danger)';
        pwdFeedback.textContent = '❌ Weak: Vulnerable to instant dictionary & brute-force attacks.';
        pwdFeedback.style.color = 'var(--danger)';
        break;
      case 3:
      case 4:
        meterFill.style.width = '65%';
        meterFill.style.background = 'var(--warning)';
        pwdFeedback.textContent = '⚠️ Moderate: Reasonable, but lengthen it or add unique symbols.';
        pwdFeedback.style.color = 'var(--warning)';
        break;
      case 5:
        meterFill.style.width = '100%';
        meterFill.style.background = 'var(--success)';
        pwdFeedback.textContent = '✅ Excellent: High entropy, resilient against standard brute-forcing.';
        pwdFeedback.style.color = 'var(--success)';
        break;
    }
  });
}

// 3. Password Generator
function generateNewPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%^&*()_+";
  let result = "";
  for (let i = 0; i < 18; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById('gen-result').textContent = result;
}

function copyPassword() {
  const text = document.getElementById('gen-result').textContent;
  if (text && text !== "Click Generate Below") {
    navigator.clipboard.writeText(text).then(() => {
      alert("Password copied to clipboard!");
    });
  }
}

// 4. Checklist Progress Tracker
function updateChecklistProgress() {
  const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
  let checked = 0;
  checkboxes.forEach((cb) => {
    if (cb.checked) checked++;
  });
  const percent = Math.round((checked / checkboxes.length) * 100);
  document.getElementById('chk-progress').textContent = percent + '%';
  document.getElementById('chk-bar').style.width = percent + '%';
}

// 5. Interactive Quiz Logic
function checkQuiz(qNum, isCorrect, btn) {
  const ansBox = document.getElementById('ans' + qNum);
  const parent = btn.parentElement;
  parent.querySelectorAll('button').forEach((b) => b.disabled = true);

  if (isCorrect) {
    btn.style.background = '#15803d';
    btn.style.borderColor = '#22c55e';
    ansBox.textContent = '✅ Correct! Exactly the right defensive action.';
    ansBox.style.color = '#22c55e';
  } else {
    btn.style.background = '#b91c1c';
    btn.style.borderColor = '#ef4444';
    ansBox.textContent = '❌ Incorrect. This action leaves you vulnerable to exploitation.';
    ansBox.style.color = '#ef4444';
  }
}

// 6. Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then((reg) => console.log('CyberGuard SW Active:', reg.scope))
      .catch((err) => console.error('SW Error:', err));
  });
}