import { renderBookmarks } from './bookmarkRenderer.js';
import { setupSearch } from './search.js';
import { setupKeyboardShortcuts } from './keyboardShortcuts.js';
import { ChromeService } from './chromeService.js';
import { ThemeManager } from './themeManager.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        if (!await ChromeService.isAvailable()) {
            throw new Error('Chrome API is not available');
        }

        const bookmarksContainer = document.getElementById('bookmarks-container');
        const searchInput = document.getElementById('search-input');
        
        setupKeyboardShortcuts();
        
        await renderBookmarks(bookmarksContainer);
        
        setupSearch(searchInput, bookmarksContainer);

        // Create an instance of the ThemeManager
        const themeManager = new ThemeManager();
        themeManager.initTheme();

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
