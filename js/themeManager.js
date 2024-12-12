// themeManager.js
const themes = {
    'rose-pine': {
        name: 'Rose Pine',
        variables: {
            '--base': '#232136',
            '--surface': '#2a273f',
            '--overlay': '#393552',
            '--muted': '#6e6a86',
            '--subtle': '#908caa',
            '--text': '#e0def4',
            '--love': '#eb6f92',
            '--gold': '#f6c177',
            '--rose': '#ea9a97',
            '--pine': '#3e8fb0',
            '--foam': '#9ccfd8',
            '--iris': '#c4a7e7'
        }
    },
    'tokyo-night': {
        name: 'Tokyo Night',
        variables: {
            '--base': '#1a1b26',
            '--surface': '#24283b',
            '--overlay': '#414868',
            '--muted': '#565f89',
            '--subtle': '#a9b1d6',
            '--text': '#c0caf5',
            '--love': '#f7768e',
            '--gold': '#e0af68',
            '--rose': '#bb9af7',
            '--pine': '#7aa2f7',
            '--foam': '#9ece6a',
            '--iris': '#9d7cd8'
        }
    },
    'catppuccin-mocha': {
        name: 'Catppuccin Mocha',
        variables: {
            '--base': '#1e1e2e',
            '--surface': '#181825',
            '--overlay': '#313244',
            '--muted': '#585b70',
            '--subtle': '#a6adc8',
            '--text': '#cdd6f4',
            '--love': '#f38ba8',
            '--gold': '#f9e2af',
            '--rose': '#f5c2e7',
            '--pine': '#89b4fa',
            '--foam': '#94e2d5',
            '--iris': '#cba6f7'
        }
    },
    'nord': {
        name: 'Nord',
        variables: {
            '--base': '#2e3440',
            '--surface': '#3b4252',
            '--overlay': '#434c5e',
            '--muted': '#616e88',
            '--subtle': '#d8dee9',
            '--text': '#eceff4',
            '--love': '#bf616a',
            '--gold': '#ebcb8b',
            '--rose': '#d08770',
            '--pine': '#81a1c1',
            '--foam': '#88c0d0',
            '--iris': '#b48ead'
        }
    }
};

export class ThemeManager {
    constructor() {
        this.themes = themes;
        this.currentTheme = 'rose-pine';
        this.createThemeSelector();
    }

    createThemeSelector() {
        const selector = document.createElement('select');
        selector.id = 'theme-selector';
        selector.style.cssText = `
            position: fixed;
            bottom: 10px;
            right: 10px;
            z-index: 1000;
            background: var(--overlay);
            color: var(--text);
            border: 1px solid var(--muted);
            border-radius: 4px;
            padding: 5px;
        `;

        // Populate theme options
        Object.entries(this.themes).forEach(([key, theme]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = theme.name;
            selector.appendChild(option);
        });

        // Set default selected theme
        selector.value = this.currentTheme;

        // Add event listener for theme change
        selector.addEventListener('change', (e) => {
            this.applyTheme(e.target.value);
        });

        // Append to body
        document.body.appendChild(selector);
    }

    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return;

        this.currentTheme = themeName;

        // Apply theme variables
        Object.entries(theme.variables).forEach(([variable, value]) => {
            document.documentElement.style.setProperty(variable, value);
        });

        // Optional: Persist theme choice in local storage
        localStorage.setItem('app-theme', themeName);
    }

    // Load previously selected theme from local storage
    initTheme() {
        const savedTheme = localStorage.getItem('app-theme');
        if (savedTheme && this.themes[savedTheme]) {
            this.applyTheme(savedTheme);
        }
    }
}

// Usage
document.addEventListener('DOMContentLoaded', () => {
    const themeManager = new ThemeManager();
    themeManager.initTheme();
});
