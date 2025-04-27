// =============================================
// CORE LOADING SYSTEM (FIRST TO EXECUTE)
// =============================================

class PortfolioLoading {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.animatedUrl = document.getElementById('animated-url');
        this.progressBar = document.querySelector('.progress-bar-center');
        this.url = "https://andrecode.dev.br";
        this.typingSpeed = 120;
        
        this.initLoading();
    }

    initLoading() {
        if (!this.loadingScreen) return;

        document.documentElement.style.overflow = 'hidden';
        document.documentElement.classList.add('loading-theme');

        this.typeUrl();
        this.prepareFadeOut();
        this.waitForProgressBar();
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
            }
        }, this.typingSpeed);
    }

    prepareFadeOut() {
        setTimeout(() => {
            if (!this.loadingScreen.dataset.complete) {
                this.loadingScreen.style.transition = 'opacity 0.8s ease-out';
            }
        }, 1500);
    }

    waitForProgressBar() {
        if (!this.progressBar) {
            this.completeLoading();
            return;
        }

        const animationDuration = 5500;
        setTimeout(() => {
            this.completeLoading();
        }, animationDuration);
    }

    completeLoading() {
        if (!this.loadingScreen) return;

        this.loadingScreen.dataset.complete = 'true';

        setTimeout(() => {
            this.loadingScreen.style.opacity = '0';

            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
                document.documentElement.style.overflow = 'auto';
                document.documentElement.classList.remove('loading-theme');
                document.dispatchEvent(new CustomEvent('loadingComplete'));
            }, 800); // tempo da transição de opacidade
        }, 500); // pequeno delay antes de iniciar o fade-out
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









const dots = document.querySelectorAll('.code-dot');
let index = 0;

function blinkNextDot() {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');

  index = (index + 1) % dots.length;

  setTimeout(blinkNextDot, 600);
}

// Start
setTimeout(blinkNextDot, 1000);












//carrocel about
document.addEventListener("DOMContentLoaded", function () {
    const carrossel = document.querySelector(".carrossel");
    const carrosselItems = document.querySelectorAll(".carrossel-item");
    const totalItems = carrosselItems.length;

    // Clona os itens do carrossel para criar o efeito infinito
    carrosselItems.forEach((item) => {
        const clone = item.cloneNode(true);
        carrossel.appendChild(clone);
    });

    let scrollPosition = 0;
    const scrollSpeed = 1.5; // Velocidade do carrossel (ajuste conforme necessário)

    function scrollCarrossel() {
        scrollPosition += scrollSpeed;
        if (scrollPosition >= carrossel.scrollWidth / 2) {
            scrollPosition = 0; /* Reinicia a posição quando chegar ao final */
        }
        carrossel.style.transform = `translateX(-${scrollPosition}px)`;
        requestAnimationFrame(scrollCarrossel);
    }

    // Inicia a animação
    scrollCarrossel();
});














document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".highlight-card");
    const textBlocks = document.querySelectorAll(".highlights--subtitle");
    const cardsSections = {
      conquistas: document.getElementById("cards-conquistas"),
      formacoes: document.getElementById("cards-formacoes"),
    };

    let active = "conquistas"; // padrão ativo

    function toggleContent(target) {
      // Atualiza classes dos botões
      buttons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.target === target);
      });

      // Atualiza texto
      textBlocks.forEach(text => {
        text.classList.toggle("hidden", text.dataset.text !== target);
      });

      // Atualiza cards
      Object.keys(cardsSections).forEach(key => {
        cardsSections[key].classList.toggle("hidden", key !== target);
      });

      active = target;
    }

    // Inicializa com conquistas ativos
    toggleContent(active);

    buttons.forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        const target = btn.dataset.target;
        if (target !== active) toggleContent(target);
      });
    });
  });










// Seleciona os elementos do carrossel
const conquistasCarousel = document.querySelector('.conquistas-carousel');
const cards = document.querySelectorAll('.card');
const prevButton = document.querySelector('.conquistas-carousel-control.prev');
const nextButton = document.querySelector('.conquistas-carousel-control.next');

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
const SWIPE_THRESHOLD = 50; // Distância mínima para considerar um swipe

