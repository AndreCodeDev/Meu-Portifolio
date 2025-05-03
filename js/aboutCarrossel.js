//carrossel about
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
    const scrollSpeed = 2; // Velocidade do carrossel (ajuste conforme necessário)

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