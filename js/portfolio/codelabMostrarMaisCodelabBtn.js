document.addEventListener("DOMContentLoaded", function () {
    const mostrarMaisCodelabBtn = document.getElementById("codelabMostrarMaisCodelabBtn");
    const textoBotaoCodelab = document.getElementById("codelabTextoBotaoCodelab");
    const CodelabOcultos = document.querySelectorAll(".codelab-card.hidden");

    mostrarMaisCodelabBtn.addEventListener("click", function () {
        // Alternar a visibilidade dos Codelab ocultos
        CodelabOcultos.forEach(Codelab => {
            Codelab.classList.toggle("hidden");
        });

        // Rotacionar a seta do botão
        mostrarMaisCodelabBtn.classList.toggle("rotated");

        // Alterar o texto do botão
        if (mostrarMaisCodelabBtn.classList.contains("rotated")) {
            textoBotaoCodelab.textContent = "Ver menos Codelab";
        } else {
            textoBotaoCodelab.textContent = "Ver mais Codelab";
        }
    });
});
