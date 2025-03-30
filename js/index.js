// ========== LOADER ==========
window.onload = function() {
    window.scrollTo(0, 0);
    
    // Loader com timeout único
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.documentElement.style.overflow = 'auto';
                typeMessage(); // Inicia a animação de texto
            }, 500); // Tempo para o fade out completar
        }, 1000); // Tempo mínimo de exibição do loader
    }
};

// ========== ANIMAÇÃO DE TEXTO ==========
function typeMessage() {
    const messages = [
        { text: "Olá, eu sou o", class: "hero__title" },
        { text: "André Vitor", class: "hero__title__subtitle" },
        { text: "Desenvolvedor Junior", class: "typewriter" },
    ];
    
    const container = document.getElementById("container--animacaoText");
    let messageIndex = 0;
    
    function typeNextMessage() {
        if (messageIndex >= messages.length) return;
        
        const current = messages[messageIndex];
        const element = document.createElement("div");
        element.className = current.class;
        container.appendChild(element);
        
        let charIndex = 0;
        const typing = setInterval(() => {
            if (charIndex < current.text.length) {
                element.textContent += current.text[charIndex];
                charIndex++;
            } else {
                clearInterval(typing);
                messageIndex++;
                setTimeout(typeNextMessage, 500);
            }
        }, 100);
    }
    
    typeNextMessage();
}

// ========== MENU MOBILE ==========
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('header__menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
    
    // Fechar menu ao clicar em links ou fora
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && e.target !== menuToggle) {
            navMenu.classList.remove('active');
        }
    });
    
    // Fechar menu ao rolar
    window.addEventListener('scroll', () => navMenu.classList.remove('active'));
}

// ========== TOGGLE DE TEMA ==========
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.toggle('light-mode');
        themeToggle.classList.toggle('active');
        
        const tooltip = document.getElementById('themeTooltip');
        if (tooltip) {
            tooltip.textContent = document.body.classList.contains('light-mode') 
                ? 'Tema Escuro' 
                : 'Tema Claro';
        }
    });
}

// ========== CARROSSEL ABOUT ==========
function setupCarousel() {
    const carrossel = document.querySelector('.carrossel');
    if (!carrossel) return;
    
    // Clona os itens para efeito infinito
    const items = document.querySelectorAll('.carrossel-item');
    items.forEach(item => carrossel.appendChild(item.cloneNode(true)));
    
    // Animação simples
    let pos = 0;
    setInterval(() => {
        pos += 1;
        if (pos >= carrossel.scrollWidth / 2) pos = 0;
        carrossel.style.transform = `translateX(-${pos}px)`;
    }, 30);
}

// ========== CARROSSEL DESTAQUES ==========
function setupDestaquesCarousel() {
    const carousel = document.querySelector('.destaques-carousel');
    if (!carousel) return;
    
    const cards = document.querySelectorAll('.card');
    let currentIndex = 0;
    
    function showCard(index) {
        cards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
            card.classList.toggle('active', i === index);
        });
    }
    
    // Botões de navegação
    document.querySelector('.prev')?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showCard(currentIndex);
    });
    
    document.querySelector('.next')?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        showCard(currentIndex);
    });
    
    // Flip ao clicar
    carousel.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        if (card?.classList.contains('active')) {
            card.classList.toggle('flipped');
        }
    });
    
    showCard(0);
}

// ========== BOTÕES "VER MAIS" GENÉRICOS ==========
function setupToggleButtons() {
    // Configura todos os botões "ver mais" de uma vez
    document.querySelectorAll('[id$="MostrarMaisBtn"]').forEach(btn => {
        const targetClass = btn.id.replace('MostrarMaisBtn', '');
        const hiddenItems = document.querySelectorAll(`.${targetClass}.hidden`);
        
        if (hiddenItems.length > 0) {
            btn.addEventListener('click', () => {
                hiddenItems.forEach(item => item.classList.toggle('hidden'));
                
                // Atualiza texto do botão
                const isShowingMore = hiddenItems[0].classList.contains('hidden');
                const textSpan = btn.querySelector('span');
                if (textSpan) {
                    textSpan.textContent = isShowingMore 
                        ? 'Ver mais' 
                        : 'Ver menos';
                }
                
                // Rotaciona ícone
                btn.classList.toggle('rotated');
            });
        }
    });
}

// ========== FILTRO DE HABILIDADES ==========
function setupSkillFilter() {
    const filterButtons = document.querySelectorAll('.skills__filter button');
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const category = button.getAttribute('data-category') || 'all';
            
            // Ativa botão clicado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filtra cards
            document.querySelectorAll('.skill__card').forEach(card => {
                card.style.display = (category === 'all' || card.classList.contains(category)) 
                    ? 'block' 
                    : 'none';
            });
        });
    });
    
    // Ativa o filtro "all" por padrão
    filterButtons[0].click();
}

// ========== ANIMAÇÃO DE SCROLL ==========
function setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    setupCarousel();
    setupDestaquesCarousel();
    setupToggleButtons();
    setupSkillFilter();
    setupScrollAnimation();
});