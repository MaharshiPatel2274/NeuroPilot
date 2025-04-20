// Mode‑switch dropdown logic
const switchControl = document.querySelector('.mode-switch');
const pill = switchControl.querySelector('.mode-pill');
const dropdown = switchControl.querySelector('.mode-dropdown');

// Toggle dropdown on pill click
pill.addEventListener('click', e => {
    switchControl.classList.toggle('open');
    e.stopPropagation();
});

// Switch to Work mode
document.getElementById('switch-to-work').addEventListener('click', () => {
    window.location.href = 'work-home.html';
});

// Close dropdown when clicking outside
document.addEventListener('click', e => {
    if (!switchControl.contains(e.target)) {
        switchControl.classList.remove('open');
    }
});

// Search‑bar logic
const input = document.getElementById('search-input');
const btn   = document.getElementById('search-btn');
btn.addEventListener('click', () => {
    const q = input.value.trim();
    if (q) window.open(`https://www.google.com/search?q=${encodeURIComponent(q)}`, '_blank');
});
input.addEventListener('keydown', e => {
    if (e.key === 'Enter') btn.click();
});

// Dummy stats population
document.getElementById('blocked-ads').textContent     = '87,682';
document.getElementById('bandwidth-saved').textContent = '379.3 MB';
document.getElementById('time-saved').textContent      = '1.2 h';
