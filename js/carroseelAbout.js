document.addEventListener("DOMContentLoaded", function() {
    const track = document.querySelector('.carrossel-track');
    const items = document.querySelectorAll('.carrossel-item');
    
    // Duplica os itens para criar o efeito infinito perfeito
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });
    
    // Ajusta a largura do track para acomodar os itens duplicados
    const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(document.documentElement).getPropertyValue('--space-6xl'));
    track.style.width = `${itemWidth * items.length * 1}px`;
});