// =============================================
// CONTROLE INICIAL DE CARREGAMENTO
// =============================================

document.documentElement.classList.add('loading-theme');

window.addEventListener('load', function() {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.documentElement.classList.remove('loading-theme');
});

// =============================================
// INICIALIZAÇÃO PRINCIPAL
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // 1. Componentes globais
    initThemeSystem();
    initMobileMenu();
    initActiveSectionHighlight();
    
    // 2. Componentes por seção (condicionais)
    if (document.querySelector('.hero')) initHero();
    if (document.querySelector('.portfolio')) initPortfolio();
    if (document.querySelector('.about')) initAbout();
    // Adicione novas seções conforme necessário
});

// =============================================
// MÓDULOS DO SISTEMA
// =============================================

/* Sistema de Tema Claro/Escuro */
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

/* Menu Mobile Responsivo */
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
    
    // Fecha menu ao mudar tema
    document.querySelectorAll('.header__theme-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => setTimeout(closeMenu, 500));
    });
}

/* Destaque de Seção Ativa no Menu */
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
// MÓDULOS DE SEÇÕES (ADICIONE SEUS NOVOS MÓDULOS AQUI)
// =============================================

/* Seção Hero (Exemplo) */
function initHero() {
    console.log('Hero inicializado');
    // Adicione aqui o código específico do hero
    // Ex: animações, carrossel, etc.
}

/* Seção Portfolio (Exemplo) */
function initPortfolio() {
    console.log('Portfolio inicializado');
    // Adicione aqui o código específico do portfolio
    // Ex: filtros, lightbox, etc.
}

/* Seção About (Exemplo) */
function initAbout() {
    console.log('About inicializado');
    // Adicione aqui o código específico do about
    // Ex: timeline, accordion, etc.
}














class PortfolioLoading {
    constructor() {
      this.loadingScreen = document.getElementById('loading-screen');
      this.animatedUrl = document.getElementById('animated-url');
      this.url = "https://andrecode.dev.br";
      this.typingSpeed = 120; // Velocidade de digitação (ms por caractere)
      this.startTime = Date.now();
      
      // Bloqueia scroll durante o loading
      document.documentElement.style.overflow = 'hidden';
      
      this.init();
    }
  
    init() {
      if (!this.loadingScreen) return;
      
      // Inicia animação da URL imediatamente
      this.typeUrl();
      
      // Força mostrar o loading por pelo menos 1.5s
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
      // Marca como completo para evitar transição duplicada
      this.loadingScreen.dataset.complete = 'true';
      
      // Adiciona pequeno delay antes de esconder
      setTimeout(() => {
        this.loadingScreen.style.opacity = '0';
        
        // Remove completamente após a transição
        setTimeout(() => {
          this.loadingScreen.style.display = 'none';
          document.documentElement.style.overflow = 'auto';
          
          // Dispara evento para outros scripts saberem que o loading terminou
          document.dispatchEvent(new CustomEvent('loadingComplete'));
        }, 800);
      }, 500); // Delay adicional após terminar a digitação
    }
  }
  
  // Inicia imediatamente (não espera DOMContentLoaded)
  new PortfolioLoading();