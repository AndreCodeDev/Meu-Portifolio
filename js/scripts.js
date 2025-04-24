// =============================================
// CORE LOADING SYSTEM (FIRST TO EXECUTE)
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
// INITIALIZE LOADING SYSTEM IMMEDIATELY
// =============================================
const loadingSystem = new PortfolioLoading();

// =============================================
// PAGE LOAD HANDLERS
// =============================================

window.addEventListener('load', function() {
    window.scrollTo({ top: 0, behavior: 'auto' });
});

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

    //applyTheme(localStorage.getItem('theme') === 'light');
}

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
// TEXT ANIMATION SYSTEM (LAST TO INITIALIZE)
// =============================================

class TextAnimation {
    constructor() {
        this.messages = [
            { text: "Bem-Vindo(a) ao meu Portfólio", class: "hero__animation" },
            { text: "Meu nome é André Vitor", class: "hero__animation" },
        ];
        this.container = document.getElementById("hero__animacaoText");
        this.messageIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.waitTime = 2000;
        
        if (this.container) this.init();
    }

    init() {
        this.typeMessage();
    }

    typeMessage() {
        const currentMessage = this.messages[this.messageIndex % this.messages.length];
        
        if (this.isDeleting) {
            this.container.textContent = currentMessage.text.substring(0, this.charIndex - 1);
            this.charIndex--;
            
            if (this.charIndex === 0) {
                this.isDeleting = false;
                this.messageIndex = (this.messageIndex + 1) % this.messages.length;
                setTimeout(() => this.typeMessage(), 500);
            } else {
                setTimeout(() => this.typeMessage(), 50);
            }
        } else {
            this.container.textContent = currentMessage.text.substring(0, this.charIndex + 1);
            this.container.className = `hero__typing-text ${currentMessage.class}`;
            this.charIndex++;
            
            if (this.charIndex === currentMessage.text.length) {
                this.isDeleting = true;
                setTimeout(() => this.typeMessage(), this.waitTime);
            } else {
                setTimeout(() => this.typeMessage(), 100);
            }
        }
    }
}

// =============================================
// INITIALIZATION SYSTEM (AFTER LOADING COMPLETE)
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize core systems first
    initThemeSystem();
    initMobileMenu();
    initActiveSectionHighlight();
    
    // Then initialize sections
    initSections();
});

// Initialize text animation only after everything is ready
document.addEventListener('loadingComplete', function() {
    new TextAnimation();
});

// =============================================
// SECTION MODULES
// =============================================

function initSections() {
    if (document.querySelector('.hero')) initHero();
    if (document.querySelector('.portfolio')) initPortfolio();
    if (document.querySelector('.about')) initAbout();
}

function initHero() {
    console.log('Hero inicializado');
}

function initPortfolio() {
    console.log('Portfolio inicializado');
}

function initAbout() {
    console.log('About inicializado');
}
