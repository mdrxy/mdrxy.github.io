(function() {
  'use strict';

  const THEME_KEY = 'mdrxy-theme';
  const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
  };
  
  const THEME_ICONS = {
    [THEMES.LIGHT]: '☀️',
    [THEMES.DARK]: '🌙', 
    [THEMES.SYSTEM]: '💻'
  };

  let currentTheme = THEMES.SYSTEM;

  // Get the effective theme (resolves system to actual light/dark)
  function getEffectiveTheme(theme) {
    if (theme === THEMES.SYSTEM) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT;
    }
    return theme;
  }

  // Apply theme to the document
  function applyTheme(theme) {
    const body = document.body;
    const html = document.documentElement;
    
    // Remove existing theme classes
    body.classList.remove('theme-light', 'theme-dark');
    html.classList.remove('theme-light', 'theme-dark');
    
    if (theme !== THEMES.SYSTEM) {
      // Apply specific theme class
      body.classList.add(`theme-${theme}`);
      html.classList.add(`theme-${theme}`);
    }
    // If system theme, let CSS media query handle it naturally
  }

  // Update theme icon
  function updateThemeIcon() {
    const iconElement = document.getElementById('theme-icon');
    if (iconElement) {
      iconElement.textContent = THEME_ICONS[currentTheme];
    }
  }

  // Set theme and persist to localStorage
  function setTheme(theme) {
    if (!Object.values(THEMES).includes(theme)) {
      console.warn(`Invalid theme: ${theme}`);
      return;
    }

    currentTheme = theme;
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(getEffectiveTheme(theme));
    updateThemeIcon();
  }

  // Load theme from localStorage or default to system
  function loadTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const theme = Object.values(THEMES).includes(savedTheme) ? savedTheme : THEMES.SYSTEM;
    setTheme(theme);
  }

  // Handle system theme changes
  function handleSystemThemeChange() {
    if (currentTheme === THEMES.SYSTEM) {
      applyTheme(getEffectiveTheme(THEMES.SYSTEM));
    }
  }

  // Initialize theme toggle functionality
  function initThemeToggle() {
    // Load initial theme
    loadTheme();

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleSystemThemeChange);
    }

    // Add click handlers to dropdown items
    document.addEventListener('click', function(event) {
      const themeElement = event.target.closest('[data-theme]');
      if (themeElement) {
        event.preventDefault();
        const theme = themeElement.getAttribute('data-theme');
        setTheme(theme);
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
  } else {
    initThemeToggle();
  }

})();