// Atualiza a exibição dos cards
function updateCarousel() {
    cards.forEach((card, index) => {
        // Oculta todos os cards inicialmente
        card.style.display = 'none';
        card.classList.remove('active', 'prev', 'next', 'flipped'); // Remove a classe 'flipped'

        // Define o card ativo
        if (index === currentIndex) {
            card.style.display = 'block';
            card.classList.add('active');
            // Faz o flip automático para a imagem (frente)
            card.classList.remove('flipped');
        }
        // Define o card anterior
        else if (index === currentIndex - 1 || (currentIndex === 0 && index === cards.length - 1)) {
            card.style.display = 'block';
            card.classList.add('prev');
        }
        // Define o próximo card
        else if (index === currentIndex + 1 || (currentIndex === cards.length - 1 && index === 0)) {
            card.style.display = 'block';
            card.classList.add('next');
        }
    });
}

// Navega para o card anterior
function goToPrevCard() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
}

// Navega para o próximo card
function goToNextCard() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
}

// Event listeners para os botões
prevButton.addEventListener('click', goToPrevCard);
nextButton.addEventListener('click', goToNextCard);

// Event listeners para touch/swipe
conquistasCarousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

conquistasCarousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

// Função para tratar o gesto de swipe
function handleSwipe() {
    const difference = touchStartX - touchEndX;

    // Swipe para a direita (avançar)
    if (difference > SWIPE_THRESHOLD) {
        goToNextCard();
    }
    // Swipe para a esquerda (voltar)
    else if (difference < -SWIPE_THRESHOLD) {
        goToPrevCard();
    }
}

// Efeito de flip ao clicar no card
conquistasCarousel.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    if (card && card.classList.contains('active')) {
        card.classList.toggle('flipped');
    }
});

// Fecha o card quando clicar fora
document.addEventListener('click', (event) => {
    const activeCard = document.querySelector('.card.active');
    const isClickInsideCarousel = conquistasCarousel.contains(event.target);
    const isClickOnNavButton = event.target === prevButton || event.target === nextButton;

    if (activeCard && !isClickInsideCarousel && !isClickOnNavButton) {
        activeCard.classList.remove('flipped');
    }
});

// Inicializa o carrossel
updateCarousel();

//--------------------------------------------------------------------------











  document.addEventListener("DOMContentLoaded", function () {
    const mostrarMaisBtn = document.getElementById("formacaoMostrarMaisBtn");
    const textoBotao = document.getElementById("formacaoTextoBotao");
    const cardsOcultos = document.querySelectorAll(".formacao-card.hidden");
    let cardsVisiveis = false;

    mostrarMaisBtn.addEventListener("click", function () {
        // Alternar a visibilidade dos cards ocultos
        cardsOcultos.forEach(card => {
            card.classList.toggle("hidden");
        });

        // Alterar o estado e o texto do botão
        cardsVisiveis = !cardsVisiveis;
        textoBotao.textContent = cardsVisiveis ? "Ver menos formações" : "Ver mais formações";

        // Rotacionar a seta (se necessário, mas sem afetar o hover)
        mostrarMaisBtn.classList.toggle("rotated");
    });
});












document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".portfolio-card");
    const textBlocks = document.querySelectorAll(".portfolio--subtitle");
    const cardsSections = {
      projetos: document.getElementById("cards-projetos"),
      certificados: document.getElementById("cards-certificados"),
      skills: document.getElementById("cards-skills"),
    };
  
    let active = "projetos"; // padrão ativo
  
    function toggleContent(target) {
      // Atualiza classes dos botões
      buttons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.target === target);
      });
  
      // Atualiza texto
      textBlocks.forEach(text => {
        text.classList.toggle("hidden", text.dataset.text !== target);
      });
  
      // Atualiza cards
      Object.keys(cardsSections).forEach(key => {
        cardsSections[key].classList.toggle("hidden", key !== target);
      });
  
      active = target;
    }
  
    // Inicializa com projetos ativos
    toggleContent(active);
  
    buttons.forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        const target = btn.dataset.target;
        if (target !== active) toggleContent(target);
      });
    });
  });














  document.addEventListener("DOMContentLoaded", function () {
    const mostrarMaisProjetosBtn = document.getElementById("ProjectMostrarMaisProjetosBtn");
    const textoBotaoProjetos = document.getElementById("ProjectTextoBotaoProjetos");
    const projetosOcultos = document.querySelectorAll(".project-item.hidden");

    mostrarMaisProjetosBtn.addEventListener("click", function () {
        // Alternar a visibilidade dos projetos ocultos
        projetosOcultos.forEach(projeto => {
            projeto.classList.toggle("hidden");
        });

        // Rotacionar a seta do botão
        mostrarMaisProjetosBtn.classList.toggle("rotated");

        // Alterar o texto do botão
        if (mostrarMaisProjetosBtn.classList.contains("rotated")) {
            textoBotaoProjetos.textContent = "Ver menos projetos";
        } else {
            textoBotaoProjetos.textContent = "Ver mais projetos";
        }
    });
});





