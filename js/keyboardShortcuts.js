export function setupKeyboardShortcuts() {
    const searchInput = document.getElementById('search-input');
    const shortcuts = document.createElement('div');
    shortcuts.className = 'keyboard-shortcuts';
    shortcuts.innerHTML = `
        <div class="shortcut"><kbd>/</kbd> Focus search</div>
        <div class="shortcut"><kbd>Esc</kbd> Clear search</div>
        <div class="shortcut"><kbd>?</kbd> Toggle shortcuts</div>
    `;
    document.body.appendChild(shortcuts);

    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Show shortcuts panel with '?'
        if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
            shortcuts.classList.toggle('visible');
        }

        // Focus search with '/'
        if (e.key === '/' && !e.ctrlKey && !e.metaKey && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }

        // Clear search with Escape
        if (e.key === 'Escape') {
            if (document.activeElement === searchInput) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
            }
            shortcuts.classList.remove('visible');
        }
    });
}