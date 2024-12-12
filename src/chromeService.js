export class ChromeService {
	static async isAvailable() {
		return typeof chrome !== 'undefined' && chrome.bookmarks;
	}

	static async getBookmarks() {
		if (!(await this.isAvailable())) {
			throw new Error('Chrome bookmarks API is not available');
		}
        
		try {
			return await chrome.bookmarks.getTree();
		} catch (error) {
			throw new Error(`Failed to fetch bookmarks: ${error.message}`);
		}
	}
}