document.addEventListener("DOMContentLoaded", function () {
    const mostrarMaisCertificadosBtn = document.getElementById("certificadosMostrarMaisCertificadosBtn");
    const textoBotaoCertificados = document.getElementById("certificadosTextoBotaoCertificados");
    const CertificadosOcultos = document.querySelectorAll(".certificados-item.hidden");

    mostrarMaisCertificadosBtn.addEventListener("click", function () {
        // Alternar a visibilidade dos Certificados ocultos
        CertificadosOcultos.forEach(Certificados => {
            Certificados.classList.toggle("hidden");
        });

        // Rotacionar a seta do botão
        mostrarMaisCertificadosBtn.classList.toggle("rotated");

        // Alterar o texto do botão
        if (mostrarMaisCertificadosBtn.classList.contains("rotated")) {
            textoBotaoCertificados.textContent = "Ver menos certificados";
        } else {
            textoBotaoCertificados.textContent = "Ver mais certificados";
        }
    });
});






//--------------------------------------------------------------------------

function filterSkills(category, event) {
    // Remove a classe "active" de todos os botões
    document.querySelectorAll('.skills__filter button').forEach(button => {
        button.classList.remove('active');
        // Restaura os estilos padrão do botão
        button.style.backgroundColor = '';
        button.style.borderColor = '';
        button.style.color = '';
    });

    // Adiciona a classe "active" ao botão clicado sem sobrescrever estilos hover
    if (event) {
        const button = event.target;
        button.classList.add('active');
        // Aplica estilos apenas quando não está em hover
        if (!button.matches(':hover')) {
            button.style.backgroundColor = 'rgba(0, 162, 255, 0.32)';
            button.style.borderColor = 'var(--primary-color)';
            button.style.color = 'var(--text-color2)';
        }
    } else {
        // Se não houver evento (ao carregar a página), ativa o botão "Todas"
        const allButton = document.querySelector('.skills__filter button[onclick*="filterSkills(\'all\'"]');
        allButton.classList.add('active');
        if (!allButton.matches(':hover')) {
            allButton.style.backgroundColor = 'rgba(0, 162, 255, 0.32)';
            allButton.style.borderColor = 'var(--primary-color)';
            allButton.style.color = 'var(--text-color2)';
        }
    }

    // Oculta todos os cards de habilidades
    document.querySelectorAll('.skill__card').forEach(card => {
        card.classList.remove('show');
    });

    // Mostra os cards da categoria selecionada
    if (category === 'all') {
        document.querySelectorAll('.skill__card').forEach(card => {
            card.classList.add('show');
        });
    } else {
        document.querySelectorAll(`.skill__card.${category}`).forEach(card => {
            card.classList.add('show');
        });
    }
}

// Adiciona listeners para restaurar estilos hover quando o mouse entra/sai dos botões
document.querySelectorAll('.skills__filter button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        if (button.classList.contains('active')) {
            button.style.backgroundColor = '';
            button.style.borderColor = '';
            button.style.color = '';
        }
    });

    button.addEventListener('mouseleave', () => {
        if (button.classList.contains('active')) {
            button.style.backgroundColor = 'rgba(0, 162, 255, 0.32)';
            button.style.borderColor = 'var(--primary-color)';
            button.style.color = 'var(--text-color2)';
        }
    });
});

// Mostra todas as habilidades e ativa o botão "Todas" ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    filterSkills('all');
});