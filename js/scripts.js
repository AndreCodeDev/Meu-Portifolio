// =============================================
// CORE LOADING SYSTEM (FIRST TO EXECUTE)
// =============================================

class PortfolioLoading {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.animatedUrl = document.getElementById('animated-url');
        this.url = "https://andrecode.dev.br";
        this.typingSpeed = 120;

        this.initLoading();
    }

    initLoading() {
        if (!this.loadingScreen) return;

        document.documentElement.style.overflow = 'hidden';
        document.documentElement.classList.add('loading-theme');

        this.prepareZoomOut();
        this.waitForLoadingScreen();
    }

    waitForLoadingScreen() {
        // Espera que o loading screen apareça por um tempo antes de começar a digitação da URL
        setTimeout(() => {
            this.typeUrl();
        }, 1000); // Aumento do delay para garantir que a tela de loading apareça adequadamente
    }

    typeUrl() {
        if (!this.animatedUrl) return;

        let i = 0;
        const typing = setInterval(() => {
            if (i < this.url.length) {
                this.animatedUrl.textContent += this.url.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                // Espera 2 segundos antes de começar a transição de zoom para frente
                setTimeout(() => {
                    this.completeLoading();  // Inicia o desaparecimento do loading após o delay
                }, 200);
            }
        }, this.typingSpeed);
    }

    prepareZoomOut() {
        // A transição de zoom e opacidade será aplicada de forma mais suave
        setTimeout(() => {
            if (!this.loadingScreen.dataset.complete) {
                this.loadingScreen.style.transition = 'transform 1.2s ease-out, opacity 1.2s ease-out';  // Zoom e opacidade
            }
        }, 2000); // Aguardar um pouco mais antes de começar a transição
    }

    completeLoading() {
        if (!this.loadingScreen) return;

        // A URL foi digitada, então vamos iniciar o efeito de zoom e opacidade
        this.loadingScreen.dataset.complete = 'true';

        // Aplicar o zoom e opacidade para desaparecer a tela de loading
        this.loadingScreen.style.transform = 'scale(1.1)';  // Zoom
        this.loadingScreen.style.opacity = '0';

        // Após o efeito de zoom e opacidade, esconder a tela de loading
        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
            document.documentElement.style.overflow = 'auto';
            document.documentElement.classList.remove('loading-theme');
            document.dispatchEvent(new CustomEvent('loadingComplete'));
        }, 1200); // Tempo maior para a transição de opacidade
    }
}

// =============================================
// INICIALIZAR O SISTEMA DE LOADING IMEDIATAMENTE
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

function initActiveSection() {
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
    initActiveSection();
    
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













const dots = document.querySelectorAll('.code-dot');
let index = 0;

function lightRayEffect() {
    dots.forEach(dot => dot.classList.remove('active'));

    let currentIndex = index;
    const interval = setInterval(() => {
        if (currentIndex < dots.length) {
            dots[currentIndex].classList.add('active');
            if (currentIndex > 0) {
                dots[currentIndex - 1].classList.remove('active');
            }
            currentIndex++;
        } else {
            clearInterval(interval);
            dots[dots.length - 1].classList.remove('active');
            setTimeout(lightRayEffect, 3000); 
        }
    }, 250); 
}

setTimeout(lightRayEffect, 1000);







