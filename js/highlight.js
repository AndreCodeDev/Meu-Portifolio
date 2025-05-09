


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
