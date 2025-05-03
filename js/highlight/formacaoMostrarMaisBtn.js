


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
