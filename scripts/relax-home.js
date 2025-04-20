document.addEventListener('DOMContentLoaded', () => {
    // Example stats – replace with real data later
    document.getElementById('blocked-ads').textContent      = '87,682';
    document.getElementById('bandwidth-saved').textContent  = '379.3 MB';
    document.getElementById('time-saved').textContent       = '1.2h';

    // Category click stubs
    ['entertainment','communication','weather'].forEach(id => {
        document.getElementById(id).addEventListener('click', () => {
            alert(`${id.charAt(0).toUpperCase()+id.slice(1)} widget clicked`);
        });
    });

    // Search bar handler
    const input = document.getElementById('search-input');
    const btn   = document.getElementById('search-btn');
    function doSearch() {
        const q = input.value.trim();
        if (q) {
            // for now, open external default browser
            window.open(`https://www.google.com/search?q=${encodeURIComponent(q)}`, '_blank');
        }
    }
    btn.addEventListener('click', doSearch);
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') doSearch();
    });
});