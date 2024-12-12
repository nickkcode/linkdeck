export function setupKeyboardShortcuts() {
    const searchInput = document.getElementById('search-input');
    const shortcuts = document.createElement('div');
    shortcuts.className = 'keyboard-shortcuts';
    shortcuts.innerHTML = `
        <div class="shortcut"><kbd>/</kbd> Toggle focus on search</div>
        <div class="shortcut"><kbd>Esc</kbd> Clear and unfocus search</div>
        <div class="shortcut"><kbd>?</kbd> Toggle shortcuts</div>
    `;
    document.body.appendChild(shortcuts);

    document.addEventListener('keydown', (e) => {
        if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
            shortcuts.classList.toggle('visible');
        }

        if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            if (document.activeElement === searchInput) {
                searchInput.blur();
            } else {
                searchInput.focus();
            }
        }

        if (e.key === 'Escape') {
            if (document.activeElement === searchInput) {
                searchInput.value = ''; 
                searchInput.blur();
                searchInput.dispatchEvent(new Event('input'));
            }
            shortcuts.classList.remove('visible');
        }
    });
}
