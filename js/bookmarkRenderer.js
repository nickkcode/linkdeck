import { ChromeService } from './chromeService.js';

export async function renderBookmarks(container, searchTerm = '') {
	try {
        // Set container to flex display
        container.style.display = 'flex';
        container.style.flexWrap = 'wrap';
        container.style.gap = '10px';
        container.style.justifyContent = 'start';

		const bookmarks = await ChromeService.getBookmarks();
		container.innerHTML = '';

		function createBookmarkElement(bookmark) {
			// Only render links with URLs
			if (!bookmark.url) return null;

			const domain = new URL(bookmark.url).origin;
			const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain_url=${domain}`;
			
			const element = document.createElement('a');
			element.href = bookmark.url;
			element.classList.add('bookmark-item');
			element.style.display = 'flex';
			element.style.flexDirection = 'column';
			element.style.alignItems = 'center';
            element.style.justifyContent = "center"
			element.style.textDecoration = 'none';
			element.style.width = '80px';
			element.style.height = '80px';
			element.style.textAlign = 'center';

			element.innerHTML = `
				<img src="${faviconUrl}" alt="Favicon" width="40px" height="40px" style="margin-bottom: 5px;">
				<span style="font-size: 12px; color: white; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%;">
					${bookmark.title || new URL(bookmark.url).hostname}
				</span>
			`;

			return element;
		}

		function renderBookmarkTree(bookmarkNodes, parentElement) {
			bookmarkNodes.forEach((node) => {
				// Filter bookmarks based on search term
				const shouldShow =
					!searchTerm ||
					node.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					node.url?.toLowerCase().includes(searchTerm.toLowerCase());

				if (node.children) {
					// Recursively render child bookmarks
					renderBookmarkTree(node.children, parentElement);
				} else if (shouldShow) {
					const bookmarkElement = createBookmarkElement(node);
					if (bookmarkElement) {
						parentElement.appendChild(bookmarkElement);
					}
				}
			});
		}

		renderBookmarkTree(bookmarks, container);
	} catch (error) {
		container.innerHTML = `
            <div>
                <p>${error.message}</p>
            </div>
        `;
	}
}
