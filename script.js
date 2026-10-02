const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const strengthBar = document.getElementById('strengthBar');
const statusBanner = document.getElementById('statusBanner');

const entropyVal = document.getElementById('entropyVal');
const crackTimeVal = document.getElementById('crackTimeVal');
const poolVal = document.getElementById('poolVal');
const lengthVal = document.getElementById('lengthVal');

const reqLength = document.getElementById('reqLength');
const reqUpper = document.getElementById('reqUpper');
const reqLower = document.getElementById('reqLower');
const reqNumber = document.getElementById('reqNumber');
const reqSymbol = document.getElementById('reqSymbol');
const reqOptimal = document.getElementById('reqOptimal');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.textContent = type === 'password' ? 'SHOW' : 'HIDE';
});

function updateChecklistItem(element, isValid) {
    if (isValid) {
        element.classList.add('valid');
        element.querySelector('span').textContent = '✓';
    } else {
        element.classList.remove('valid');
        element.querySelector('span').textContent = '•';
    }
}

function formatCrackTime(seconds) {
    if (seconds === 0) return 'Instant';
    if (seconds < 1) return 'Sub-second';
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 31536000 * 1000) return `${Math.round(seconds / 31536000)} years`;
    return 'Centuries+';
}

passwordInput.addEventListener('input', () => {
    const pwd = passwordInput.value;
    const length = pwd.length;

    lengthVal.textContent = `${length} chars`;

    if (length === 0) {
        strengthBar.style.width = '0%';
        strengthBar.style.backgroundColor = 'transparent';
        statusBanner.textContent = 'Awaiting Input...';
        statusBanner.style.color = 'var(--text-main)';
        entropyVal.textContent = '0.00 bits';
        crackTimeVal.textContent = '-';
        poolVal.textContent = '0 chars';
        [reqLength, reqUpper, reqLower, reqNumber, reqSymbol, reqOptimal].forEach(el => updateChecklistItem(el, false));
        return;
    }

    let poolSize = 0;
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSymbol = /[^a-zA-Z0-9]/.test(pwd);

    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasNumber) poolSize += 10;
    if (hasSymbol) poolSize += 33;

    poolVal.textContent = `${poolSize} chars`;

    updateChecklistItem(reqLength, length >= 8);
    updateChecklistItem(reqUpper, hasUpper);
    updateChecklistItem(reqLower, hasLower);
    updateChecklistItem(reqNumber, hasNumber);
    updateChecklistItem(reqSymbol, hasSymbol);
    updateChecklistItem(reqOptimal, length >= 12);

    let entropy = 0;
    if (poolSize > 0) {
        entropy = length * Math.log2(poolSize);
    }
    entropyVal.textContent = `${entropy.toFixed(2)} bits`;

    const totalCombinations = Math.pow(2, entropy);
    const secondsToCrack = totalCombinations / 10000000000;
    crackTimeVal.textContent = formatCrackTime(secondsToCrack);

    let score = 0;
    if (length >= 8) score++;
    if (length >= 12) score++;
    if (hasLower && hasUpper) score++;
    if (hasNumber) score++;
    if (hasSymbol) score++;

    const percentage = (score / 5) * 100;
    strengthBar.style.width = `${Math.max(percentage, 10)}%`;

    if (score <= 2 || entropy < 28) {
        strengthBar.style.backgroundColor = 'var(--danger)';
        statusBanner.textContent = 'VULNERABLE (High Risk of Brute-Force)';
        statusBanner.style.color = 'var(--danger)';
    } else if (score <= 4 || entropy < 60) {
        strengthBar.style.backgroundColor = 'var(--warning)';
        statusBanner.textContent = 'MODERATE (Can Be Enhanced)';
        statusBanner.style.color = 'var(--warning)';
    } else {
        strengthBar.style.backgroundColor = 'var(--success)';
        statusBanner.textContent = 'SECURE (Cryptographically Strong)';
        statusBanner.style.color = 'var(--success)';
    }
});