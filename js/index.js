window.onload = function () {
    window.scrollTo(0, 0);
};

//--------------------------------------------------------------------------


// Configurações globais para o loader
(function() {
    // Configurações básicas
    const settings = {
        minSpeed: 1,          // Velocidade mínima em Mbps
        slowLoadTime: 3000,   // Tempo em ms para considerar lento
        checkInterval: 2000   // Intervalo para verificar se a página carregou
    };

    // Variável para controlar o aviso
    let warningShown = false;
    let pageFullyLoaded = false;

    // Mostra o aviso de conexão lenta
    function showWarning() {
        if (warningShown) return;
        warningShown = true;
        
        const warning = document.createElement('div');
        warning.id = 'slow-connection-warning';
        warning.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #fff3cd;
                border-left: 5px solid #ffc107;
                padding: 15px;
                border-radius: 4px;
                max-width: 300px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                animation: fadeIn 0.5s;
                z-index: 9999;
            ">
                <p style="margin: 0 0 10px 0; color: #856404;">
                    ⚠️ Sua conexão está lenta. O carregamento pode demorar.
                </p>
                <button style="
                    background: #ffc107;
                    border: none;
                    padding: 5px 10px;
                    border-radius: 3px;
                    cursor: pointer;
                " onclick="removeWarning()">OK</button>
            </div>
        `;
        
        document.body.appendChild(warning);

        // Verifica periodicamente se a página carregou
        const checkLoad = setInterval(function() {
            if (pageFullyLoaded) {
                removeWarning();
                clearInterval(checkLoad);
            }
        }, settings.checkInterval);
    }

    // Remove o aviso
    window.removeWarning = function() {
        const warning = document.getElementById('slow-connection-warning');
        if (warning) warning.remove();
    }

    // Verifica a conexão quando a página começa a carregar
    if (navigator.connection) {
        const conn = navigator.connection;
        if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g' || 
            (conn.downlink && conn.downlink < settings.minSpeed)) {
            showWarning();
        }
    }

    // Fallback: Verifica pelo tempo de carregamento
    setTimeout(function() {
        if (!pageFullyLoaded) {
            showWarning();
        }
    }, settings.slowLoadTime);

    // Marca a página como carregada quando o evento load ocorrer
    window.addEventListener('load', function() {
        pageFullyLoaded = true;
    });

    // Adiciona a animação do fadeIn globalmente se não existir
    if (!document.getElementById('fadeIn-style')) {
        const style = document.createElement('style');
        style.id = 'fadeIn-style';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
})();
//--------------------------------------------------------------------------

// fade-in (animação de aparição) 
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Reduzido para que a animação comece mais cedo
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Reduz o atraso progressivo para que as seções apareçam mais rapidamente
                entry.target.style.transitionDelay = `${index * 0.1}s`; // Atraso reduzido
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

//--------------------------------------------------------------------------

// Seleciona o botão de toggle do menu e o menu em si
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('header__menu');

// Adiciona um evento de clique ao botão de toggle
menuToggle.addEventListener('click', () => {
    // Alterna a classe 'active' no menu
    navMenu.classList.toggle('active');
});

// Fechar o menu ao clicar em uma opção do menu
const menuItems = document.querySelectorAll('.header__menu a');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Fechar o menu ao clicar fora dele
document.addEventListener('click', (event) => {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);

    if (!isClickInsideMenu && !isClickOnToggle) {
        navMenu.classList.remove('active');
    }
});

// Fechar o menu ao deslizar a tela
document.addEventListener('scroll', () => {
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

//--------------------------------------------------------------------------
// Função para alternar o tema

// Variável para controle do tema atual
let currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';

// Função otimizada para troca instantânea
function toggleTheme() {
    const body = document.body;
    const toggleContainer = document.getElementById('themeToggle');
    const themeTooltip = document.getElementById('themeTooltip');

    // Troca imediata sem esperar carregamento
    if (currentTheme === 'light') {
        body.classList.remove('light-mode');
        toggleContainer.classList.remove('active');
        themeTooltip.textContent = 'Tema Claro';
        currentTheme = 'dark';
    } else {
        body.classList.add('light-mode');
        toggleContainer.classList.add('active');
        themeTooltip.textContent = 'Tema Escuro';
        currentTheme = 'light';
    }
}

// Adiciona o evento de clique otimizado
document.getElementById('themeToggle').addEventListener('click', function(e) {
    e.preventDefault();
    toggleTheme();
});

//--------------------------------------------------------------------------

// Mensagens para a animação
const messages = [
    { text: "Olá, eu sou o", class: "hero__title" },
    { text: "André Vitor", class: "hero__title__subtitle" },
    { text: "Desenvolvedor Junior", class: "typewriter" },
];

const container = document.getElementById("container--animacaoText");
let messageIndex = 0;
let charIndex = 0;

function typeMessage() {
    if (messageIndex < messages.length) {
        const currentMessage = messages[messageIndex];

        if (charIndex < currentMessage.text.length) {
            // Cria um novo elemento para a mensagem atual, se ainda não existir
            if (!container.children[messageIndex]) {
                const newMessage = document.createElement("div");
                newMessage.classList.add(currentMessage.class);
                container.appendChild(newMessage);
            }
            // Adiciona o próximo caractere ao texto da mensagem
            container.children[messageIndex].textContent += currentMessage.text[charIndex];
            charIndex++;

            // Aguarda 100ms antes de adicionar o próximo caractere
            setTimeout(typeMessage, 100);
        } else {
            // Passa para a próxima mensagem
            charIndex = 0;
            messageIndex++;

            // Aguarda 500ms antes de começar a próxima mensagem
            setTimeout(typeMessage, 500);
        }
    }
}

//--------------------------------------------------------------------------

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
    const scrollSpeed = 1.2; // Velocidade do carrossel (ajuste conforme necessário)

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

//--------------------------------------------------------------------------

//congela glowing about
document.addEventListener('DOMContentLoaded', function() {
    const aboutContainer = document.querySelector('.about__container');

    aboutContainer.addEventListener('mouseenter', function() {
        // Retoma a animação do pseudo-elemento ::before
        aboutContainer.style.setProperty('--glowing-animation-state', 'running');
    });

    aboutContainer.addEventListener('mouseleave', function() {
        // Pausa a animação do pseudo-elemento ::before
        aboutContainer.style.setProperty('--glowing-animation-state', 'paused');
    });
});

//--------------------------------------------------------------------------

// Seleciona os elementos do carrossel
const destaquesCarousel = document.querySelector('.destaques-carousel');
const cards = document.querySelectorAll('.card');
const prevButton = document.querySelector('.destaques-carousel-control.prev');
const nextButton = document.querySelector('.destaques-carousel-control.next');

let currentIndex = 0;

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
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
});

// Navega para o próximo card
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
});

// Efeito de flip ao clicar no card
destaquesCarousel.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    if (card && card.classList.contains('active')) {
        card.classList.toggle('flipped');
    }
});

// Fecha o card quando clicar fora
document.addEventListener('click', (event) => {
    const activeCard = document.querySelector('.card.active');
    const isClickInsideCarousel = destaquesCarousel.contains(event.target);
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

//--------------------------------------------------------------------------

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