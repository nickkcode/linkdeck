import { renderBookmarks } from './bookmarkRenderer.js';
import { setupSearch } from './search.js';
import { setupKeyboardShortcuts } from './keyboardShortcuts.js';
import { ChromeService } from './chromeService.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Check Chrome API availability first
        if (!await ChromeService.isAvailable()) {
            throw new Error('Chrome API is not available. Please ensure this is running as a Chrome extension.');
        }

        const bookmarksContainer = document.getElementById('bookmarks-container');
        const searchInput = document.getElementById('search-input');
        
        // Setup keyboard shortcuts
        setupKeyboardShortcuts();
        
        // Initial render of bookmarks
        await renderBookmarks(bookmarksContainer);
        
        // Setup search functionality
        setupSearch(searchInput, bookmarksContainer);
    } catch (error) {
        const container = document.getElementById('bookmarks-container');
        container.innerHTML = `
            <div class="error-message">
                <p>⚠️ ${error.message}</p>
                <p>This extension requires Chrome browser and proper permissions to function.</p>
            </div>
        `;
        console.error('Error initializing bookmarks:', error);
    }
});