// =============================================
// CORE MODULES (AFTER LOADING)
// =============================================

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
            const tooltip = toggle.querySelector('.header__theme-tooltip, .header__theme-label');
            if (tooltip) {
                tooltip.textContent = isLight ? 'Tema Escuro' : 'Tema Claro';
            }
        });
    };

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            applyTheme(!document.documentElement.hasAttribute('data-theme'));
        });
    });

}

// Initialize text animation only after everything is ready
document.addEventListener('loadingComplete', function() {
    initThemeSystem();
});