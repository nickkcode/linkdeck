// settingsPage.js
import { ThemeManager } from './themeManager.js';

class SettingsPage {
    constructor() {
        this.themeManager = new ThemeManager();
        this.init();
    }

    init() {
        this.createSettingsContainer();
        this.createThemeSelector();
        // Add more settings options here (e.g., font size, layout, etc.)
    }

    createSettingsContainer() {
        this.settingsContainer = document.createElement('div');
        this.settingsContainer.classList.add('settings-container');

        this.settingsContainer.innerHTML = `
            <h2>Settings</h2>
            <div class="settings-section">
                <h3>Appearance</h3>
                <div class="theme-selector-container"></div>
            </div>
            <!-- Add more settings sections here -->
        `;

        document.body.appendChild(this.settingsContainer);
    }

    createThemeSelector() {
        const themeSelectorContainer = this.settingsContainer.querySelector('.theme-selector-container');
        this.themeManager.createThemeSelector(themeSelectorContainer);
    }
}

// Usage
document.addEventListener('DOMContentLoaded', () => {
    const settingsPage = new SettingsPage();
});
