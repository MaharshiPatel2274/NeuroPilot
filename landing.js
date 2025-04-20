document.addEventListener('DOMContentLoaded', () => {
    const modal     = document.getElementById('app-modal');
    const zoneLabel = document.getElementById('modal-zone-name');
    const input     = document.getElementById('new-app-name');
    let currentZone = null;
  
    // Open modal
    document.querySelectorAll('.add-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentZone = btn.dataset.zone;
        zoneLabel.textContent = currentZone.charAt(0).toUpperCase() + currentZone.slice(1);
        input.value = '';
        modal.classList.remove('hidden');
        input.focus();
      });
    });
  
    // Cancel
    document.getElementById('cancel-app').addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  
    // Save new app
    document.getElementById('save-app').addEventListener('click', () => {
      const name = input.value.trim();
      if (!name) return;
      const list = document.getElementById(`${currentZone}-list`);
      const li   = document.createElement('li');
      li.textContent = name;
      li.className   = 'app-card';
      list.appendChild(li);
      modal.classList.add('hidden');
    });
  });
  