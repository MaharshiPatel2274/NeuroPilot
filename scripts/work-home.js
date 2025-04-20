// Mode‑switch dropdown
const switchControl = document.querySelector('.mode-switch');
const pill = switchControl.querySelector('.mode-pill');

pill.addEventListener('click', e => {
    switchControl.classList.toggle('open');
    e.stopPropagation();
});

// Switch back to Relax
document.getElementById('switch-to-relax').addEventListener('click', () => {
    window.location.href = 'relax-home.html';
});

// Close dropdown on outside click
document.addEventListener('click', e => {
    if (!switchControl.contains(e.target)) {
        switchControl.classList.remove('open');
    }
});

// Search bar
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
