// Mode‑switch dropdown logic
const switchControl = document.querySelector('.mode-switch');
const pill = switchControl.querySelector('.mode-pill');

pill.addEventListener('click', e => {
    switchControl.classList.toggle('open');
    e.stopPropagation();
});

// Navigate to Work
document.getElementById('switch-to-work').addEventListener('click', () => {
    window.location.href = 'work-home.html';
});

// Close dropdown on outside click
document.addEventListener('click', e => {
    if (!switchControl.contains(e.target)) {
        switchControl.classList.remove('open');
    }
});

// Search‐bar logic
const input = document.getElementById('search-input');
const btn   = document.getElementById('search-btn');
btn.addEventListener('click', () => {
    const q = input.value.trim();
    if (q) window.open(`https://www.google.com/search?q=${encodeURIComponent(q)}`, '_blank');
});
input.addEventListener('keydown', e => {
    if (e.key === 'Enter') btn.click();
});

// Dummy stats
document.getElementById('blocked-ads').textContent     = '87,682';
document.getElementById('bandwidth-saved').textContent = '379.3 MB';
document.getElementById('time-saved').textContent      = '1.2 h';

// Health Snapshot & Advice logic
let _healthData = null;

document
    .getElementById('import-health-btn')
    .addEventListener('click', () => {
        // generate dummy values (or pull from real API)
        const bp    = Math.floor(Math.random() * (130 - 90 + 1)) + 90;
        const sleep = (Math.random() * (9 - 5) + 5).toFixed(1);
        const steps = Math.floor(Math.random() * (15000 - 3000 + 1)) + 3000;

        document.getElementById('bp-value').textContent    = bp;
        document.getElementById('sleep-value').textContent = sleep;
        document.getElementById('steps-value').textContent = steps;

        _healthData = { bp, sleep: Number(sleep), steps };
    });

document
    .getElementById('get-advice-btn')
    .addEventListener('click', async () => {
        const out = document.getElementById('health-advice-output');
        if (!_healthData) {
            out.textContent = 'Import your health snapshot first.';
            return;
        }
        out.textContent = 'Loading advice…';
        try {
            const advice = await window.novaAPI.getWorkAdvice(_healthData);
            out.textContent = advice;
        } catch {
            out.textContent = 'Error generating advice.';
        }
    });
