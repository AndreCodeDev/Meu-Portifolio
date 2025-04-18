// =============================================
// CORE LOADING SYSTEM
// =============================================

class PortfolioLoading {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.animatedUrl = document.getElementById('animated-url');
        this.url = "https://andrecode.dev.br";
        this.typingSpeed = 120;
        this.startTime = Date.now();
        
        this.initLoading();
    }

    initLoading() {
        if (!this.loadingScreen) return;
        
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.classList.add('loading-theme');
        
        this.typeUrl();
        
        // Garante que o loading fique visível por pelo menos 1.5s
        setTimeout(() => {
            if (!this.loadingScreen.dataset.complete) {
                this.loadingScreen.style.transition = 'opacity 0.8s ease-out';
            }
        }, 1500);
    }

    typeUrl() {
        let i = 0;
        const typing = setInterval(() => {
            if (i < this.url.length) {
                this.animatedUrl.textContent += this.url.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                this.completeLoading();
            }
        }, this.typingSpeed);
    }

    completeLoading() {
        this.loadingScreen.dataset.complete = 'true';
        
        setTimeout(() => {
            this.loadingScreen.style.opacity = '0';
            
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
                document.documentElement.style.overflow = 'auto';
                document.documentElement.classList.remove('loading-theme');
                document.dispatchEvent(new CustomEvent('loadingComplete'));
            }, 800);
        }, 500);
    }
}

// =============================================
// PAGE LOAD HANDLERS
// =============================================

// Garante que a página comece no topo
window.addEventListener('load', function() {
    window.scrollTo({ top: 0, behavior: 'auto' });
});

// =============================================
// INITIALIZATION SYSTEM
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize core systems
    initThemeSystem();
    initMobileMenu();
    initActiveSectionHighlight();
    
    // Initialize section-specific components
    initSections();
});

// Wait for both DOM and loading complete
function whenReady(callback) {
    if (document.readyState === 'complete') {
        callback();
    } else {
        document.addEventListener('loadingComplete', callback);
    }
}

// =============================================
// CORE MODULES
// =============================================

/* Theme System (Light/Dark) */
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

    applyTheme(localStorage.getItem('theme') === 'light');
}

/* Mobile Menu System */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const headerMenu = document.getElementById('header__menu');
    const navLinks = document.querySelectorAll('.header__menu-link');
    
    if (!menuToggle || !headerMenu) return;

    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        headerMenu.classList.toggle('active');
    };

    const closeMenu = () => {
        menuToggle.classList.remove('active');
        headerMenu.classList.remove('active');
    };

    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    navLinks.forEach(link => link.addEventListener('click', closeMenu));
    
    document.querySelectorAll('.header__theme-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => setTimeout(closeMenu, 500));
    });
}

/* Active Section Highlight */
function initActiveSectionHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__menu-link');
    
    if (!sections.length || !navLinks.length) return;

    let timeout;
    const updateActiveLink = () => {
        let currentSection = null;
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                currentSection = section;
            }
        });

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            const isActive = currentSection && linkHref === `#${currentSection.id}`;
            link.classList.toggle('active', isActive);
        });
    };

    window.addEventListener('scroll', () => {
        clearTimeout(timeout);
        timeout = setTimeout(updateActiveLink, 50);
    });
    
    window.addEventListener('resize', updateActiveLink);
    updateActiveLink();
}

// =============================================
// SECTION MODULES
// =============================================

function initSections() {
    // Hero Section
    if (document.querySelector('.hero')) initHero();
    
    // Portfolio Section
    if (document.querySelector('.portfolio')) initPortfolio();
    
    // About Section
    if (document.querySelector('.about')) initAbout();
    
    // Add more sections as needed
}

function initHero() {
    console.log('Hero inicializado');
    // Hero-specific code here
}

function initPortfolio() {
    console.log('Portfolio inicializado');
    // Portfolio-specific code here
}

function initAbout() {
    console.log('About inicializado');
    // About-specific code here
}

// =============================================
// INSTANTIATE LOADING SYSTEM
// =============================================

new PortfolioLoading();