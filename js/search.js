import { renderBookmarks } from './bookmarkRenderer.js';

export function setupSearch(searchInput, bookmarksContainer) {
    let debounceTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimeout);
        
        debounceTimeout = setTimeout(() => {
            const searchTerm = e.target.value.trim();
            renderBookmarks(bookmarksContainer, searchTerm);
        }, 300);
    });
}