function initThemeSystem() {
    const themeToggles = document.querySelectorAll('.header__theme-toggle');
    if (!themeToggles.length) return;

    const applyTheme = (isLight) => {
        const html = document.documentElement;

        if (isLight) {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            html.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        }

        themeToggles.forEach(toggle => {
            toggle.classList.toggle('active', isLight);

            const tooltip = toggle.querySelector('.header__theme-tooltip');
            const label = toggle.querySelector('.header__theme-label');

            if (tooltip) tooltip.textContent = isLight ? 'Tema Escuro' : 'Tema Claro';
            if (label) label.textContent = isLight ? 'Tema Escuro' : 'Tema Claro';
        });
    };

    // Estado inicial baseado no localStorage
    const storedTheme = localStorage.getItem('theme');
    applyTheme(storedTheme === 'light');

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isLight = !document.documentElement.hasAttribute('data-theme');
            applyTheme(isLight);
        });
    });
}

// Inicializa quando a página estiver pronta
document.addEventListener('DOMContentLoaded', initThemeSystem);
