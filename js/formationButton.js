document.addEventListener("DOMContentLoaded", function () {
    const mostrarMaisFormationsBtn = document.getElementById("formationsMostrarMaisFormationsBtn");
    const textoBotaoFormations = document.getElementById("formationsTextoBotaoFormations");
    const formationsOcultos = document.querySelectorAll(".formacao-card.hidden");

    mostrarMaisFormationsBtn.addEventListener("click", function () {
        // Alternar a visibilidade das formações ocultas
        formationsOcultos.forEach(formacao => {
            formacao.classList.toggle("hidden");
        });

        // Rotacionar a seta do botão
        mostrarMaisFormationsBtn.classList.toggle("rotated");

        // Alterar o texto do botão
        if (mostrarMaisFormationsBtn.classList.contains("rotated")) {
            textoBotaoFormations.textContent = "Ver menos formações";
        } else {
            textoBotaoFormations.textContent = "Ver mais formações";
        }
    });
});