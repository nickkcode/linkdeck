import { ChromeService } from './chromeService.js';

export async function renderBookmarks(container, searchTerm = '') {
	try {
		const bookmarks = await ChromeService.getBookmarks();
		container.innerHTML = '';

		function createBookmarkElement(bookmark) {
			const element = document.createElement('div');
			element.className = 'bookmark-item flex flex-col items-center justify-center w-24 h-24 bg-gray-200 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all';

			if (bookmark.url) {
				const faviconUrl = `chrome://favicon/${bookmark.url}`;
				element.innerHTML = `
                    <a href="${bookmark.url}" class="bookmark-link flex flex-col items-center text-center text-sm text-gray-800">
                        <img src="${faviconUrl}" alt="Favicon" class="w-10 h-10 mb-2" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22><rect width=%2224%22 height=%2224%22 fill=%22%23999999%22/></svg>'">
                        <span class="truncate w-full">${bookmark.title || bookmark.url}</span>
                    </a>
                `;
			} else {
				element.innerHTML = `
                    <div class="folder flex flex-col items-center text-center">
                        <div class="folder-title font-bold text-gray-600">📁 ${bookmark.title}</div>
                        <div class="bookmark-grid mt-2 grid grid-cols-3 gap-2"></div>
                    </div>
                `;
			}
			return element;
		}

		function renderBookmarkTree(bookmarkNodes, parentElement) {
			const folders = [];
			const links = [];

			bookmarkNodes.forEach((node) => {
				const shouldShow =
					!searchTerm ||
					node.title
						?.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					node.url?.toLowerCase().includes(searchTerm.toLowerCase());

				if (!shouldShow && !node.children) {
					return;
				}

				if (node.children) {
					folders.push(node);
				} else {
					links.push(node);
				}
			});

			// Render folders first
			folders.forEach((folder) => {
				const folderElement = createBookmarkElement(folder);
				const gridContainer =
					folderElement.querySelector('.bookmark-grid');
				renderBookmarkTree(folder.children, gridContainer);

				if (!searchTerm || gridContainer.children.length > 0) {
					parentElement.appendChild(folderElement);
				}
			});

			// Then render links
			links.forEach((link) => {
				const linkElement = createBookmarkElement(link);
				parentElement.appendChild(linkElement);
			});
		}

		renderBookmarkTree(bookmarks, container);

		// Set the grid layout for the container
		container.className = 'grid gap-4 p-4 h-full grid-cols-[repeat(auto-fit,minmax(6rem,1fr))]';
	} catch (error) {
		container.innerHTML = `
            <div class="error-message text-red-600 p-4">
                <p>⚠️ ${error.message}</p>
                <p>Please ensure you have:</p>
                <ul>
                    <li>Loaded this as a Chrome extension</li>
                    <li>Granted necessary permissions</li>
                    <li>Reloaded the extension if recently installed</li>
                </ul>
            </div>
        `;
		console.error('Error rendering bookmarks:', error);
	}
}
