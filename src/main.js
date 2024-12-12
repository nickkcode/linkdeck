import { renderBookmarks } from './bookmarkRenderer.js';
import { ChromeService } from './chromeService.js';

document.addEventListener('DOMContentLoaded', async () => {
	try {
		if (!(await ChromeService.isAvailable())) {
			throw new Error('Chrome API is not available');
		}

		const bookmarksContainer = document.getElementById(
			'bookmarks-container'
		);

		await renderBookmarks(bookmarksContainer);
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
