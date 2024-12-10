export class ChromeService {
    static async isAvailable() {
        return typeof chrome !== 'undefined' && chrome.bookmarks;
    }

    static async getBookmarks() {
        if (!await this.isAvailable()) {
            throw new Error('Chrome bookmarks API is not available. Please ensure this is running as a Chrome extension.');
        }
        
        try {
            return await chrome.bookmarks.getTree();
        } catch (error) {
            throw new Error(`Failed to fetch bookmarks: ${error.message}`);
        }
    }
}